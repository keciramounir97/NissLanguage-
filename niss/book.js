import { LETTERS, normalize } from "./alphabet.js";
import { lexicon } from "./lexicon.js";

export const PASSWORD = "10092025";
const LOCALES = { en: "en", fr: "fr", ar: "ar" };

export function checkPassword(value) {
  return String(value).trim() === PASSWORD;
}

export function entryId(entry) {
  return entry.id || `${entry.kind}:${entry.niss.map((token) => normalize(token)).join(" ")}`;
}

export function emptyPatch() {
  return { letters: {}, words: {}, custom: [] };
}

export function baseBook() {
  return {
    letters: { ...LETTERS },
    entries: lexicon.map((entry) => ({
      ...entry,
      id: entryId(entry),
      niss: [...entry.niss],
    })),
  };
}

function splitNiss(value) {
  return normalize(value)
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => (/^[a-z0-9]+$/i.test(token) ? token.toLowerCase() : token));
}

function literalEntry(entry, edit) {
  const niss = splitNiss(edit.niss);
  if (niss.length === 0) throw new Error("Le niss est vide.");
  for (const key of ["en", "fr", "ar"]) {
    if (!String(edit[key] || "").trim()) throw new Error("Anglais, français et arabe sont requis.");
  }
  return {
    ...entry,
    niss,
    readings: {
      literal: {
        en: edit.en.trim(),
        fr: edit.fr.trim(),
        ar: edit.ar.trim(),
      },
    },
  };
}

function customEntry(item) {
  return literalEntry(
    { id: item.id, kind: "phrase", niss: ["x"], aliases: [], readings: {} },
    item,
  );
}

export function applyPatch(patch = emptyPatch()) {
  const source = patch || emptyPatch();
  const book = baseBook();
  const letters = { ...book.letters };
  for (const [letter, emoji] of Object.entries(source.letters || {})) {
    if (!letters[letter]) throw new Error(`Lettre inconnue : ${letter}`);
    const mark = normalize(emoji);
    if (!mark) throw new Error("L'emoji de la lettre est vide.");
    letters[letter] = mark;
  }
  const seen = new Set(Object.values(letters).map((emoji) => normalize(emoji)));
  if (seen.size !== Object.keys(letters).length) {
    throw new Error("Deux lettres ne peuvent pas partager le même emoji.");
  }

  const entries = book.entries.map((entry) => {
    const edit = source.words?.[entry.id];
    return edit ? literalEntry(entry, edit) : entry;
  });
  for (const item of source.custom || []) entries.push(customEntry(item));

  const keys = new Map();
  for (const entry of entries) {
    const key = entry.niss.join(" ");
    if (keys.has(key)) throw new Error("Ce niss existe déjà.");
    keys.set(key, entry.id);
    for (const alias of entry.aliases || []) {
      if (keys.has(alias) && keys.get(alias) !== entry.id) {
        throw new Error("Ce niss existe déjà.");
      }
      keys.set(alias, entry.id);
    }
  }

  return { letters, entries };
}

export function editLetter(patch, letter, emoji) {
  const next = structuredClone(patch);
  next.letters[letter] = emoji;
  applyPatch(next);
  return next;
}

export function editWord(patch, id, fields) {
  const next = structuredClone(patch);
  if (id.startsWith("custom:")) {
    const item = next.custom.find((entry) => entry.id === id);
    if (!item) throw new Error("Mot introuvable.");
    item.niss = fields.niss;
    item.en = fields.en;
    item.fr = fields.fr;
    item.ar = fields.ar;
  } else {
    next.words[id] = {
      niss: fields.niss,
      en: fields.en,
      fr: fields.fr,
      ar: fields.ar,
    };
  }
  applyPatch(next);
  return next;
}

export function addWord(patch, fields) {
  const next = structuredClone(patch);
  const item = {
    id: `custom:${globalThis.crypto?.randomUUID?.() || Date.now()}`,
    niss: fields.niss,
    en: fields.en,
    fr: fields.fr,
    ar: fields.ar,
  };
  next.custom.push(item);
  applyPatch(next);
  return next;
}

export function dictionaryTables(book, target = "en") {
  if (!LOCALES[target]) throw new Error(`Langue inconnue : ${target}`);
  const letters = Object.entries(book.letters)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([letter, emoji]) => ({
      id: `letter:${letter}`,
      kind: "letter",
      letter,
      label: letter,
      niss: normalize(emoji),
    }));

  const numbers = book.entries
    .filter((entry) => entry.kind === "number")
    .sort((a, b) => a.digit.localeCompare(b.digit))
    .map((entry) => row(entry, target));

  const words = book.entries
    .filter((entry) => entry.kind !== "number")
    .map((entry) => row(entry, target))
    .sort((a, b) => a.label.localeCompare(b.label, LOCALES[target], { sensitivity: "base" }));

  return { letters, numbers, words };
}

function row(entry, target) {
  return {
    id: entry.id,
    kind: entry.kind,
    label: entry.readings.literal[target],
    niss: entry.niss.join(" "),
    en: entry.readings.literal.en,
    fr: entry.readings.literal.fr,
    ar: entry.readings.literal.ar,
  };
}

export const LANGUAGE_HEADERS = {
  en: "English",
  fr: "Français",
  ar: "العربية",
};
