-- Admin moderation: mute, kick and bans (3 strikes: 24 hours, 72 hours, then permanent).
-- Self-contained and safe to run more than once: run this whole file in the Supabase SQL Editor.
-- Bans are per account (a wallet or a Google sign-in), not per IP.

alter table accounts add column if not exists muted        boolean     not null default false;
alter table accounts add column if not exists ban_count    integer     not null default 0;
alter table accounts add column if not exists banned_until timestamptz;
alter table heroes   add column if not exists admin_hat    text        not null default 'partyhat';

-- lh_state now also reports a timed ban (as banned while it lasts), when it ends, strikes and mute
create or replace function lh_state(p_account uuid) returns json language sql stable as $$
  select json_build_object(
    'wallet', a.wallet,
    'google', case when a.google_sub is null then null else coalesce(a.email, 'linked') end,
    'banned', a.banned or coalesce(a.banned_until > now(), false),
    'ban_until', case when a.banned then null when a.banned_until > now() then a.banned_until else null end,
    'ban_perm', a.banned,
    'strikes', a.ban_count,
    'muted', a.muted,
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

-- To lift a ban by hand (replace the name):
--   update accounts a set banned = false, banned_until = null from heroes h
--    where h.account_id = a.id and h.name_key = lower('PlayerName');
-- To also clear their strikes, add: , ban_count = 0
