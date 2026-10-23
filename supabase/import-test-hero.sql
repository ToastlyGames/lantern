-- Run AFTER you sign in on the live site with your wallet and create the hero named Test.
-- 1) makes Test the admin (Blue Party Hat + admin powers)
-- 2) copies your demo progress onto Test (gold, items, skills, bank, gear) from the demo's last cloud save
update heroes set is_admin = true where name_key = 'test';
update saves set data = '{"gold":209,"bank":{"bread":1,"cape_moss":1,"copper_ore":68,"gem":1,"glowcap_spore":34,"lampseed":2,"oil":11,"slime_gel":1,"stew":3,"wheat":1},"lvl":4,"xp":23,"gear":{"blade":"copper","mail":"copper","lantern":"basic","cape":"moss","helm":"partyhat"},"skills":{"farming":68,"fishing":20,"cooking":52,"smithing":0},"caught":2,"flags":{"cooked":true,"deposited":true,"forged":true,"pressed":true,"vault":true},"guide":0,"vault":{"copper_ore":29,"gem":1,"glowcap":3,"glowcap_spore":3,"slime_gel":1},"bankBuys":0,"quick":["oil","bread","pondfin","stew",null],"lift":1,"deepest":5,"plots":[null,null,null,null,null,null],"kills":56,"deaths":1,"bosses":{}}'::jsonb, rev = rev + 1, updated_at = now()
where account_id = (select account_id from heroes where name_key = 'test');
-- check: should show your hero with is_admin = true
select h.name, h.is_admin, s.rev, s.data->'gold' as gold from heroes h join saves s using (account_id) where h.name_key = 'test';
