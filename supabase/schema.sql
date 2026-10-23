-- Lanternhold database (Supabase / Postgres). Paste this whole file into Supabase → SQL Editor → Run.
-- Only the server (Vercel functions, using the service-role key) touches these tables.
-- Row Level Security is ON with no policies, so the public "anon" key can read or write nothing.

create extension if not exists pgcrypto;

-- one row per wallet that has signed in
create table if not exists accounts (
  id          uuid primary key default gen_random_uuid(),
  wallet      text not null unique check (wallet ~ '^0x[0-9a-f]{40}$'),
  banned      boolean not null default false,
  created_at  timestamptz not null default now(),
  last_login  timestamptz
);

-- one hero per account; name_key (lowercase name) is unique, so no two players can ever hold the same name
create table if not exists heroes (
  account_id  uuid primary key references accounts(id) on delete cascade,
  name        text not null check (name ~ '^[A-Za-z0-9_]{3,16}$'),
  name_key    text not null unique check (name_key = lower(name)),
  look        jsonb not null default '{}'::jsonb,
  is_admin    boolean not null default false,
  created_at  timestamptz not null default now()
);

-- the player's progress; rev increases on every save so two devices can't overwrite each other
create table if not exists saves (
  account_id  uuid primary key references accounts(id) on delete cascade,
  data        jsonb not null,
  rev         integer not null default 1,
  updated_at  timestamptz not null default now(),
  check (octet_length(data::text) < 200000)
);

-- one-time sign-in codes (valid 10 minutes, usable once)
create table if not exists nonces (
  nonce       text primary key,
  created_at  timestamptz not null default now(),
  used_at     timestamptz
);
create index if not exists nonces_created_idx on nonces (created_at);

-- saves the server refused as impossible, for review
create table if not exists save_flags (
  id          bigserial primary key,
  account_id  uuid references accounts(id) on delete cascade,
  reason      text not null,
  at          timestamptz not null default now()
);

alter table accounts   enable row level security;
alter table heroes     enable row level security;
alter table saves      enable row level security;
alter table nonces     enable row level security;
alter table save_flags enable row level security;

-- housekeeping: delete sign-in codes older than a day (run by hand, or schedule with pg_cron)
create or replace function cleanup_nonces() returns void language sql as $$
  delete from nonces where created_at < now() - interval '1 day';
$$;

-- ============ Performance (safe to re-run) ============
-- One round trip for everything a save or a page load needs: ban status, hero and save,
-- plus the save's age measured on the database clock (so server clocks can't skew the checks).
create or replace function lh_state(p_account uuid) returns json language sql stable as $$
  select json_build_object(
    'wallet', a.wallet,
    'banned', a.banned,
    'hero', case when h.account_id is null then null
                 else json_build_object('name', h.name, 'look', h.look, 'is_admin', h.is_admin) end,
    'save', case when s.account_id is null then null
                 else json_build_object('data', s.data, 'rev', s.rev,
                                        'age_ms', (extract(epoch from (now() - s.updated_at)) * 1000)::bigint) end)
  from accounts a
  left join heroes h on h.account_id = a.id
  left join saves  s on s.account_id = a.id
  where a.id = p_account
$$;

-- Compare-and-swap save: only writes if the revision still matches. Returns the new revision, or null if stale.
create or replace function lh_cas_save(p_account uuid, p_rev integer, p_data jsonb) returns integer language sql as $$
  update saves set data = p_data, rev = rev + 1, updated_at = now()
  where account_id = p_account and rev = p_rev
  returning rev
$$;

-- A refused save: log it and restart the save clock, so refusals are rate-limited like normal saves.
create or replace function lh_reject(p_account uuid, p_reason text) returns void language sql as $$
  insert into save_flags (account_id, reason) values (p_account, left(p_reason, 200));
  update saves set updated_at = now() where account_id = p_account;
$$;

-- Only the server key may call these (Supabase exposes public functions over its API otherwise).
revoke all on function lh_state(uuid)                 from public, anon, authenticated;
revoke all on function lh_cas_save(uuid, integer, jsonb) from public, anon, authenticated;
revoke all on function lh_reject(uuid, text)          from public, anon, authenticated;
revoke all on function cleanup_nonces()               from public, anon, authenticated;
grant execute on function lh_state(uuid), lh_cas_save(uuid, integer, jsonb), lh_reject(uuid, text), cleanup_nonces() to service_role;

-- saves is updated constantly: leave room in each page for in-place (HOT) updates and vacuum it often.
alter table saves set (fillfactor = 70, autovacuum_vacuum_scale_factor = 0.02, autovacuum_analyze_scale_factor = 0.05);
create index if not exists save_flags_account_idx on save_flags (account_id, at desc);

-- Clear old sign-in codes every hour automatically (needs the pg_cron extension, which Supabase provides).
do $$
begin
  create extension if not exists pg_cron;
  perform cron.schedule('lh-cleanup-nonces', '17 * * * *', 'select public.cleanup_nonces()');
exception when others then
  raise notice 'pg_cron unavailable (%). Run "select cleanup_nonces();" now and then instead.', sqlerrm;
end $$;

-- ============ Chat (safe to re-run) ============
-- One channel per map: 'hold' or 'f1'…'f15' (a Depths floor). Messages older than two days are cleared hourly.
create table if not exists chat_messages (
  id          bigserial primary key,
  channel     text not null check (channel ~ '^(hold|f[0-9]{1,2})$'),
  account_id  uuid not null references accounts(id) on delete cascade,
  name        text not null,
  text        text not null check (char_length(text) between 1 and 140),
  at          timestamptz not null default now()
);
create index if not exists chat_channel_idx on chat_messages (channel, id desc);
create index if not exists chat_account_idx on chat_messages (account_id, at desc);
alter table chat_messages enable row level security;

-- Post a message in one database call: checks the hero exists, the account isn't banned, and the 1.2 s slow-mode.
create or replace function lh_chat_post(p_account uuid, p_channel text, p_text text) returns json language plpgsql as $$
declare v_name text; v_banned boolean; v_id bigint;
begin
  select h.name, a.banned into v_name, v_banned from accounts a left join heroes h on h.account_id = a.id where a.id = p_account;
  if v_banned then return json_build_object('error', 'banned'); end if;
  if v_name is null then return json_build_object('error', 'no_hero'); end if;
  if exists (select 1 from chat_messages where account_id = p_account and at > now() - interval '1.2 seconds') then
    return json_build_object('error', 'too_fast');
  end if;
  insert into chat_messages (channel, account_id, name, text) values (p_channel, p_account, v_name, p_text) returning id into v_id;
  return json_build_object('id', v_id, 'name', v_name);
end $$;

create or replace function lh_cleanup_chat() returns void language sql as $$
  delete from chat_messages where at < now() - interval '2 days';
$$;

revoke all on function lh_chat_post(uuid, text, text) from public, anon, authenticated;
revoke all on function lh_cleanup_chat() from public, anon, authenticated;
grant execute on function lh_chat_post(uuid, text, text), lh_cleanup_chat() to service_role;

do $$
begin
  perform cron.schedule('lh-cleanup-chat', '41 * * * *', 'select public.lh_cleanup_chat()');
exception when others then
  raise notice 'pg_cron unavailable (%). Run "select lh_cleanup_chat();" now and then instead.', sqlerrm;
end $$;
