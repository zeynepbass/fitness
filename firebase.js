import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // 🔹 Firestore import

const firebaseConfig = {
  apiKey: "AIzaSyC-dEkUrq58ore9n8Ns2FoEi_2DVbC1_D8",
  authDomain: "fitness-9b123.firebaseapp.com",
  projectId: "fitness-9b123",
  storageBucket: "fitness-9b123.appspot.com",
  messagingSenderId: "70388884607",
  appId: "1:70388884607:web:206574c1444233e7350b4a",
  measurementId: "G-GB5L888ZMX",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app); // 🔹 Firestore db export
export default app;
