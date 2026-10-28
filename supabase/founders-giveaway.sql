-- Founder's Lantern X giveaway: 1,000 of the 2,222 Lanterns are held for giveaway winners.
-- The owner adds winners by hero name in /tools/founders; a winner's mint comes from the reserved pool.
-- Run supabase/founders.sql first. Safe to run more than once: run this whole file in the Supabase SQL Editor.
alter table heroes add column if not exists founder_reserved boolean not null default false;
alter table heroes add column if not exists founder_reserved_at timestamptz;
create index if not exists heroes_founder_reserved on heroes (founder_reserved) where founder_reserved;

-- Check: how many winners so far
select count(*) as winners from heroes where founder_reserved;
