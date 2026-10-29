-- Cosmetic NFTs (Season 1): cosmetics earned in the game can be turned into tokens on Robinhood Chain
-- (contracts/LanternCosmetics.sol). Safe to run more than once: run this whole file in the Supabase SQL Editor.
-- cos_mints: every cosmetic a hero turned into a token. 'pending' until the mint lands on-chain, then 'done'.
-- While a row exists (pending or done) that cosmetic has left the hero; a pending one can be cancelled once its
-- voucher has expired unused, and then it goes back to the hero.
create table if not exists cos_mints (
  mint_id text primary key,                         -- the voucher's mintId (0x + 64 hex), used once on-chain
  account_id uuid not null references accounts(id) on delete cascade,
  cos text not null,                                -- the cosmetic (jack_lantern, reaper_scythe, ...)
  wallet text not null,
  status text not null default 'pending' check (status in ('pending', 'done')),
  deadline timestamptz not null,                    -- the latest voucher's expiry
  created_at timestamptz not null default now()
);
create index if not exists cos_mints_account on cos_mints (account_id);
create unique index if not exists cos_mints_one on cos_mints (account_id, cos);   -- one of each cosmetic per hero
alter table cos_mints enable row level security;   -- only the server (service role) reads or writes it

-- which cosmetic tokens the hero's wallet holds (checked on-chain by the server; kept here for saves and the realtime pass)
alter table accounts add column if not exists cos_held jsonb not null default '{}'::jsonb;
alter table accounts add column if not exists cos_held_at timestamptz;

-- Check
select count(*) as cosmetic_mints from cos_mints;
