# Lanternhold: live build

This is the version of Lanternhold that goes on the internet. It keeps every player's hero and progress in a real database, so the same profile loads on any phone or computer that signs in with the same wallet.

- **Game page:** `public/`, a static site built from `client-src/`.
- **Server:** `api/`, small Vercel functions. They check wallet sign-ins, give out sessions, reserve hero names and save progress.
- **Database:** Supabase (Postgres), set up from `supabase/schema.sql`.

No accounts or passwords are stored. A player proves they own their wallet by signing a free message (Sign-In with Ethereum, Robinhood Chain id 4663). Signing costs no gas and moves no funds.

## Season 0 launch checklist

Work through this in order. The detailed steps are in "Setup" below.

1. **Database.** Create a Supabase project on the **Pro** plan in **East US (North Virginia)**. Run all of `supabase/schema.sql` in the SQL Editor. If you already ran an older copy, run the new one again: it's safe to repeat and adds the speed-ups and chat.
2. **Code.** Upload this whole folder to a **private** GitHub repo. If you're updating, replace the old files.
3. **Hosting.** Import the repo into Vercel on the **Pro** plan and add the environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `SESSION_SECRET` (64 random characters)

   Deploy. Then add `APP_DOMAIN` (the site address without `https://`) and **redeploy**.
4. **Your admin hero.** Open the site in your wallet's browser, sign in and create the hero **Test**. Run `supabase/import-test-hero.sql`. Sign out and back in: Test gets the Blue Party Hat, admin powers and the top-gear loadout.
5. **Load test.** Run `npm run loadtest -- --url https://YOUR-SITE --players 1000 --minutes 3 --confirm`. Then run `supabase/cleanup-load-test.sql` to remove the test heroes.
6. **Phone check:**
   - sign in, plant Wheat, fish, forge, delve a few floors and send a chat message;
   - open the site on a second device with the same wallet and confirm everything loaded.
7. **Optional:**
   - a custom domain (update `APP_DOMAIN` and redeploy);
   - a Vercel Firewall rate limit on `/api/auth/`.

**What's in Season 0:**
- **Sign-in:** wallet sign-in on Robinhood Chain, or guest play.
- **Heroes:** unique hero names, a look you design and progress saved on the server.
- **Skills:** Farming, Fishing, Cooking and Smithing, levels 1–99.
- **The Depths:** floors 1–10, with two bosses.
- **Loot:** lanterns, capes and helmets from Common to Legendary, with auras.
- **Storage:** a bank that can be expanded.
- **Market:** sell from your bag or bank, and buy from the Hold shop.
- **Social:** chat with players on the same map.
- **Settings:** zoom, brightness and more, saved to each hero.
- **Controls:** touch on phones; keyboard plus mouse click and scroll-zoom on computers.

**Not in Season 0 (coming next):**
- the token (it needs server-decided rewards and an audited claim contract; see "Before the Season 1 token");
- seeing other players move live;
- real player-to-player trading;
- floors 11–15.

---

## Setup (about 30 minutes, best on a computer)

### 1. Supabase: the database

1. Go to **supabase.com**, sign up and click **New project**. Pick a strong database password (you won't need it again).
   For **Region**, choose **East US (North Virginia)**. The game's server runs in Washington D.C. (`iad1`), right next to it, so every save is a few milliseconds away from the database instead of a cross-country trip. If you pick another region, see "Matching regions" below.
2. When the project is ready, open **SQL Editor → New query**. Paste the whole of `supabase/schema.sql` and press **Run**. You should see "Success. No rows returned".
   The file is safe to run again. If you already set up the database from an earlier version, just run it again to add the speed-ups.
3. Open **Project Settings → API** (or **API Keys**) and copy two values:
   - **Project URL**, for example `https://abcd1234.supabase.co`. This becomes `SUPABASE_URL`.
   - **service_role** key (on newer dashboards, a **secret** key starting `sb_secret_`). This becomes `SUPABASE_SERVICE_ROLE_KEY`.

   ⚠️ The service key can do anything in your database. Only ever paste it into Vercel's environment variables. Never put it in the game files, GitHub or chat.

### 2. GitHub: where the code lives

1. Create a free account at **github.com** and click **New repository**. Name it `lanternhold` and choose **Private**.
2. Unzip `lanternhold-live.zip` on your computer.
3. Get the files into the repo by either method:
   - **Easiest:** install **GitHub Desktop**, then choose File → Add local repository and pick the unzipped folder. Commit, then **Publish** (keep it private).
   - **In the browser:** on the new repo page, click "uploading an existing file" and drag in everything inside the folder.

   Keep the folder structure (`api/`, `lib/`, `client-src/` and so on). There is no `node_modules` folder; Vercel installs it.

### 3. Vercel: the website and server

1. Go to **vercel.com**, sign up with GitHub and click **Add New → Project**. Import the `lanternhold` repo.
2. Vercel reads `vercel.json` by itself. Leave the build settings as they are.
3. Open **Environment Variables** and add:

   | Name | Value |
   |---|---|
   | `SUPABASE_URL` | the Project URL from step 1 |
   | `SUPABASE_SERVICE_ROLE_KEY` | the service_role / secret key from step 1 |
   | `SESSION_SECRET` | 64 random characters (see below) |

   To make `SESSION_SECRET`, run `openssl rand -hex 32` in a terminal, or use any password generator set to 64 characters of letters and numbers. If you change it later, everyone is signed out (their progress is safe).
4. Click **Deploy**. When it finishes you get an address such as `lanternhold.vercel.app`.
5. Go back to **Settings → Environment Variables** and add `APP_DOMAIN` = that address **without** `https://`, for example `lanternhold.vercel.app`. Then open **Deployments → ⋯ → Redeploy**.

   `APP_DOMAIN` makes sure wallet sign-in messages and requests only count for your own site.

### 4. First sign-in and your Test hero

1. Open your site in a wallet's built-in browser (MetaMask, Coinbase Wallet, Rabby and others), or on desktop Chrome with a wallet extension.
2. Connect your wallet, sign the message and create the hero **Test**.
3. In Supabase, open **SQL Editor**, paste `supabase/import-test-hero.sql` and run it. This does two things:
   - marks Test as the game's only admin, so the server lets it keep the **Blue Party Hat** and admin powers;
   - copies the progress from your demo save onto Test.
4. Reload the game. Test loads with the party hat.

Only the database can make someone an admin; nothing in the game page can. To check who is an admin, run `select name from heroes where is_admin;`.

### 5. Optional: your own domain

In Vercel, open **Settings → Domains**, add for example `play.lanternhold.gg` and follow the DNS steps. Then change `APP_DOMAIN` to that domain and redeploy.

---

## How saving works

- While you play, the game saves to the server every 10–14 seconds, but only if something changed. It also saves right away when you return to the Hold, when you die and when you sign out.
- Each save carries a revision number. If a second device saves an old copy over newer progress, the server refuses it and that device reloads the newest progress. Two devices can never overwrite each other.
- The server checks every save. It cleans out unknown items and invalid values, then refuses "impossible" jumps such as millions of gold in a few seconds, piles of new legendaries, or skill levels gained too fast. Refused saves are logged in the `save_flags` table so you can review them (`select * from save_flags order by at desc;`).
- The Blue Party Hat is removed from any save that isn't an admin hero.
- Guests can still play without a wallet, but their progress stays only on that device.
- To ban someone, run `update accounts set banned = true where wallet = '0x…';`. They can no longer load or save their hero.

## Costs and plans

- **Vercel:** the free Hobby plan is for **non-commercial, personal use only**. A game with a token is commercial, so move to **Pro** before you launch publicly. Pro is $20 a month per developer seat, and that includes a monthly usage credit. Beyond that, Vercel charges $0.60 per million requests and $0.128 per CPU-hour in `iad1`.
- **Supabase:** the free plan has a 500 MB database and **pauses a project after a week of inactivity**. **Pro** is $25 a month and never pauses. It includes $10 of compute credit, which covers the default Micro database, plus 250 GB of egress and unlimited API requests. For 1,000 players at once, switch to **Small** compute (about $15 a month, so about $5 more after the credit) for headroom. Do this under **Project Settings → Compute and Disk**.
- **Storage:** a save is roughly 0.5–2 KB, so even 100,000 players fit in a few hundred MB.

**What 1,000 players costs** (from the load test numbers):

| | 1,000 players online 24/7 | A realistic month (1,000 at peak, ~250 on average) |
|---|---|---|
| Requests | ~148 million | ~37 million |
| Vercel usage | ~$90 requests + ~$8 CPU + ~$15 memory | ~$22 + ~$2 + ~$15 |
| Vercel plan | $20 | $20 (credit covers part of the usage) |
| Supabase | $25 + $5 (Small) | $25 + $5 (Small) |
| **About** | **$160 / month** | **$70–90 / month** |

The main cost is the number of requests. If you want to spend less, make players save less often by raising `SAVE_GAP` in `client-src/account-live.js`, for example to 20 seconds. That roughly halves the request bill, and a crash can then lose up to 20 seconds of play instead of 10. Returning home and dying always save immediately either way.

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

**Load test, 1,000 players** (`npm run loadtest`, real wallet signatures, simulated 15 ms database calls):
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
- **Channels:** each map has its own channel. The Hold is one, and each Depths floor (Floor 1–15) is another, so players on the same floor talk to each other.
- **Rules the server enforces:**
  - only signed-in heroes can chat, and messages carry the hero's name;
  - messages are up to 140 characters, with offensive words masked;
  - each player can send one message every 1.2 seconds;
  - banned accounts can't post.
- **Storage:** messages live in the `chat_messages` table. Messages older than 2 days are deleted every hour (pg_cron).
- **Reading chat:** to read what's been said, run `select name, text, at from chat_messages where channel = 'hold' order by id desc limit 50;`.
- **Cost:** the game checks for new messages every 3 seconds, but only while that player has chat open. A closed chat costs nothing. If 200 of 1,000 players keep chat open, that adds about 65 small requests a second.

## What is still simulated

The other players you see walking around town and the market listings are still played by the game itself, as in the demo. Chat is real. Seeing each other move live and real player-to-player trading are the next big steps. They need a realtime channel (Supabase Realtime is a good fit) and server-side trade escrow.

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
npm test           # 46 API tests with real wallet signatures
npm run loadtest   # 1,000 simulated players against a local server (see "Built for 1,000+ players")
```

Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in your shell before `npm run dev` to use a real database instead.

- Edit game code in `client-src/`, never in `public/`, which is generated. Item and skill tables live in `client-src/data.js`, and the build copies them to the server so both always agree.
- API routes: `api/auth/nonce`, `api/auth/verify`, `api/auth/logout`, `api/me`, `api/name`, `api/hero`, `api/save`.
- Security:
  - sessions are signed cookies (HttpOnly, Secure, SameSite=Lax, 7 days);
  - every write needs the `X-LH` header and a same-origin request;
  - a strict Content-Security-Policy allows scripts from this site only;
  - the database has Row Level Security on with no public policies, so only the server key can reach it.

### Troubleshooting

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
