-- Founder's Lantern: every hero gets a number in the order heroes were made (Hero #1 is the first ever).
-- The first 1,000 are the whitelist for the free Founder's Lantern NFT (token ID = hero number).
-- Safe to run more than once: run this whole file in the Supabase SQL Editor.
begin;
lock table heroes in exclusive mode;   -- no hero is made while the numbers are handed out

create sequence if not exists hero_no_seq;
alter table heroes add column if not exists hero_no integer;

-- number the heroes that don't have one yet, oldest first (after any numbers already given out)
with o as (select account_id, row_number() over (order by created_at, account_id) as rn from heroes where hero_no is null)
update heroes h set hero_no = (select coalesce(max(hero_no), 0) from heroes) + o.rn from o where h.account_id = o.account_id;

-- new heroes take the next number
select setval('hero_no_seq', greatest((select coalesce(max(hero_no), 0) from heroes), 1), (select count(*) > 0 from heroes where hero_no is not null));
alter table heroes alter column hero_no set default nextval('hero_no_seq');
create unique index if not exists heroes_hero_no on heroes (hero_no);

-- does this account's wallet hold a Founder's Lantern? (checked on-chain by the server, kept here for the realtime pass)
alter table accounts add column if not exists founder boolean not null default false;
alter table accounts add column if not exists founder_at timestamptz;
commit;

-- Check: the first heroes and their numbers
select hero_no, name, created_at from heroes order by hero_no limit 10;
