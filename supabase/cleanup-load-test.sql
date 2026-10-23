-- Removes every hero (and its account, save and flags) created by scripts/load-test.mjs.
-- Load-test heroes are named lt_<tag>_<number>; real players can't pick names like that by accident often,
-- but check the count first:
select count(*) from heroes where name_key ~ '^lt_[a-z]{4}_[0-9]+$';

delete from accounts where id in (select account_id from heroes where name_key ~ '^lt_[a-z]{4}_[0-9]+$');
