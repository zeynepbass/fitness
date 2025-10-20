import { View, Text, StyleSheet } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pedometer } from "expo-sensors";
import * as Notifications from "expo-notifications";
import { doc, collection, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";

const getTodayDate = () => new Date().toISOString().split("T")[0];

const saveDailySteps = async (email, steps, calories, distance, date) => {
  try {
    const userDocRef = doc(db, "users", email);
    const dailyStepsDocRef = doc(collection(userDocRef, "dailySteps"), date);
    await setDoc(dailyStepsDocRef, { steps, calories, distance, date });
    console.log(`Günlük adımlar ${date} için Firebase'e kaydedildi.`);
  } catch (error) {
    console.error("Firestore kayıt hatası:", error);
  }
};

export default function StepCounter({ userEmail }) {
  const [steps, setSteps] = useState(0);
  const [calories, setCalories] = useState(0);
  const [distance, setDistance] = useState(0);
  const [today, setToday] = useState(getTodayDate());

  const stepsRef = useRef(0);
  const lastStepTimeRef = useRef(Date.now());
  const hasNotifiedRef = useRef(false);
  const lastPedometerValue = useRef(null); 

  const stepDataKey = `stepData_${userEmail}`;

  useEffect(() => {
    const init = async () => {
      if (!userEmail) return;

      try {
        const storedDataRaw = await AsyncStorage.getItem(stepDataKey);
        const storedData = storedDataRaw ? JSON.parse(storedDataRaw) : null;
        const currentDate = getTodayDate();

        if (storedData && storedData.date === currentDate) {
          setSteps(storedData.steps);
          setCalories(storedData.calories);
          setDistance(storedData.distance);
          stepsRef.current = storedData.steps;
          setToday(currentDate);
        } else if (storedData && storedData.date !== currentDate) {
          await saveDailySteps(userEmail, storedData.steps, storedData.calories, storedData.distance, storedData.date);
          await AsyncStorage.setItem(stepDataKey, JSON.stringify({ steps: 0, calories: 0, distance: 0, date: currentDate }));
          setSteps(0);
          setCalories(0);
          setDistance(0);
          stepsRef.current = 0;
          setToday(currentDate);
        } else {
          await AsyncStorage.setItem(stepDataKey, JSON.stringify({ steps: 0, calories: 0, distance: 0, date: currentDate }));
        }
      } catch (e) {
        console.error("Veri yüklenirken hata:", e);
      }
    };

    init();
  }, [userEmail]);

  useEffect(() => {
    if (!userEmail) return;

    const saveLocalData = async () => {
      try {
        await AsyncStorage.setItem(stepDataKey, JSON.stringify({
          steps,
          calories,
          distance,
          date: today,
        }));
      } catch (e) {
        console.error("Veri kaydedilemedi:", e);
      }
    };

    saveLocalData();
  }, [steps, calories, distance, today, userEmail]);

  useEffect(() => {
    let subscription;

    const startPedometer = async () => {
      const isAvailable = await Pedometer.isAvailableAsync();
      if (!isAvailable) return;

      subscription = Pedometer.watchStepCount((result) => {
        const currentPedometerSteps = result.steps;

        if (lastPedometerValue.current === null) {
          console.log("📥 İlk adım verisi alındı:", currentPedometerSteps);
          lastPedometerValue.current = currentPedometerSteps;
          return;
        }

        const stepDiff = currentPedometerSteps - lastPedometerValue.current;

        if (stepDiff > 0) {
          stepsRef.current += stepDiff;
          const dist = stepsRef.current * 0.0008;
          const cal = Math.round(stepsRef.current * 0.05);

          setSteps(stepsRef.current);
          setDistance(dist);
          setCalories(cal);
        }

        lastPedometerValue.current = currentPedometerSteps;
        lastStepTimeRef.current = Date.now();
        hasNotifiedRef.current = false;
      });
    };

    if (userEmail) startPedometer();

    const now = new Date();
    const midnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0, 0, 0, 0
    );
    const msToMidnight = midnight.getTime() - now.getTime();

    const midnightTimeout = setTimeout(async () => {
      try {
        await saveDailySteps(userEmail, stepsRef.current, calories, distance, today);
      } catch (e) {
        console.error("Gece yarısı Firebase kaydı başarısız:", e);
      }

      setSteps(0);
      setCalories(0);
      setDistance(0);
      stepsRef.current = 0;
      lastPedometerValue.current = null;
      const newDate = getTodayDate();
      setToday(newDate);

      await AsyncStorage.setItem(stepDataKey, JSON.stringify({
        steps: 0, calories: 0, distance: 0, date: newDate
      }));
    }, msToMidnight);

    const inactivityInterval = setInterval(async () => {
      const now = Date.now();
      const timeSinceLastStep = now - lastStepTimeRef.current;

      if (timeSinceLastStep >= 3600000 && !hasNotifiedRef.current) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Hareketsiz kaldın!",
            body: `Son adım sayın: ${stepsRef.current} 🚶‍♂️`,
          },
          trigger: null,
        });
        hasNotifiedRef.current = true;
      }
    }, 60000);

    return () => {
      subscription?.remove();
      clearTimeout(midnightTimeout);
      clearInterval(inactivityInterval);
    };
  }, [today, userEmail, calories, distance]);

  const stats = [
    { label: "Adım", value: steps, unit: "adım" },
    { label: "Kalori", value: calories, unit: "kcal" },
    { label: "Mesafe", value: distance.toFixed(2), unit: "km" },
  ];

  return (
    <View style={styles.container}>
      {stats.map((item, i) => (
        <View key={i} style={styles.card}>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.value}>
            {item.value} {item.unit}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", marginVertical: 20 },
  card: {
    width: 150,
    backgroundColor: "rgb(49,49,49)",
    borderRadius: 15,
    padding: 15,
    marginRight: 10,
    elevation: 3,
    alignItems: "flex-start",
  },
  label: { color: "white" },
  value: { fontSize: 22, fontWeight: "bold", color: "white" },
});
