import { View, Text, StyleSheet } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Pedometer } from "expo-sensors";
import { addStepAndCalories } from "../../helper/http";

export default function StepCounter() {
  const [steps, setSteps] = useState(0);
  const [calories, setCalories] = useState(0);
  const [distance, setDistance] = useState(0);

  const stepsRef = useRef(0);
  const caloriesRef = useRef(0);
  const distanceRef = useRef(0);

  useEffect(() => {
    let subscription;

    const startPedometer = async () => {
      const isAvailable = await Pedometer.isAvailableAsync();
      if (!isAvailable) return;

      subscription = Pedometer.watchStepCount(result => {
        const stepCount = result.steps;
        const dist = stepCount * 0.0008; // ortalama adım uzunluğu ~0.8 m
        const cal = Math.round(stepCount * 0.05); // basit kalori hesabı

        setSteps(stepCount);
        setDistance(dist);
        setCalories(cal);

        stepsRef.current = stepCount;
        distanceRef.current = dist;
        caloriesRef.current = cal;
      });
    };

    startPedometer();

    // Gün sonunda Firebase kaydı için timer
    const now = new Date();
    const millisTillEndOfDay =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0) - now;

    const endOfDayTimer = setTimeout(() => {
      addStepAndCalories(
        stepsRef.current,
        caloriesRef.current,
        distanceRef.current
      );
      console.log("Gün sonu verisi Firebase'e kaydedildi!");
    }, millisTillEndOfDay);

    return () => {
      subscription && subscription.remove();
      clearTimeout(endOfDayTimer);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Adım Sayısı: {steps}</Text>
      <Text style={styles.text}>Kalori: {calories} kcal</Text>
      <Text style={styles.text}>Mesafe: {distance.toFixed(2)} km</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", marginVertical: 20 },
  text: { fontSize: 20, fontWeight: "bold", color: "white", margin: 5 },
});
