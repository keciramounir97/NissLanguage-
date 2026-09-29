import { LETTERS, letterIndex, normalize, spell } from "./alphabet.js";
import { buildIndex, lexicon } from "./lexicon.js";

export const TARGETS = new Set(["en", "fr", "ar"]);
export const CONTEXTS = new Set([
  "literal",
  "cute",
  "gf",
  "hangry",
  "hormones",
  "angry",
  "contraire",
]);

const LENS = {
  gf: {
    en: (s) => `${s} Babe.`,
    fr: (s) => `${s} Mon cœur.`,
    ar: (s) => `${s} يا عمري.`,
  },
  hangry: {
    en: (s) => `${s} I'm hungry.`,
    fr: (s) => `${s} J'ai faim.`,
    ar: (s) => `${s} أنا جائعة.`,
  },
  hormones: {
    en: (s) => `${s} I feel it all.`,
    fr: (s) => `${s} Je ressens tout.`,
    ar: (s) => `${s} أشعر بكل شيء.`,
  },
  angry: {
    en: (s) => `${s} Don't push.`,
    fr: (s) => `${s} N'insiste pas.`,
    ar: (s) => `${s} لا تضغط.`,
  },
  contraire: {
    en: (s) => `Not: ${s}`,
    fr: (s) => `Pas : ${s}`,
    ar: (s) => `ليس: ${s}`,
  },
};

export function tokenize(input) {
  return normalize(input)
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => (/^[a-z0-9]+$/i.test(token) ? token.toLowerCase() : token));
}

function reading(entry, target, context) {
  const chosen = entry.readings[context]?.[target];
  if (chosen) return chosen;
  const base = entry.readings.literal[target];
  if (context === "literal" || context === "cute") return base;
  return LENS[context][target](base);
}

export function translate(input, { target = "en", context = "literal", book } = {}) {
  if (!TARGETS.has(target)) {
    throw new Error(`Langue inconnue : ${target}`);
  }
  if (!CONTEXTS.has(context)) {
    throw new Error(`Humeur inconnue : ${context}`);
  }

  const tokens = tokenize(input);
  if (tokens.length === 0) {
    return { text: "", target, context, parts: [], unknown: [] };
  }

  const list = book?.entries || lexicon;
  const index = buildIndex(list);
  const emojiToLetter = letterIndex(book?.letters || LETTERS);
  const maxLen = Math.max(...list.map((entry) => entry.niss.length));
  const parts = [];
  const unknown = [];
  let i = 0;

  while (i < tokens.length) {
    let found = null;
    let foundLen = 0;
    const room = Math.min(maxLen, tokens.length - i);
    for (let len = room; len >= 1; len -= 1) {
      const key = tokens.slice(i, i + len).join(" ");
      const entry = index.get(key);
      if (entry) {
        found = entry;
        foundLen = entry.niss.join(" ") === key ? entry.niss.length : 1;
        break;
      }
    }

    if (found) {
      parts.push({
        niss: tokens.slice(i, i + foundLen).join(" "),
        kind: found.kind,
        unknown: false,
        text: reading(found, target, context),
      });
      i += foundLen;
      continue;
    }

    const token = tokens[i];
    const spelled = spell(token, emojiToLetter);
    if (spelled) {
      const alias = index.get(spelled);
      if (alias) {
        parts.push({
          niss: token,
          kind: alias.kind,
          unknown: false,
          text: reading(alias, target, context),
        });
      } else {
        parts.push({ niss: token, kind: "spelled", unknown: false, text: spelled });
      }
    } else {
      unknown.push(token);
      parts.push({ niss: token, kind: "unknown", unknown: true, text: token });
    }
    i += 1;
  }

  return {
    text: parts.map((part) => part.text).join(" "),
    target,
    context,
    parts,
    unknown,
  };
}

export function translateText({ text, source = "niss", target = "en", context = "literal" }) {
  if (source !== "niss") {
    throw new Error("NissLanguage traduit depuis le niss.");
  }
  return translate(text, { target, context });
}
