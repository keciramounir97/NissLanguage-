export const LETTERS = {
  a: "🍓",
  b: "🧋",
  c: "🧁",
  d: "💎",
  e: "✨",
  f: "🧚",
  g: "💗",
  h: "🍯",
  i: "💋",
  j: "🦋",
  k: "👑",
  l: "🌙",
  m: "🧸",
  n: "💅",
  o: "🍑",
  p: "👛",
  q: "🎀",
  r: "🌹",
  s: "⭐",
  t: "🌷",
  u: "🦄",
  v: "💜",
  w: "🌊",
  x: "✖️",
  y: "💛",
  z: "🦓",
};

export function normalize(value) {
  return String(value).normalize("NFC").replace(/\uFE0F/g, "");
}

export function letterIndex(letters = LETTERS) {
  const emojiToLetter = new Map();
  for (const [letter, emoji] of Object.entries(letters)) {
    emojiToLetter.set(normalize(emoji), letter);
  }
  return emojiToLetter;
}

export function spell(token, emojiToLetter = letterIndex()) {
  const chars = Array.from(normalize(token));
  if (chars.length === 0) return null;
  let word = "";
  for (const char of chars) {
    const letter = emojiToLetter.get(char);
    if (!letter) return null;
    word += letter;
  }
  return word;
}

export function encodeWord(word, letters = LETTERS) {
  const clean = String(word).toLowerCase();
  let out = "";
  for (const letter of clean) {
    if (!letters[letter]) {
      throw new Error(`Lettre hors alphabet : ${letter}`);
    }
    out += normalize(letters[letter]);
  }
  return out;
}
