# Lanternhold: Season 0 (Beta)

This is the live, multiplayer version of Lanternhold. Every player is real: they sign in with a wallet or Google, share the Hold with other players, chat, add friends, form parties and delve into dungeon instances together.

It runs on three services:
- **Vercel:** the game page (`public/`, built from `client-src/`) and the API (`api/`). The API handles sign-in, heroes, saves, friends, and X and Google linking.
- **Supabase (Postgres):** accounts, heroes, saves and friends. It's set up from `supabase/schema.sql`.
- **Cloudflare (Workers + Durable Objects):** the realtime server in `realtime/`. It carries live positions, chat, the friends online list, parties, invites and dungeon instances.

No passwords are stored. Wallet players sign a free message (Sign-In with Ethereum, Robinhood Chain 4663) that costs no gas. Google players sign in with Google.

## Already live? Updating to Season 0

1. **Database:** run the new `supabase/schema.sql` in the Supabase SQL Editor. It's safe to run again. It adds Google accounts, friends and the new permissions.
2. **Code:** replace the files in your GitHub repo with this folder, including the new `realtime/` folder, then commit and push.
3. **Realtime server:** set up Cloudflare (step 3 below) and copy its address.
4. **Vercel:** add `RT_URL` and `RT_SECRET`. Google is optional: add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` too (step 5). Then **redeploy**.
5. **Check:** open `https://YOUR-SITE/api/health`. Every line should say ok, including `realtime`.

## Season 0 launch checklist (fresh setup)

1. **Database:** create a Supabase project on **Pro** in **East US (North Virginia)** and run all of `supabase/schema.sql` (step 1).
2. **Code:** upload this folder to a **private** GitHub repo (step 2).
3. **Realtime server:** deploy `realtime/` on Cloudflare, add the `RT_SECRET` secret and `ALLOWED_ORIGINS` (step 3).
4. **Website and API:** import the repo into Vercel on **Pro**, add the environment variables and deploy. Then add `APP_DOMAIN` and redeploy (step 4).
5. **Google sign-in** (recommended): create a Google OAuth client and add its keys (step 5).
6. **Your admin hero:** sign in, create your hero, then run `supabase/link-admin-hero.sql` (step 6).
7. **Health check:** `/api/health` says `"ok": true`.
8. **Two-device check:** sign in on your phone and on a computer with **two different accounts**:
   - see each other in the Hold and chat;
   - add each other as friends;
   - invite each other to a party;
   - delve together.
9. **Optional:**
   - X linking (see "Linking an X account");
   - a custom domain;
   - a Vercel Firewall rate limit on `/api/auth/`.

**What's in Season 0:**
- **Sign-in:** wallet (Robinhood Chain) or Google. Google players can connect a wallet later, and wallet players can add Google, from the bag's Hero tab. There's no guest play.
- **A shared world:** everyone signs in to the Hold together and sees other players walk around.
  - Each "World" holds up to 50 players, and new worlds open as more people join.
  - Friends can hop to each other's world.
  - Party members are placed in the same world.
- **Chat:**
  - everyone in your world or dungeon can read it;
  - start a message with `/p` to talk to your party only;
  - speech bubbles appear over heroes.
- **Social menu:** the people icon under the settings gear.
  - **Friends:** add someone by hero name; accept requests; see who's online and where; join their world; invite them to your party.
  - **Party:** up to 4 players. See your members, leave the party, or (as leader) promote or remove someone.
  - **Nearby:** everyone around you, with Add friend and Invite.
- **Dungeon instances:** every delve is a private instance.
  - Alone, you face it alone.
  - In a party, the leader opens the way and everyone is asked to join the same dungeon. You see each other and fight the same monsters.
  - A chest or ore vein taken by one player is gone for everyone.
  - Loot goes to whoever did the most damage, and XP to everyone who hit the monster.
  - The leader takes the party down the stairs.
- **World feed:** real events from real players, like rare loot, bosses beaten and milestones reached.
- **Kept from before:**
  - the four skills (Farming, Fishing, Cooking, Smithing) up to level 99;
  - floors 1–10 with two bosses;
  - loot rarities and auras, the bank and the market;
  - settings saved to the hero;
  - touch controls on phones, and keyboard, click and scroll controls on computers.

**Not in Season 0 (coming next):**
- the token (it needs server-decided rewards and an audited claim contract; see "Before the Season 1 token");
- player-to-player trading;
- floors 11–15.

---

## Setup

### 1. Supabase: the database

1. Go to **supabase.com** and create a project. For **Region**, choose **East US (North Virginia)**, next to the game's server in Washington D.C. (`iad1`).
2. Open **SQL Editor → New query**, paste the whole of `supabase/schema.sql` and press **Run**. It's safe to run again whenever you update.
3. In **Project Settings → API** (or **Data API / API Keys**), copy:
   - the **Project URL**, like `https://abcd1234efgh5678ijkl.supabase.co`. This becomes `SUPABASE_URL`.
   - the **service_role** key (a **secret** key starting `sb_secret_` on newer dashboards). This becomes `SUPABASE_SERVICE_ROLE_KEY`. ⚠️ Only ever paste this into Vercel's environment variables.

### 2. GitHub: where the code lives

Create a **private** repo, then add this folder with **GitHub Desktop** (File → Add local repository → Commit → Publish). Keep the folder structure, including `api/`, `lib/`, `client-src/`, `realtime/` and `supabase/`.

### 3. Cloudflare: the realtime server (about 10 minutes)

1. Sign up at **dash.cloudflare.com**. The free plan works for testing: about 2 million player messages a day. For launch, switch to **Workers Paid** ($5 a month) under **Workers & Pages → Plans**.
2. Open **Workers & Pages → Create → Import a repository**, connect GitHub and pick your repo. Set:
   - **Project name:** `lanternhold-realtime`
   - **Root directory:** `realtime`
   - **Build command:** leave empty
   - **Deploy command:** `npx wrangler deploy`

   Then click **Deploy**. Every push to GitHub redeploys it automatically.
3. Open the worker's **Settings → Variables and Secrets** and add two entries:
   - a **Secret** named `RT_SECRET`: 64 random characters. Make a new one; don't reuse `SESSION_SECRET`.
   - a **Text** variable named `ALLOWED_ORIGINS`: your game's address with `https://`, like `https://lanternhold.vercel.app`. Separate several addresses with commas.
4. Copy the worker's address from its overview page, like `https://lanternhold-realtime.yourname.workers.dev`. Opening it should show "Lanternhold realtime: ok".

### 4. Vercel: the website and API

1. On **vercel.com**, choose **Add New → Project** and import the repo. Leave the build settings as they are.
2. Add these **Environment Variables**:

   | Name | Value |
   |---|---|
   | `SUPABASE_URL` | the Project URL from step 1 |
   | `SUPABASE_SERVICE_ROLE_KEY` | the service_role / secret key from step 1 |
   | `SESSION_SECRET` | 64 random characters |
   | `RT_URL` | the Cloudflare worker address from step 3 |
   | `RT_SECRET` | **the same** 64 characters you put in Cloudflare's `RT_SECRET` |
   | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | from step 5 (optional) |

3. **Deploy**. Then add `APP_DOMAIN` = your site address without `https://` (like `lanternhold.vercel.app`) and **redeploy**.
4. If you use a **custom domain**:
   - update `APP_DOMAIN`;
   - add the new address to Cloudflare's `ALLOWED_ORIGINS`;
   - add it to the Google redirect URI and the X callback URL;
   - redeploy.

   If you also give the worker a custom domain, add it to `connect-src` in `vercel.json` (by default only `*.workers.dev` is allowed).

### 5. Google sign-in (recommended, free, about 10 minutes)

1. Go to **console.cloud.google.com** and create a project called "Lanternhold".
2. Open **Google Auth Platform**:
   - **Branding:** set the app name, support email and your site address.
   - **Audience:** choose **External**, then **Publish app**, so anyone can sign in. The game only asks for basic sign-in (your Google ID and email), so Google doesn't need to review it.
3. Open **Clients → Create client → Web application**. Under **Authorized redirect URIs**, add `https://YOUR-SITE/api/auth/google/callback`. `/api/health` prints the exact address.
4. Copy the **Client ID** and **Client secret** into Vercel as `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`, then redeploy.

Google blocks sign-in inside in-app browsers, such as wallet apps, X and Instagram. The game says so, and tells Google players to use Safari or Chrome. Wallet players keep using their wallet's browser.

### 6. Your admin hero

1. Sign in with your wallet and create your hero.
2. In Supabase's SQL Editor, run `supabase/link-admin-hero.sql`. It's set to `0x2f62…dcA2`; edit the address for a different wallet. It makes that hero the game's only admin, with the Blue Party Hat, and copies your demo progress the first time.
3. Sign out and back in to get the admin loadout.
4. To rename the hero to Lantern, run `supabase/rename-hero-lantern.sql`.

Only the database can make an admin. To list admins, run `select name from heroes where is_admin;`.

---

## How multiplayer works

- **The lobby:** one Cloudflare "Lobby" knows who's online.
  - It picks your world: your party's world if they're in one, otherwise the busiest world with space, so the Hold feels lively.
  - It delivers friend status, party invites and the world feed.
  - Each hero can only be online on one device. Signing in elsewhere closes the first device.
- **Worlds:** each world is a separate room of up to 50 players.
  - Positions are sent up to 10 times a second, only while you move, and sent on to everyone in batches.
  - Chat is filtered and rate-limited by the server, and names always come from the sign-in, never from the player's device.
- **Dungeon instances** are private rooms that only your party can join.
  - **The host:** the leader's game is the host. It runs the monsters and sends them to everyone 10 times a second.
  - **Other players:** their attacks go to the host, which applies the damage, decides who gets the loot and tells everyone. Chests, glowcaps and ore are handled the same way, so each can only be taken once.
  - **If the host leaves**, the player who has been there longest takes over the monsters without a break. Members who join late land on the party's current floor with the dungeon as it is.
- **Saves:** heroes still save to Supabase exactly as before.
- **Fallback:** if the realtime server can't be reached, the game still works solo, and Social and chat explain why they're unavailable.

## How saving works
## How saving works

- While you play, the game saves to the server every 10–14 seconds, but only if something changed. It also saves right away when you return to the Hold, when you die and when you sign out.
- Each save carries a revision number. If a second device saves an old copy over newer progress, the server refuses it and that device reloads the newest progress. Two devices can never overwrite each other.
- The server checks every save. It cleans out unknown items and invalid values, then refuses "impossible" jumps such as millions of gold in a few seconds, piles of new legendaries, or skill levels gained too fast. Refused saves are logged in the `save_flags` table so you can review them (`select * from save_flags order by at desc;`).
- The Blue Party Hat is removed from any save that isn't an admin hero.
- To ban someone, run `update accounts set banned = true where id = (select account_id from heroes where name_key = lower('TheirName'));`. They can no longer load their hero, save, chat or join the realtime server (their next ticket is refused).

## Costs and plans

- **Vercel:** the free Hobby plan is for **non-commercial, personal use only**. A game with a token is commercial, so move to **Pro** before you launch publicly. Pro is $20 a month per developer seat, and that includes a monthly usage credit. Beyond that, Vercel charges $0.60 per million requests and $0.128 per CPU-hour in `iad1`.
- **Supabase:** the free plan has a 500 MB database and **pauses a project after a week of inactivity**. **Pro** is $25 a month and never pauses. It includes $10 of compute credit, which covers the default Micro database, plus 250 GB of egress and unlimited API requests. For 1,000 players at once, switch to **Small** compute (about $15 a month, so about $5 more after the credit) for headroom. Do this under **Project Settings → Compute and Disk**.
- **Storage:** a save is roughly 0.5–2 KB, so even 100,000 players fit in a few hundred MB.

- **Cloudflare (realtime):** Workers Paid is $5 a month. Durable Objects cost $0.15 per million incoming messages, where 20 game messages count as one billed request. Outgoing messages are free, and so is bandwidth. You also pay for time while a room has players in it: about $4 a month for a room that's busy around the clock.

**What 1,000 players costs** (from the load tests):

| | 1,000 players online 24/7 | A realistic month (1,000 at peak, ~250 on average) |
|---|---|---|
| Vercel (plan + saves) | ~$130 | ~$60 |
| Supabase (Pro + Small) | $30 | $30 |
| Cloudflare: messages | ~$95 | ~$25 |
| Cloudflare: room time | ~$100 (20 busy worlds) | ~$25 |
| Cloudflare plan | $5 | $5 |
| **About** | **$360 / month** | **$145 / month** |

Ways to spend less:
- **Save less often:** raise `SAVE_GAP` in `client-src/account-live.js`.
- **Send positions less often:** raise `MP.sendT=.1` in `client-src/game.js` from 0.1 to 0.15 seconds. That cuts realtime messages by a third, and movement still looks smooth because other players glide between updates.

## Built for 1,000+ players at once

**What was done to handle the load:**
- **Fewer requests.** The game only saves when something actually changed. A player standing in the Hold, reading the bank or AFK sends nothing at all.
- **Spread out.** Each player gets their own save rhythm, every 10–14 seconds, so 1,000 players never all hit the server at the same moment. When the server is busy or a connection drops, the game waits longer and longer between retries (5 s, 10 s, 20 s… up to a minute) instead of hammering it.
- **Fewer database trips.** A save is now **2** database calls (was 3) and loading your hero is **1** (was 3). Each uses a small function inside Postgres (`lh_state`, `lh_cas_save`). The database clock times saves, so the anti-cheat timing can't drift.
- **Server next to the database.** `vercel.json` pins the functions to Washington D.C. (`iad1`), beside Supabase's North Virginia region. It also turns on Fluid compute, so one server instance handles many players at once. Every request is capped at 10 seconds so nothing hangs.
- **Database tuned for constant saving.** The `saves` table leaves room for in-place updates and is vacuumed often. Old sign-in codes are cleared every hour automatically (pg_cron).
- **Cached game files.** `game.js` is cached for a year (its name changes with every build), so returning players only download the small page.
- **Safer under pressure:**
  - banned accounts are now also blocked from saving;
  - refused saves are rate-limited like normal ones, so a cheater can't flood the review log;
  - the new database functions can only be called with the server key.

**Realtime load test** (`realtime/test/rt-load.mjs`, run on one machine against the local Cloudflare runtime):
- 600 players across 12 full worlds walked around for 45 seconds, sending 2,900 position updates a second. Positions reached other players in 160 ms typically, including the 100 ms batching. No connections dropped.
- 1,000 players across 20 worlds: no dropped connections. Delays were higher (250 ms typical) because the test players, the server and every world ran on one computer. On Cloudflare each world runs separately.

**Save load test, 1,000 players** (`npm run loadtest`, real wallet signatures, simulated 15 ms database calls):
- 1,000 players signed in and created heroes in **9 seconds**.
- During 2 minutes of play, about 57 requests a second came in. **7,551 saves** were made with **0 failures**. A save took **33 ms** typically and 49 ms for the slowest 1 in 100.
- The server code used about **1.6 ms of CPU per request**, about 9% of one CPU core for all 1,000 players.
- At 2,000 players with slower 25 ms database calls: 10,911 saves, 0 failures, 53 ms typical.

**Test your real deployment before launch** (after upgrading to Pro):
```bash
npm run loadtest -- --url https://YOUR-SITE.vercel.app --players 1000 --minutes 3 --confirm
```
This creates throwaway heroes named `lt_xxxx_1…`. Afterwards, run `supabase/cleanup-load-test.sql` in the SQL Editor to remove them. Watch **Supabase → Reports** and **Vercel → Observability** while it runs.

**Matching regions.** If your Supabase project isn't in North Virginia, change `"regions"` in `vercel.json` to the closest match:

| Supabase region | Vercel region |
|---|---|
| East US (N. Virginia) | `iad1` |
| West US (N. California) | `sfo1` |
| West EU (Ireland) | `dub1` |
| Central EU (Frankfurt) | `fra1` |
| Southeast Asia (Singapore) | `sin1` |

**Optional extra protection (Vercel Pro).** Under **Firewall → Rules**, add a rate limit on `/api/auth/` of about 30 requests per minute per IP. This blunts bots that spam sign-ins. Normal players sign in once a week.

## Chat

Players tap the chat button at the bottom of the screen (or press **T** on a computer) to open a see-through chat panel. Tapping it again closes it.
- **Who sees it:** everyone in your world, or everyone in your dungeon instance. Start a message with `/p` to talk to your party only.
- **Server rules:**
  - names come from the sign-in, so they can't be faked;
  - messages are up to 140 characters, with offensive words masked;
  - each player can send one message every 1.2 seconds.
- **History:** messages aren't stored. A world keeps its last 30 messages in memory so newcomers see the recent conversation. (The old `chat_messages` table from the previous build is no longer used.)

## Linking an X account

Players can link their X account to their hero from the bag's **Hero** tab (**Link X**). They approve it on X itself, so nobody can claim someone else's account. One X account can be linked to only one hero, and players can unlink it any time. The game keeps only the X account's id and @username. X's access token is thrown away straight after reading those.

**To turn it on (about 10 minutes):**
1. Go to **developer.x.com**, sign in with the X account that will own the app, and create a **Project** and an **App**. X's API is now pay-per-use with no free tier, so add a few dollars of credit. Each link is one profile lookup, about $0.01.
2. In the app's **User authentication settings**, turn on **OAuth 2.0** and set:
   - App type: **Web App** (a confidential client)
   - Callback URL: `https://YOUR-SITE/api/x/callback`. Use your real address; `/api/health` prints the exact one.
   - Website URL: `https://YOUR-SITE`
3. Copy the **OAuth 2.0 Client ID** and **Client Secret** into Vercel's Environment Variables as `X_CLIENT_ID` and `X_CLIENT_SECRET`, then redeploy.
4. Open `/api/health`. The `x` line should say "ok: X linking is on".

Until it's on, the Hero tab shows "X account · Coming soon". If you change your domain later, update the callback URL on X as well.

## Before the Season 1 token

Right now the player's device works out combat and loot, and the server checks that results are *plausible*. That is good enough for a free game. It is **not** enough for anything worth real money, because a skilled cheater could still farm within the limits. Before tokens can be collected:

1. **Server-decided rewards:** the server rolls token drops (boss kills, season goals) and records them in a `claims` table. Token amounts never come from the client.
2. **Claim vouchers:** the server signs an EIP-712 voucher (`wallet, amount, nonce, expiry`). The player redeems it on a claim contract on Robinhood Chain (4663), which checks the signature and that each voucher is used only once.
3. **Limits:** caps per day and per wallet, an emergency pause on the contract, and reviewing `save_flags` before payouts.
4. **Audit:** have the claim contract audited before mainnet, and keep the signing key in a secrets manager, separate from the session secret.

None of this changes what players have now. Their heroes and progress carry straight into Season 1.

---

## For developers

Requires Node 20 or newer.

```bash
npm install
npm run build      # client-src/ → public/index.html + public/game.js, and lib/gamedata.js
npm run dev        # http://localhost:3000, in-memory database (no Supabase needed)
npm test           # 72 API tests (wallet signatures, Google and X with stand-in servers, friends, saves)
npm run loadtest   # 1,000 simulated players saving against a local server

cd realtime && npm install
npm run dev        # the realtime server on ws://127.0.0.1:8787 (secret in realtime/.dev.vars)
npm test           # 45 realtime tests: tickets, worlds, chat, friends, parties, instances, host handover
node test/rt-load.mjs --players 600 --seconds 60
```

To play locally with other players, run both servers. Start the realtime server first, then start the game with `RT_URL=ws://127.0.0.1:8787 RT_SECRET=<the secret from realtime/.dev.vars> npm run dev`, and open http://localhost:3000 in two browsers.

Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in your shell before `npm run dev` to use a real database instead.

- Edit game code in `client-src/`, never in `public/`, which is generated. Item and skill tables live in `client-src/data.js`, and the build copies them to the server so both always agree.
- API routes: `api/auth/nonce`, `api/auth/verify`, `api/auth/logout`, `api/auth/google/start`, `api/auth/google/callback`, `api/auth/link-wallet`, `api/me`, `api/config`, `api/name`, `api/hero`, `api/save`, `api/friends`, `api/rt-ticket`, `api/x/start`, `api/x/callback`, `api/x/unlink`, `api/health`.
- Security:
  - sessions are signed cookies (HttpOnly, Secure, SameSite=Lax, 7 days);
  - every write needs the `X-LH` header and a same-origin request;
  - a strict Content-Security-Policy allows scripts from this site only;
  - the database has Row Level Security on with no public policies, so only the server key can reach it.

### Troubleshooting

- **Players can't see each other, or Social says the realtime server isn't reachable:**
  - `/api/health` shows the `realtime` line;
  - `RT_URL` must be the worker's address;
  - `RT_SECRET` must be identical in Vercel and Cloudflare;
  - `ALLOWED_ORIGINS` in Cloudflare must contain your site address exactly, with `https://` and no trailing `/`;
  - after changing any of these, redeploy Vercel.
- **Google sign-in shows "redirect_uri_mismatch":** add the exact redirect URI from `/api/health` in Google Cloud → Clients.
- **First, open `https://YOUR-SITE/api/health`.** It checks every setting and the database, and names anything wrong. Secret values are never shown.
- **"Couldn't reach the server" or "isn't set up correctly" when signing in:**
  - `SUPABASE_URL` must be the **Project URL**, like `https://abcd1234efgh5678ijkl.supabase.co`. Find it in Supabase → Project Settings → API (or Data API). The server now also accepts the bare project ID, a missing `https://` or a trailing `/rest/v1`.
  - "Permission denied" in the health page: run `supabase/schema.sql` again. New Supabase projects no longer give the server key access to tables automatically, and the script now grants it.
  - Every time you change an environment variable in Vercel, **redeploy**. Changes don't apply until you do.

- **"Sign-in failed" right after deploying:** check that `APP_DOMAIN` exactly matches the address bar (no `https://`, no trailing `/`) and that you redeployed after setting it.
- **Every request gives 500:** an environment variable is missing or misspelled. The Vercel **Logs** tab names the one at fault.
- **Desktop wallet extension isn't detected:** some extensions inject scripts that a strict Content-Security-Policy blocks. Wallet in-app browsers aren't affected. If needed, add the extension's origin to `script-src` in `vercel.json`.
- **Saves feel slow (over ~150 ms):** the Vercel region probably doesn't match the Supabase region. See "Matching regions".
- **Supabase CPU stays above 70% in Reports:** move up one compute size (Small → Medium). It takes about a minute, with a brief reconnect.
- **Supabase project paused (free plan):** open the dashboard and click **Restore**, or upgrade to Pro.
