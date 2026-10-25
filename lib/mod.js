// Moderation rules shared by sign-in, the realtime ticket and the admin endpoint.
// Bans are 3 strikes: 24 hours, then 72 hours, then permanent. They're per account, not per IP.
export const BAN_HOURS = [24, 72];

// Is this account banned right now? Works on an accounts row (banned, banned_until) or on lh_state's result.
export function banOf(a, now = Date.now()) {
  if (!a) return null;
  // accounts rows: `banned` is the permanent flag. lh_state: `banned` covers both, `ban_perm` is the permanent flag.
  const perm = 'ban_perm' in a ? a.ban_perm === true : a.banned === true;
  if (perm) return { perm: true };
  const until = a.ban_until || a.banned_until;
  if (until && Date.parse(until) > now) return { until: new Date(until).toISOString() };
  return null;
}
export const banText = b => !b ? '' : b.perm ? 'This account is permanently banned.'
  : 'This account is banned until ' + new Date(b.until).toUTCString().replace(/:\d\d GMT$/, ' UTC') + '.';

// The next ban for an account that already has `strikes` bans.
export function nextBan(strikes, now = Date.now()) {
  const n = Math.max(0, strikes | 0) + 1;
  return n <= BAN_HOURS.length ? { strikes: n, until: new Date(now + BAN_HOURS[n - 1] * 3600e3).toISOString(), perm: false } : { strikes: n, until: null, perm: true };
}
