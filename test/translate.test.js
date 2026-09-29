import assert from "node:assert/strict";
import test from "node:test";
import { LETTERS, encodeWord, spell } from "../niss/alphabet.js";
import { lexicon } from "../niss/lexicon.js";
import { translate, translateText } from "../niss/translate.js";

const arabic = /[\u0600-\u06FF]/;

test("every letter round-trips and stays unique", () => {
  const seen = new Set();
  for (const letter of Object.keys(LETTERS)) {
    const emoji = encodeWord(letter);
    assert.equal(spell(emoji), letter);
    assert.equal(seen.has(emoji), false);
    seen.add(emoji);
  }
  assert.equal(encodeWord("honey"), spell(encodeWord("honey")) && encodeWord("honey"));
  assert.equal(spell(encodeWord("honey")), "honey");
  assert.equal(spell(encodeWord("niss")), "niss");
});

test("I'm fine translates into French, English, and Arabic", () => {
  assert.equal(translate("💯 👍", { target: "en" }).text, "I'm fine.");
  assert.equal(translate("💯 👍", { target: "fr" }).text, "Ça va.");
  const ar = translate("💯 👍", { target: "ar" }).text;
  assert.equal(ar, "أنا بخير.");
  assert.match(ar, arabic);
});

test("moods change the same Niss sentence", () => {
  const line = "💯 👍";
  const literal = translate(line, { target: "fr", context: "literal" }).text;
  const cute = translate(line, { target: "fr", context: "cute" }).text;
  const gf = translate(line, { target: "fr", context: "gf" }).text;
  const hangry = translate(line, { target: "fr", context: "hangry" }).text;
  const hormones = translate(line, { target: "fr", context: "hormones" }).text;
  const angry = translate(line, { target: "fr", context: "angry" }).text;
  const contraire = translate(line, { target: "fr", context: "contraire" }).text;

  assert.equal(literal, "Ça va.");
  assert.equal(cute, "Ça va, tout doux.");
  assert.equal(gf, "Ça va, mon cœur.");
  assert.equal(hangry, "Ça va, mais j'ai faim.");
  assert.equal(hormones, "Ça va, et je ressens tout.");
  assert.equal(angry, "Ça va. N'insiste pas.");
  assert.equal(contraire, "Ça ne va pas.");
  assert.equal(translate(line, { target: "en", context: "contraire" }).text, "I'm not fine.");
  assert.equal(translate(line, { target: "ar", context: "hangry" }).text, "أنا بخير، لكنني جائعة.");
});

test("the longest phrase wins over its pieces", () => {
  assert.equal(translate("💯", { target: "en" }).text, "Truly.");
  assert.equal(translate("👍", { target: "en" }).text, "Yes.");
  assert.equal(translate("💯 👍", { target: "en" }).text, "I'm fine.");
  assert.notEqual(translate("💯 👍", { target: "en" }).text, "Truly. Yes.");
});

test("glued letters that spell a known alias use that word", () => {
  const hi = encodeWord("hi");
  assert.equal(translate(hi, { target: "fr" }).text, "Salut.");
  assert.equal(translate(hi, { target: "en", context: "contraire" }).text, "I don't want to talk.");
});

test("an unknown spelled name stays a name in every mood", () => {
  const honey = encodeWord("honey");
  for (const context of ["literal", "hangry", "contraire", "angry"]) {
    assert.equal(translate(honey, { target: "fr", context }).text, "honey");
  }
});

test("nicknames, codes, and a mixed line", () => {
  assert.equal(translate("bby", { target: "ar", context: "gf" }).text, "يا عمري");
  assert.equal(translate("ily", { target: "fr" }).text, "Je t'aime.");
  assert.equal(translate("k", { target: "en", context: "angry" }).text, "Okay. Stop writing.");
  assert.equal(translate("kk", { target: "fr", context: "contraire" }).text, "Ce n'est pas d'accord du tout.");
  assert.equal(translate("4ev", { target: "en", context: "contraire" }).text, "not forever");
  assert.equal(
    translate("pookie 💯 👍", { target: "fr", context: "gf" }).text,
    "mon trésor Ça va, mon cœur.",
  );
});

test("unknown tokens are kept and reported", () => {
  const result = translate("💯 👍 xyz", { target: "en" });
  assert.equal(result.text, "I'm fine. xyz");
  assert.deepEqual(result.unknown, ["xyz"]);
});

test("empty input and rejected options", () => {
  assert.equal(translate("   ").text, "");
  assert.throws(() => translate("k", { target: "de" }), /Langue inconnue/);
  assert.throws(() => translate("k", { context: "sleepy" }), /Humeur inconnue/);
  assert.throws(() => translateText({ text: "k", source: "en" }), /depuis le niss/);
});

test("a fallback mood still answers in the chosen language", () => {
  const hangry = translate("plz", { target: "ar", context: "hangry" }).text;
  assert.match(hangry, arabic);
  assert.match(hangry, /جائعة/);
  assert.equal(translate("plz", { target: "fr", context: "cute" }).text, "s'il te plaît");
});

test("the phrasebook covers every mood for the showcase lines", () => {
  const showcase = ["💯 👍", "😍 🫶", "k", "🤤 🍔"];
  for (const line of showcase) {
    for (const context of ["literal", "cute", "gf", "hangry", "hormones", "angry", "contraire"]) {
      for (const target of ["en", "fr", "ar"]) {
        const text = translate(line, { target, context }).text;
        assert.equal(text.length > 0, true);
        if (target === "ar") assert.match(text, arabic);
        if (target === "fr") assert.doesNotMatch(text, arabic);
      }
    }
  }
  assert.equal(lexicon.length > 40, true);
});
