// Hero name rules, enforced on the server (the browser runs the same checks only for instant feedback).
export const NAME_RE = /^[A-Za-z0-9_]{3,16}$/;
const RESERVED = new Set(['admin', 'administrator', 'moderator', 'mod', 'lanternhold', 'robinhood', 'support', 'system', 'official', 'gm', 'staff', 'dev', 'developer',
  'mira_dig', 'oakhand', 'lumen_lou', 'pitkid', 'runa_k', 'tallowtom', 'vexa', 'gravelgus', 'sora_lamps', 'bram_b']);
const BAD = ['fuck', 'shit', 'bitch', 'cunt', 'dick', 'cock', 'pussy', 'nigg', 'fag', 'rape', 'nazi', 'hitler', 'porn', 'slut', 'whore', 'penis', 'vagina', 'retard', 'kkk', 'anus', 'molest', 'pedo'];
const squash = n => n.toLowerCase().replace(/0/g, 'o').replace(/1/g, 'i').replace(/3/g, 'e').replace(/4/g, 'a').replace(/5/g, 's').replace(/7/g, 't').replace(/_/g, '');

export function nameProblem(name) {
  if (typeof name !== 'string' || !NAME_RE.test(name)) return '3–16 letters, numbers or _';
  if (BAD.some(w => squash(name).includes(w))) return 'Please pick a different name';
  if (RESERVED.has(name.toLowerCase())) return 'That name is taken';
  return null;
}

const LOOK_N = { skin: 6, hair: 10, cloth: 10, style: 4 };
export function cleanLook(l) {
  const o = l && typeof l === 'object' ? l : {};
  const out = {};
  for (const [k, n] of Object.entries(LOOK_N)) { const v = Math.floor(Number(o[k])); out[k] = Number.isFinite(v) && v >= 0 && v < n ? v : 0; }
  return out;
}

// Chat text: no control characters or angle brackets, single spaces, at most 140 characters,
// and offensive words masked at the start of a word ("grape" is fine, the slur isn't).
const CHAT_BAD = BAD.filter(w => w !== 'anus');
export function cleanChat(t) {
  if (typeof t !== 'string') return '';
  t = t.replace(/[\u0000-\u001f\u007f<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, 140);
  for (const w of CHAT_BAD) t = t.replace(new RegExp('\\b' + w + '\\w*', 'gi'), m => m[0] + '*'.repeat(m.length - 1));
  return t;
}
export const CHAT_CHANNEL = /^(hold|f([1-9]|1[0-5]))$/;
