

import { View, Text, SafeAreaView, Dimensions } from "react-native";

import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveNotification } from "./notificationStorage";
import { LinearGradient } from "expo-linear-gradient";

const motivationalMessages = [
  "Bugün harika bir gün olacak!",
  "Küçük adımlar büyük fark yaratır!",
  "Haydi kalk, hareket et ve enerji kazan!",
  "Başarı seninle, devam et!",
  "Her adım seni hedeflerine yaklaştırıyor!"
];

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function NotificationsScreen() {
  const [todayNotification, setTodayNotification] = useState(null);
  const [screen, setScreen] = useState(Dimensions.get("window"));

  useEffect(() => {
    const scheduleDailyNotification = async () => {
      const todayNotifFlag = await AsyncStorage.getItem("todayNotification");
      if (todayNotifFlag) return;
  
      const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
      const message = motivationalMessages[randomIndex];
  
      const notif = { title: "Motivasyon Zamanı!", body: message, time: new Date().toISOString() };
  
      await Notifications.scheduleNotificationAsync({
        content: { title: "Motivasyon Zamanı!", body: message },
        trigger: { hour: 17, minute: 37, repeats: false }, 
      });
      
  
      await saveNotification(notif);
      await AsyncStorage.setItem("todayNotification", JSON.stringify(notif));
      setTodayNotification(notif);
      console.log("✅ Bugünkü bildirim planlandı.");
    };
  
    const register = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === "granted") {
        scheduleDailyNotification();
      } else {
        alert("Bildirim izni gerekli!");
      }
    };
  
    register();
  }, []);
  




  return (
    <LinearGradient colors={["rgb(41,47,25)", "black"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: screen.width }}>
          <Text style={{ color: "white", fontSize: 24, marginBottom: 20 }}>Bugünün Bildirimi</Text>

          {todayNotification && (
            <View
              style={{
                backgroundColor: "rgb(49,49,49)",
                padding: 15,
                borderRadius: 10,
                marginBottom: 10,
                elevation: 2,
                width: "90%"
              }}
            >
              <Text style={{ fontWeight: "bold", color: "white", marginBottom: 5 }}>
                {todayNotification.title}
              </Text>
              <Text style={{ color: "white", marginBottom: 5 }}>
                {todayNotification.body}
              </Text>
              <Text style={{ fontSize: 12, color: "gray" }}>
                {new Date(todayNotification.time).toLocaleString()}
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
