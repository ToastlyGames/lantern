-- Links the admin hero "Lantern" to the wallet 0x2f62E49E7864558e3a8864F66E219da81991dcA2 and makes it the game's admin.
-- Paste into Supabase → SQL Editor → Run. Safe to run more than once: it never overwrites progress the hero has made since it was linked.
--  • If this wallet already has a hero, it keeps its name and becomes the admin. With no hero yet, one named Lantern is created.
--  • If another wallet holds the name Lantern, that hero is renamed to LanternOld and loses admin.
--  • The hero's progress is replaced with your demo save; on the next sign-in the admin loadout (top gear) is added.
do $$
declare
  w     text := lower('0x2f62E49E7864558e3a8864F66E219da81991dcA2');
  acct  uuid;
  demo  jsonb := '{"gold":209,"bank":{"bread":1,"cape_moss":1,"copper_ore":68,"gem":1,"glowcap_spore":34,"lampseed":2,"oil":11,"slime_gel":1,"stew":3,"wheat":1},"lvl":4,"xp":23,"gear":{"blade":"copper","mail":"copper","lantern":"basic","cape":"moss","helm":"partyhat"},"skills":{"farming":68,"fishing":20,"cooking":52,"smithing":0},"caught":2,"flags":{"cooked":true,"deposited":true,"forged":true,"pressed":true,"vault":true},"guide":0,"vault":{"copper_ore":29,"gem":1,"glowcap":3,"glowcap_spore":3,"slime_gel":1},"bankBuys":0,"quick":["oil","bread","pondfin","stew",null],"lift":1,"deepest":5,"plots":[null,null,null,null,null,null],"kills":56,"deaths":1,"bosses":{}}';
begin
  insert into accounts (wallet) values (w) on conflict (wallet) do nothing;
  select id into acct from accounts where wallet = w;

  update heroes set name = 'LanternOld', name_key = 'lanternold', is_admin = false
   where name_key = 'lantern' and account_id <> acct;

  if exists (select 1 from heroes where account_id = acct) then
    update heroes set is_admin = true where account_id = acct;   -- keeps the hero's current name
  else
    insert into heroes (account_id, name, name_key, is_admin) values (acct, 'Lantern', 'lantern', true);
  end if;

  -- copy the demo progress only the first time (once the hero has received the admin loadout, its progress is kept)
  insert into saves (account_id, data, rev) values (acct, demo, 1)
  on conflict (account_id) do update set data = excluded.data, rev = saves.rev + 1, updated_at = now()
  where coalesce(saves.data->'flags'->>'kit', 'false') <> 'true';
end $$;

-- check: one row, your hero, is_admin true, your wallet
select a.wallet, h.name, h.is_admin, s.rev, s.data->'gold' as gold, s.data->'lvl' as level
from accounts a join heroes h on h.account_id = a.id join saves s on s.account_id = a.id
where a.wallet = lower('0x2f62E49E7864558e3a8864F66E219da81991dcA2');
