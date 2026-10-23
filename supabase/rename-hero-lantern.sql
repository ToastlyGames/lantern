-- Renames the hero on wallet 0x2f62E49E7864558e3a8864F66E219da81991dcA2 (currently "Test") to "Lantern".
-- Admin powers, the Blue Party Hat and all progress stay. Paste into Supabase → SQL Editor → Run.
do $$
declare
  w       text := lower('0x2f62E49E7864558e3a8864F66E219da81991dcA2');
  acct    uuid;
  holder  uuid;
begin
  select id into acct from accounts where wallet = w;
  if acct is null or not exists (select 1 from heroes where account_id = acct) then
    raise exception 'This wallet has no hero yet. Sign in to the game and create one first.';
  end if;
  select account_id into holder from heroes where name_key = 'lantern';
  if holder is not null and holder <> acct then
    raise exception 'The name Lantern is already taken by another hero.';
  end if;
  update heroes set name = 'Lantern', name_key = 'lantern' where account_id = acct;
end $$;

-- check: should show Lantern, is_admin true, your wallet
select a.wallet, h.name, h.is_admin from accounts a join heroes h on h.account_id = a.id
where a.wallet = lower('0x2f62E49E7864558e3a8864F66E219da81991dcA2');
