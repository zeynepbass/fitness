import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";

import { db } from "../../firebase"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

export const addStepAndCalorie = async (email, steps, calories) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("Kullanıcı bulunamadı!");
      return;
    }

    querySnapshot.forEach(async (docSnap) => {
      const userDocRef = doc(db, "users", docSnap.id);
      await updateDoc(userDocRef, {
        steps: steps,
        calories:calories,
      });
    });

    console.log("Adım ve kalori güncellendi!");
  } catch (err) {
    console.error("Firestore Hatası:", err);
  }
};

export const getUserByEmail = async () => {
  try {

    const stored = await AsyncStorage.getItem("userToken");
    if (!stored) return null;
    const localUser = JSON.parse(stored);
    const email = localUser.email || localUser.user?.email;
    if (!email) return null;


    const usersCol = collection(db, "users");
    const q = query(usersCol, where("email", "==", email));
    const usersSnapshot = await getDocs(q);

    if (usersSnapshot.empty) {
      console.log("Kullanıcı bulunamadı");
      return null;
    }

    const userData = usersSnapshot.docs[0].data();
    console.log("User Detay:", userData);
    return { id: usersSnapshot.docs[0].id, ...userData };
  } catch (error) {
    console.log("Firestore User GET Hatası:", error);
    return null;
  }
};

export const getStepsAndCalories = async () => {
  try {
    const stored = await AsyncStorage.getItem("userToken");
    if (!stored) throw new Error("Kullanıcı bulunamadı");

    const user = JSON.parse(stored);
    const email = user.email || user.user?.email;
    if (!email) throw new Error("Email bulunamadı");


    const dailyStepsCol = collection(db, "users", email, "dailySteps");
    const snapshot = await getDocs(dailyStepsCol);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("📊 Firestore'dan gelen günlük adım verileri:", data);

    return data;
  } catch (error) {
    console.log("🔥 getStepsAndCalories Hatası:", error);
    return null;
  }
};

export const addStepAndCalories = async (steps, calories, distance) => {
  try {
    const stored = await AsyncStorage.getItem("userToken");
    if (!stored) throw new Error("Kullanıcı bulunamadı");

    const user = JSON.parse(stored);
    const email = user.email || user.user?.email;
    if (!email) throw new Error("Email bulunamadı");

    const usersCol = collection(db, "users");
    const usersSnapshot = await getDocs(usersCol);

    let userDocId = null;
    let userData = null;

    usersSnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      if (data.email === email) {
        userDocId = docSnap.id;
        userData = data;
      }
    });

    if (!userDocId) {
      userDocId = email; 
      userData = { email, stepsHistory: [] };
    }

    const today = new Date().toISOString().split("T")[0];

    const updatedStepsHistory = userData.stepsHistory || [];
    updatedStepsHistory.push({ date: today, steps, calories, distance });

    const userRef = doc(db, "users", userDocId);
    await setDoc(userRef, { ...userData, stepsHistory: updatedStepsHistory }, { merge: true });

    console.log("Adım, kalori ve mesafe başarıyla eklendi!");
  } catch (error) {
    console.log("addStepAndCalories Hatası:", error);
  }
};
export const addDailyNotification = async (email, notification) => {
  try {
    const usersCol = collection(db, "users");
    const usersSnapshot = await getDocs(usersCol);

    let userDocId = null;

    usersSnapshot.forEach(docSnap => {
      if (docSnap.data().email === email) {
        userDocId = docSnap.id;
      }
    });

    if (!userDocId) {

      userDocId = email;
      await setDoc(doc(db, "users", userDocId), { email, notifications: [] });
    }

    const userRef = doc(db, "users", userDocId);

    await setDoc(
      userRef,
      {
        notifications: [...(usersSnapshot.data()?.notifications || []), notification],
      },
      { merge: true }
    );

    console.log("Firebase'e günlük motivasyon bildirimi kaydedildi!");
  } catch (error) {
    console.log("Firebase notification hatası:", error);
  }
};
