import { normalizePatch } from "./persist.js";

const firebaseConfig = {
  apiKey: "AIzaSyBDoveGCCd7NgeKued2qI-GR6ykREBhXGY",
  authDomain: "nianguage.firebaseapp.com",
  projectId: "nianguage",
  storageBucket: "nianguage.firebasestorage.app",
  messagingSenderId: "509515513365",
  appId: "1:509515513365:web:9da6ef7d2c807cf772181c",
  measurementId: "G-E86QWSFWPE",
};

let dbPromise;

async function database() {
  if (!dbPromise) {
    dbPromise = (async () => {
      const { initializeApp } = await import("https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js");
      const { getFirestore } = await import("https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js");
      return getFirestore(initializeApp(firebaseConfig, "nissou"));
    })();
  }
  return dbPromise;
}

export async function pullPatch() {
  try {
    const { doc, getDoc } = await import("https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js");
    const snap = await getDoc(doc(await database(), "nissou", "dictionary"));
    if (!snap.exists()) return null;
    return normalizePatch(snap.data());
  } catch {
    return null;
  }
}

export async function pushPatch(patch) {
  const { doc, setDoc } = await import("https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js");
  await setDoc(doc(await database(), "nissou", "dictionary"), normalizePatch(patch));
}
