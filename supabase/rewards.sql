-- Token rewards: the in-game ledger for the 50M rewards pool. Self-contained and safe to run more than once:
-- run this whole file in the Supabase SQL Editor. Nothing is paid out until REWARDS_ON=1 is set in Vercel.
-- The rules (rates, caps, what earns) live in lib/rewards.js and are passed in, so they can be tuned without SQL.

-- per account: everything earned, what's been claimed on-chain, today's earnings, and the one wallet they claim to
alter table accounts add column if not exists tok_earned  numeric(24,2) not null default 0;
alter table accounts add column if not exists tok_claimed numeric(24,2) not null default 0;
alter table accounts add column if not exists tok_day     date;
alter table accounts add column if not exists tok_today   numeric(24,2) not null default 0;
alter table accounts add column if not exists tok_wallet  text;
create unique index if not exists accounts_tok_wallet on accounts (tok_wallet);   -- one claim wallet per account, one account per claim wallet

-- the pool: its size, everything earned from it, and what claims have burned or sent back into it
create table if not exists tok_pool (
  id       integer primary key default 1 check (id = 1),
  total    numeric(24,2) not null default 50000000,
  earned   numeric(24,2) not null default 0,
  recycled numeric(24,2) not null default 0,
  burned   numeric(24,2) not null default 0
);
insert into tok_pool (id) values (1) on conflict (id) do nothing;

-- one row per UTC day: that day's budget (set once, from what's left in the pool) and how much of it has been earned
create table if not exists tok_days (
  day    date primary key,
  budget numeric(24,2) not null,
  spent  numeric(24,2) not null default 0
);

-- claim vouchers the server signed (the contract pays them; this is the record)
create table if not exists tok_claims (
  id         bigserial primary key,
  account_id uuid not null references accounts(id) on delete cascade,
  wallet     text not null,
  total      numeric(24,2) not null,
  created_at timestamptz not null default now()
);
create index if not exists tok_claims_account on tok_claims (account_id, id desc);

alter table tok_pool   enable row level security;
alter table tok_days   enable row level security;
alter table tok_claims enable row level security;
revoke all on tok_pool, tok_days, tok_claims from anon, authenticated;

-- today's row, created on first use with a budget of p_rate of what's left in the pool
create or replace function lh_tok_today(p_rate numeric) returns tok_days language plpgsql as $$
declare d date := (now() at time zone 'utc')::date; r tok_days; p tok_pool;
begin
  select * into r from tok_days where day = d;
  if found then return r; end if;
  select * into p from tok_pool where id = 1;
  insert into tok_days (day, budget) values (d, greatest(0, floor((p.total + p.recycled - p.earned) * p_rate)))
    on conflict (day) do nothing;
  select * into r from tok_days where day = d;
  return r;
end $$;

-- credit a player with p_units reward units (one unit = the day's budget / p_units_day tokens),
-- capped by their own daily share and by what's left of today's budget. Returns what they actually got.
create or replace function lh_earn(p_account uuid, p_units numeric, p_rate numeric, p_share numeric, p_units_day numeric)
returns json language plpgsql as $$
declare d date := (now() at time zone 'utc')::date; dy tok_days; a accounts; today numeric; cap numeric; want numeric; got numeric := 0;
begin
  perform lh_tok_today(p_rate);
  select * into dy from tok_days where day = d for update;
  select * into a from accounts where id = p_account for update;
  if not found then return null; end if;
  today := case when a.tok_day = d then a.tok_today else 0 end;
  cap := floor(dy.budget * p_share * 100) / 100;
  want := floor(greatest(p_units, 0) * dy.budget / p_units_day * 100) / 100;
  got := greatest(0, least(want, cap - today, dy.budget - dy.spent));
  if got > 0 then
    update tok_days set spent = spent + got where day = d;
    update tok_pool set earned = earned + got where id = 1;
  end if;
  update accounts set tok_earned = tok_earned + got, tok_today = today + got, tok_day = d where id = p_account;
  return json_build_object('got', got, 'balance', a.tok_earned + got - a.tok_claimed, 'earned', a.tok_earned + got,
    'today', today + got, 'cap', cap, 'unit', dy.budget / p_units_day, 'resting', dy.budget - dy.spent - got <= 0);
end $$;

-- a player's rewards summary, plus the pool's
create or replace function lh_tok(p_account uuid, p_rate numeric, p_share numeric) returns json language plpgsql as $$
declare d date := (now() at time zone 'utc')::date; dy tok_days; a accounts; p tok_pool;
begin
  dy := lh_tok_today(p_rate);
  select * into a from accounts where id = p_account;
  select * into p from tok_pool where id = 1;
  return json_build_object('earned', coalesce(a.tok_earned, 0), 'claimed', coalesce(a.tok_claimed, 0),
    'balance', coalesce(a.tok_earned, 0) - coalesce(a.tok_claimed, 0), 'wallet', a.tok_wallet,
    'today', case when a.tok_day = d then a.tok_today else 0 end, 'cap', floor(dy.budget * p_share * 100) / 100,
    'budget', dy.budget, 'spent', dy.spent, 'pool', p.total + p.recycled - p.earned, 'recycled', p.recycled, 'burned', p.burned);
end $$;

-- record a claim voucher: the account's claim wallet is fixed on its first claim, and the voucher covers everything
-- earned so far (vouchers are cumulative, so an unused one is simply replaced by the next).
create or replace function lh_claim(p_account uuid, p_wallet text, p_min numeric) returns json language plpgsql as $$
declare a accounts;
begin
  select * into a from accounts where id = p_account for update;
  if not found then return json_build_object('error', 'no_account'); end if;
  if a.tok_wallet is not null and a.tok_wallet <> p_wallet then return json_build_object('error', 'wallet_locked', 'wallet', a.tok_wallet); end if;
  if a.tok_earned - a.tok_claimed < p_min then return json_build_object('error', 'too_small', 'balance', a.tok_earned - a.tok_claimed); end if;
  update accounts set tok_wallet = p_wallet where id = p_account;
  insert into tok_claims (account_id, wallet, total) values (p_account, p_wallet, a.tok_earned);
  return json_build_object('total', a.tok_earned, 'wallet', p_wallet);
end $$;

-- after claims land on-chain: what the contract has paid in total (gross), so the pool knows what came back
create or replace function lh_tok_sync(p_account uuid, p_claimed numeric, p_total_gross numeric, p_recycle_bps integer, p_burn_bps integer)
returns void language sql as $$
  update accounts set tok_claimed = greatest(tok_claimed, least(p_claimed, tok_earned)) where id = p_account;
  update tok_pool set recycled = greatest(recycled, floor(p_total_gross * p_recycle_bps / 10000 * 100) / 100),
                      burned   = greatest(burned,   floor(p_total_gross * p_burn_bps    / 10000 * 100) / 100) where id = 1;
$$;

revoke all on function lh_tok_today(numeric), lh_earn(uuid, numeric, numeric, numeric, numeric), lh_tok(uuid, numeric, numeric),
  lh_claim(uuid, text, numeric), lh_tok_sync(uuid, numeric, numeric, integer, integer) from public, anon, authenticated;
grant execute on function lh_tok_today(numeric), lh_earn(uuid, numeric, numeric, numeric, numeric), lh_tok(uuid, numeric, numeric),
  lh_claim(uuid, text, numeric), lh_tok_sync(uuid, numeric, numeric, integer, integer) to service_role;
