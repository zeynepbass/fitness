import { View, Text, StyleSheet } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Pedometer } from "expo-sensors";
import * as Notifications from 'expo-notifications';

export default function StepCounter() {
  const [steps, setSteps] = useState(0);
  const [calories, setCalories] = useState(0);
  const [distance, setDistance] = useState(0);

  const stepsRef = useRef(0);
  const caloriesRef = useRef(0);
  const distanceRef = useRef(0);

  useEffect(() => {
    const askNotificationPermission = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        await Notifications.requestPermissionsAsync();
      }
    };
    askNotificationPermission();
  }, []);

  useEffect(() => {
    let subscription;
    let lastStepCount = 0;
    let inactivityTimeMs = 0;
    const checkInterval = 5000;

    const startPedometer = async () => {
      const isAvailable = await Pedometer.isAvailableAsync();
      if (!isAvailable) return;

      subscription = Pedometer.watchStepCount((result) => {
        const stepCount = result.steps;
        const dist = stepCount * 0.0008;
        const cal = Math.round(stepCount * 0.05);

        setSteps(stepCount);
        setDistance(dist);
        setCalories(cal);

        stepsRef.current = stepCount;
        distanceRef.current = dist;
        caloriesRef.current = cal;
      });
    };

    startPedometer();

    const interval = setInterval(async () => {
      const currentSteps = stepsRef.current;

      if (currentSteps === lastStepCount) {
        inactivityTimeMs += checkInterval;
        if (inactivityTimeMs >= 3600000) { 
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "Haydi Hareket Zamanı!",
              body: "1 saattir hareketsizsin. Biraz yürü! 💪",
            },
            trigger: null, 
          });
          inactivityTimeMs = 0;
          console.log("🚨 1 saatlik hareketsizlik bildirimi gönderildi");
        }
      } else {
        inactivityTimeMs = 0;
      }

      lastStepCount = currentSteps;
    }, checkInterval);

    return () => {
      subscription && subscription.remove();
      clearInterval(interval);
    };
  }, []);

  const stats = [
    { label: "Adım", value: steps, unit: "adım" },
    { label: "Kalori", value: calories, unit: "kcal" },
    { label: "Mesafe", value: distance.toFixed(2), unit: "km" },
  ];

  return (
    <View style={styles.container}>
      {stats.map((item, index) => (
        <View key={index} style={styles.card}>
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
