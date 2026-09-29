import assert from "node:assert/strict";
import test from "node:test";
import { letterIndex, spell } from "../niss/alphabet.js";
import {
  addWord,
  applyPatch,
  checkPassword,
  dictionaryTables,
  editLetter,
  editWord,
  emptyPatch,
} from "../niss/book.js";
import { loadPatch, savePatch } from "../niss/persist.js";
import { translate } from "../niss/translate.js";

const arabic = /[\u0600-\u06FF]/;

function memory() {
  const data = new Map();
  return {
    getItem: (key) => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => data.set(key, String(value)),
  };
}

test("the password opens editing and nothing else does", () => {
  assert.equal(checkPassword("10092025"), true);
  assert.equal(checkPassword(" 10092025 "), true);
  assert.equal(checkPassword("1009"), false);
});

test("the dictionary table defaults to English beside Niss", () => {
  const tables = dictionaryTables(applyPatch(emptyPatch()));
  assert.equal(tables.letters[0].label, "a");
  assert.equal(tables.letters[0].niss, "🍓");
  assert.equal(tables.letters.at(-1).label, "z");
  assert.deepEqual(
    tables.numbers.map((row) => row.niss),
    ["🫧0", "1ce", "2tu", "3lle", "4ev", "5ly", "6xy", "7vn", "8te", "9ne"],
  );
  const labels = tables.words.map((row) => row.label);
  const sorted = [...labels].sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }));
  assert.deepEqual(labels, sorted);
  assert.equal(tables.words.find((row) => row.niss === "🍬 🍭").label, "candy");
  const french = dictionaryTables(applyPatch(emptyPatch()), "fr");
  assert.equal(french.words.find((row) => row.niss === "🍬 🍭").label, "un bonbon");
});

test("candy keeps language and mood context", () => {
  const line = "🍬 🍭";
  assert.equal(translate(line, { target: "en" }).text, "candy");
  assert.equal(translate(line, { target: "fr" }).text, "un bonbon");
  assert.equal(translate(line, { target: "ar" }).text, "حلوى");
  const hangry = translate(line, { target: "ar", context: "hangry" }).text;
  const angry = translate(line, { target: "fr", context: "angry" }).text;
  const contraire = translate(line, { target: "en", context: "contraire" }).text;
  assert.match(hangry, arabic);
  assert.match(hangry, /جائعة/);
  assert.match(angry, /N'insiste pas/);
  assert.equal(contraire, "Not: candy");
  assert.notEqual(translate(line, { target: "en", context: "literal" }).text, contraire);
});

test("a custom word translates in three languages and every mood", () => {
  const patch = addWord(emptyPatch(), {
    niss: "🍫 🍩",
    en: "a chocolate doughnut",
    fr: "un beignet au chocolat",
    ar: "دونات بالشوكولاتة",
  });
  const book = applyPatch(patch);
  assert.equal(translate("🍫 🍩", { target: "en", book }).text, "a chocolate doughnut");
  assert.equal(translate("🍫 🍩", { target: "fr", context: "gf", book }).text, "un beignet au chocolat Mon cœur.");
  const ar = translate("🍫 🍩", { target: "ar", context: "hormones", book }).text;
  assert.match(ar, /دونات بالشوكولاتة/);
  assert.match(ar, arabic);
  assert.notEqual(
    translate("🍫 🍩", { target: "en", context: "hangry", book }).text,
    translate("🍫 🍩", { target: "en", context: "contraire", book }).text,
  );
});

test("editing a word, a letter, or a number changes the translation", () => {
  const base = applyPatch(emptyPatch());
  const fine = base.entries.find((entry) => entry.niss.join(" ") === "💯 👍");
  const four = base.entries.find((entry) => entry.niss[0] === "4ev");
  let patch = editWord(emptyPatch(), fine.id, {
    niss: "💯 👍",
    en: "I am okay.",
    fr: "Je vais bien.",
    ar: "أنا تمام.",
  });
  patch = editWord(patch, four.id, {
    niss: "4ev",
    en: "four, always",
    fr: "quatre, toujours",
    ar: "أربعة، دائمًا",
  });
  patch = editLetter(patch, "a", "🍬");
  const book = applyPatch(patch);

  assert.equal(translate("💯 👍", { target: "fr", book }).text, "Je vais bien.");
  assert.equal(translate("💯 👍", { target: "en", context: "contraire", book }).text, "Not: I am okay.");
  assert.match(translate("💯 👍", { target: "ar", context: "hangry", book }).text, /جائعة/);
  assert.equal(translate("4ev", { target: "en", book }).text, "four, always");
  assert.equal(spell("🍬", letterIndex(book.letters)), "a");
  assert.throws(() => editLetter(patch, "b", "🍬"), /même emoji/);
});

test("the saved dictionary comes back from storage", () => {
  const store = memory();
  const patch = addWord(emptyPatch(), {
    niss: "🥧",
    en: "Sunday pie",
    fr: "la tarte du dimanche",
    ar: "فطيرة الأحد",
  });
  savePatch(patch, store);
  const book = applyPatch(loadPatch(store));
  assert.equal(translate("🥧", { target: "fr", book }).text, "la tarte du dimanche");
});
