-- Gives the hero "kush" (Google account toastlycompany@gmail.com) admin powers and the GREEN Party Hat.
-- Self-contained: run this whole file in the Supabase SQL Editor (safe to run more than once).

-- 1) the column that says which hat an admin wears
alter table heroes add column if not exists admin_hat text not null default 'partyhat';
do $$ begin
  alter table heroes add constraint heroes_admin_hat_check check (admin_hat in ('partyhat','greenhat'));
exception when duplicate_object then null; end $$;

-- 2) the server now reports each hero's hat to the game
create or replace function lh_state(p_account uuid) returns json language sql stable as $$
  select json_build_object(
    'wallet', a.wallet,
    'google', case when a.google_sub is null then null else coalesce(a.email, 'linked') end,
    'banned', a.banned,
    'hero', case when h.account_id is null then null
                 else json_build_object('name', h.name, 'look', h.look, 'is_admin', h.is_admin, 'hat', h.admin_hat, 'x', h.x_username) end,
    'save', case when s.account_id is null then null
                 else json_build_object('data', s.data, 'rev', s.rev,
                                        'age_ms', (extract(epoch from (now() - s.updated_at)) * 1000)::bigint) end)
  from accounts a
  left join heroes h on h.account_id = a.id
  left join saves  s on s.account_id = a.id
  where a.id = p_account
$$;
revoke all on function lh_state(uuid) from public, anon, authenticated;
grant execute on function lh_state(uuid) to service_role;

-- 3) kush: admin, green hat
update heroes h
   set is_admin = true, admin_hat = 'greenhat'
  from accounts a
 where h.account_id = a.id
   and lower(a.email) = lower('toastlycompany@gmail.com')
   and h.name_key = 'kush';

-- 4) swap the blue hat he already has for the green one (worn, in the bank, or in the vault)
update saves s
   set data = (s.data
         #- '{bank,partyhat_helm}' #- '{vault,partyhat_helm}')
         || jsonb_build_object('gear', coalesce(s.data->'gear', '{}'::jsonb) || '{"helm":"greenhat"}'::jsonb),
       rev = s.rev + 1, updated_at = now()
  from heroes h
 where h.account_id = s.account_id and h.name_key = 'kush';

update heroes h
   set look = jsonb_set(h.look::jsonb, '{helm}', '"greenhat"')
 where h.name_key = 'kush' and h.look is not null and h.look::jsonb ? 'helm';

-- Check: should show kush | true | greenhat | greenhat
select h.name, h.is_admin, h.admin_hat, s.data->'gear'->>'helm' as wearing
  from heroes h join accounts a on a.id = h.account_id left join saves s on s.account_id = a.id
 where lower(a.email) = lower('toastlycompany@gmail.com');
