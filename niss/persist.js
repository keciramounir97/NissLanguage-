import { emptyPatch } from "./book.js";

export const PATCH_KEY = "nissou-dictionary";
export const EDITOR_KEY = "nissou-editor";

export function normalizePatch(value) {
  const source = value && typeof value === "object" ? value : {};
  return {
    letters: { ...(source.letters || {}) },
    words: { ...(source.words || {}) },
    custom: Array.isArray(source.custom) ? source.custom.map((item) => ({ ...item })) : [],
  };
}

export function loadPatch(storage) {
  try {
    const raw = storage?.getItem(PATCH_KEY);
    if (!raw) return emptyPatch();
    return normalizePatch(JSON.parse(raw));
  } catch {
    return emptyPatch();
  }
}

export function savePatch(patch, storage) {
  storage.setItem(PATCH_KEY, JSON.stringify(normalizePatch(patch)));
}

export function isEditor(storage) {
  return storage?.getItem(EDITOR_KEY) === "1";
}

export function grantEditor(storage) {
  storage.setItem(EDITOR_KEY, "1");
}
