-- Player trading: both players' saves change in one transaction, or neither does.
-- Self-contained and safe to run more than once: run this whole file in the Supabase SQL Editor.

-- every completed trade (a trade ticket can only be used once)
create table if not exists trades (
  id         text primary key,
  a          uuid not null references accounts(id) on delete cascade,
  b          uuid not null references accounts(id) on delete cascade,
  detail     jsonb not null,
  created_at timestamptz not null default now()
);
create index if not exists trades_a on trades (a, created_at desc);
create index if not exists trades_b on trades (b, created_at desc);
alter table trades enable row level security;
revoke all on trades from anon, authenticated;

-- write both saves (only if neither changed since they were read) and record the trade
create or replace function lh_trade(p_id text, p_a uuid, p_a_rev integer, p_a_data jsonb, p_b uuid, p_b_rev integer, p_b_data jsonb, p_detail jsonb)
returns json language plpgsql as $$
declare ra integer; rb integer;
begin
  insert into trades (id, a, b, detail) values (p_id, p_a, p_b, p_detail);
  update saves set data = p_a_data, rev = rev + 1, updated_at = now() where account_id = p_a and rev = p_a_rev returning rev into ra;
  update saves set data = p_b_data, rev = rev + 1, updated_at = now() where account_id = p_b and rev = p_b_rev returning rev into rb;
  if ra is null or rb is null then raise exception 'stale save' using errcode = '40001'; end if;
  return json_build_object('a', ra, 'b', rb);
end $$;
revoke all on function lh_trade(text, uuid, integer, jsonb, uuid, integer, jsonb, jsonb) from public, anon, authenticated;
grant execute on function lh_trade(text, uuid, integer, jsonb, uuid, integer, jsonb, jsonb) to service_role;
