import { encodeWord } from "./niss/alphabet.js";
import { applyPatch } from "./niss/book.js";
import { pullPatch } from "./niss/cloud.js";
import { MOODS } from "./niss/lexicon.js";
import { loadPatch, savePatch } from "./niss/persist.js";
import { translate } from "./niss/translate.js";

const firebaseConfig = {
  apiKey: "AIzaSyBDoveGCCd7NgeKued2qI-GR6ykREBhXGY",
  authDomain: "nianguage.firebaseapp.com",
  projectId: "nianguage",
  storageBucket: "nianguage.firebasestorage.app",
  messagingSenderId: "509515513365",
  appId: "1:509515513365:web:9da6ef7d2c807cf772181c",
  measurementId: "G-E86QWSFWPE",
};

async function startAnalytics() {
  try {
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js");
    const { getAnalytics, isSupported } = await import(
      "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js"
    );
    const firebaseApp = initializeApp(firebaseConfig);
    if (await isSupported()) getAnalytics(firebaseApp);
  } catch {
    /* Le traducteur reste utilisable si Analytics ne se charge pas. */
  }
}

startAnalytics();

const niss = document.querySelector("#niss");
const out = document.querySelector("#out");
const unknown = document.querySelector("#unknown");
const target = document.querySelector("#target");
const moods = document.querySelector("#moods");
const hint = document.querySelector("#mood-hint");
const samples = document.querySelector("#samples");
const fiche = document.querySelector("#fiche");
let mood = "literal";
let book = applyPatch(loadPatch(localStorage));

const sampleLines = [
  ["I'm fine", "💯 👍"],
  ["I love you", "😍 🫶"],
  ["Candy", "🍬 🍭"],
  ["Pastry", "🍩 🥐"],
  ["Chocolate", "🍫 🍪"],
  ["Okay", "k"],
];

for (const [label, line] of sampleLines) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.addEventListener("click", () => {
    niss.value = line;
    render();
  });
  samples.append(button);
}

for (const item of MOODS) {
  const button = document.createElement("button");
  button.type = "button";
  button.role = "radio";
  button.dataset.mood = item.id;
  button.textContent = item.label;
  button.setAttribute("aria-checked", item.id === mood ? "true" : "false");
  button.addEventListener("click", () => {
    mood = item.id;
    for (const other of moods.querySelectorAll("button")) {
      other.setAttribute("aria-checked", other === button ? "true" : "false");
    }
    hint.textContent = item.hint;
    render();
  });
  moods.append(button);
}
hint.textContent = MOODS[0].hint;

function render() {
  const result = translate(niss.value, { target: target.value, context: mood, book });
  out.lang = target.value;
  out.textContent = result.text || "…";
  if (result.unknown.length) {
    unknown.hidden = false;
    unknown.textContent = `Inconnu : ${result.unknown.join(" ")}`;
  } else {
    unknown.hidden = true;
  }
}

function paintFiche() {
  const line = "💯 👍";
  fiche.replaceChildren();
  const head = document.createElement("tr");
  for (const label of ["Humeur", "Français", "English", "Arabe"]) {
    const cell = document.createElement("th");
    cell.textContent = label;
    if (label === "Arabe") cell.className = "ar";
    head.append(cell);
  }
  const body = document.createElement("tbody");
  const thead = document.createElement("thead");
  thead.append(head);
  for (const item of MOODS) {
    const row = document.createElement("tr");
    const values = [
      item.label,
      translate(line, { target: "fr", context: item.id, book }).text,
      translate(line, { target: "en", context: item.id, book }).text,
      translate(line, { target: "ar", context: item.id, book }).text,
    ];
    values.forEach((value, index) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      if (index === 3) cell.className = "ar";
      row.append(cell);
    });
    body.append(row);
  }
  fiche.append(thead, body);
  document.querySelector("#hi-spell").textContent = encodeWord("hi", book.letters);
}

niss.addEventListener("input", render);
target.addEventListener("change", render);

document.querySelector("#copy").addEventListener("click", async () => {
  const text = out.textContent;
  if (!text || text === "…") return;
  await navigator.clipboard.writeText(text);
  document.querySelector("#copy").textContent = "Copié";
  setTimeout(() => {
    document.querySelector("#copy").textContent = "Copier";
  }, 1200);
});

paintFiche();
render();

pullPatch().then((remote) => {
  if (!remote) return;
  book = applyPatch(remote);
  savePatch(remote, localStorage);
  paintFiche();
  render();
});
