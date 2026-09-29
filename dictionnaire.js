import {
  addWord,
  applyPatch,
  checkPassword,
  dictionaryTables,
  editLetter,
  editWord,
  LANGUAGE_HEADERS,
} from "./niss/book.js";
import { pullPatch, pushPatch } from "./niss/cloud.js";
import { grantEditor, isEditor, loadPatch, savePatch } from "./niss/persist.js";

const lang = document.querySelector("#lang");
const query = document.querySelector("#q");
const gate = document.querySelector("#gate");
const gateNote = document.querySelector("#gate-note");
const addPanel = document.querySelector("#add-panel");
const saveNote = document.querySelector("#save-note");
const dialog = document.querySelector("#edit");
const editForm = document.querySelector("#edit-form");
const editError = document.querySelector("#edit-error");

let patch = loadPatch(localStorage);
let editor = isEditor(sessionStorage);
let editing = null;

function book() {
  return applyPatch(patch);
}

function paint() {
  const tables = dictionaryTables(book(), lang.value);
  const q = query.value.trim().toLowerCase();
  const header = LANGUAGE_HEADERS[lang.value];
  paintTable(document.querySelector("#letters"), header, filter(tables.letters, q), lang.value);
  paintTable(document.querySelector("#numbers"), header, filter(tables.numbers, q), lang.value);
  paintTable(document.querySelector("#words"), header, filter(tables.words, q), lang.value);
  addPanel.hidden = !editor;
  gate.hidden = editor;
  gateNote.textContent = editor
    ? "Tu peux modifier les équivalents et ajouter un mot."
    : "Lecture seule. Le mot de passe ouvre les modifications.";
}

function filter(rows, q) {
  if (!q) return rows;
  return rows.filter((row) => `${row.label} ${row.niss} ${row.en || ""} ${row.fr || ""} ${row.ar || ""}`.toLowerCase().includes(q));
}

function paintTable(table, header, rows, target) {
  table.replaceChildren();
  const thead = document.createElement("thead");
  const head = document.createElement("tr");
  const titles = editor ? [header, "NissLanguage", ""] : [header, "NissLanguage"];
  for (const label of titles) {
    const cell = document.createElement("th");
    cell.textContent = label;
    if (target === "ar" && label === header) cell.className = "ar";
    head.append(cell);
  }
  thead.append(head);
  const body = document.createElement("tbody");
  for (const row of rows) {
    const tr = document.createElement("tr");
    const mean = document.createElement("td");
    mean.textContent = row.label;
    mean.className = target === "ar" ? "mean ar" : "mean";
    const niss = document.createElement("td");
    niss.textContent = row.niss;
    niss.className = "niss";
    tr.append(mean, niss);
    if (editor) {
      const action = document.createElement("td");
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = "Modifier";
      button.addEventListener("click", () => openEdit(row));
      action.append(button);
      tr.append(action);
    }
    body.append(tr);
  }
  if (rows.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = editor ? 3 : 2;
    td.textContent = "Aucun mot.";
    tr.append(td);
    body.append(tr);
  }
  table.append(thead, body);
}

function openEdit(row) {
  editing = row;
  editError.textContent = "";
  editForm.niss.value = row.niss;
  const letter = row.kind === "letter";
  for (const field of editForm.querySelectorAll(".lang-field")) field.hidden = letter;
  editForm.en.required = !letter;
  editForm.fr.required = !letter;
  editForm.ar.required = !letter;
  editForm.en.value = row.en || "";
  editForm.fr.value = row.fr || "";
  editForm.ar.value = row.ar || "";
  document.querySelector("#edit-title").textContent = letter ? `Lettre ${row.letter}` : "Modifier";
  dialog.showModal();
}

async function commit(next, message) {
  applyPatch(next);
  patch = next;
  savePatch(patch, localStorage);
  paint();
  saveNote.textContent = message;
  try {
    await pushPatch(patch);
    saveNote.textContent = "Enregistré pour tout le monde.";
  } catch {
    saveNote.textContent = "Enregistré sur cet appareil.";
  }
}

gate.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!checkPassword(document.querySelector("#password").value)) {
    gateNote.textContent = "Mot de passe refusé.";
    return;
  }
  grantEditor(sessionStorage);
  editor = true;
  document.querySelector("#password").value = "";
  paint();
});

document.querySelector("#add").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  try {
    const next = addWord(patch, {
      niss: form.niss.value,
      en: form.en.value,
      fr: form.fr.value,
      ar: form.ar.value,
    });
    form.reset();
    await commit(next, "Mot ajouté.");
  } catch (error) {
    saveNote.textContent = error.message;
  }
});

editForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  editError.textContent = "";
  try {
    const next =
      editing.kind === "letter"
        ? editLetter(patch, editing.letter, editForm.niss.value)
        : editWord(patch, editing.id, {
            niss: editForm.niss.value,
            en: editForm.en.value,
            fr: editForm.fr.value,
            ar: editForm.ar.value,
          });
    dialog.close();
    await commit(next, "Équivalent modifié.");
  } catch (error) {
    editError.textContent = error.message;
  }
});

document.querySelector("#edit-cancel").addEventListener("click", () => dialog.close());
lang.addEventListener("change", paint);
query.addEventListener("input", paint);
paint();

pullPatch().then((remote) => {
  if (!remote) return;
  patch = remote;
  try {
    applyPatch(patch);
  } catch {
    return;
  }
  savePatch(patch, localStorage);
  paint();
});
