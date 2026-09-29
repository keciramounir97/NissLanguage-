import { LETTERS, encodeWord } from "./niss/alphabet.js";
import { MOODS, entries, names, numbers, particles } from "./niss/lexicon.js";
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
let mood = "literal";

const sampleLines = [
  ["Ça va", "💯 👍"],
  ["Je t'aime", "😍 🫶"],
  ["Hangry", "🤤 🍔"],
  ["D'accord", "k"],
  ["Copine", "bby 😍 🫶"],
  ["Salut épelé", encodeWord("hi")],
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
  const result = translate(niss.value, { target: target.value, context: mood });
  out.lang = target.value;
  out.textContent = result.text || "…";
  if (result.unknown.length) {
    unknown.hidden = false;
    unknown.textContent = `Inconnu : ${result.unknown.join(" ")}`;
  } else {
    unknown.hidden = true;
  }
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

document.querySelector("#hi-spell").textContent = encodeWord("hi");
document.querySelector("#honey-spell").textContent = `honey s'écrit ${encodeWord("honey")}.`;

const letters = document.querySelector("#letters");
for (const [letter, emoji] of Object.entries(LETTERS)) {
  const cell = document.createElement("div");
  const mark = document.createElement("b");
  mark.textContent = emoji;
  const name = document.createElement("span");
  name.textContent = letter;
  cell.append(mark, name);
  letters.append(cell);
}

function table(head, rows) {
  const html = [`<thead><tr>${head.map((cell) => `<th${cell === "Arabe" ? ' class="ar"' : ""}>${cell}</th>`).join("")}</tr></thead><tbody>`];
  for (const row of rows) {
    html.push("<tr>");
    row.forEach((cell, index) => {
      const arabic = head[index] === "Arabe";
      html.push(`<td${arabic ? ' class="ar"' : ""}>${escapeHtml(cell)}</td>`);
    });
    html.push("</tr>");
  }
  html.push("</tbody>");
  return html.join("");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function literalRow(entry) {
  const lit = entry.readings.literal;
  return [entry.niss.join(" "), lit.en, lit.fr, lit.ar];
}

const fiche = document.querySelector("#fiche");
fiche.innerHTML = table(
  ["Humeur", "Français", "English", "Arabe"],
  MOODS.map((item) => {
    const line = "💯 👍";
    return [
      item.label,
      translate(line, { target: "fr", context: item.id }).text,
      translate(line, { target: "en", context: item.id }).text,
      translate(line, { target: "ar", context: item.id }).text,
    ];
  }),
);
fiche.querySelectorAll("tr").forEach((row) => {
  const last = row.lastElementChild;
  if (last && last.cellIndex === 3) last.classList.add("ar");
});

document.querySelector("#numbers").innerHTML = table(
  ["Code", "Chiffre", "Français", "English", "Arabe"],
  numbers.map((entry) => [
    entry.niss[0],
    entry.digit,
    entry.readings.literal.fr,
    entry.readings.literal.en,
    entry.readings.literal.ar,
  ]),
);

document.querySelector("#names").innerHTML = table(
  ["Niss", "Français", "English", "Arabe"],
  names.map(literalRow),
);

document.querySelector("#particles").innerHTML = table(
  ["Niss", "Français", "English", "Arabe"],
  particles.map(literalRow),
);

const phraseRows = entries.map((entry) => ({
  entry,
  cells: literalRow(entry),
}));

function paintPhrases(query) {
  const q = query.trim().toLowerCase();
  const rows = phraseRows
    .filter(({ cells }) => !q || cells.some((cell) => cell.toLowerCase().includes(q)))
    .map(({ cells }) => cells);
  document.querySelector("#phrases").innerHTML = table(
    ["Niss", "English", "Français", "Arabe"],
    rows,
  );
}

document.querySelector("#filter").addEventListener("input", (event) => {
  paintPhrases(event.target.value);
});
paintPhrases("");
render();
