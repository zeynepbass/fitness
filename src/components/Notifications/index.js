import { View, Text, Dimensions } from 'react-native';


import { View, Text, SafeAreaView, Dimensions } from "react-native";

import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
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


  const scheduleNotificationOnce = async () => {
    const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
    const message = motivationalMessages[randomIndex];

    const notif = {
      title: "Motivasyon Zamanı!",
      body: message,
      time: new Date().toISOString(),
    };

    await Notifications.scheduleNotificationAsync({
      content: { title: notif.title, body: notif.body },
      trigger: {
        hour: 9,
        minute: 0,
        repeats: false
      }
    });


    await AsyncStorage.setItem("latestNotification", JSON.stringify(notif));
    setTodayNotification(notif);
    console.log("✅ Bildirim planlandı ve kaydedildi.");
  };

  useEffect(() => {

    const init = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Bildirim izni gerekli!");
        return;
      }


      const storedNotif = await AsyncStorage.getItem("latestNotification");
      if (storedNotif) {
        setTodayNotification(JSON.parse(storedNotif));
      }


      const receivedSubscription = Notifications.addNotificationReceivedListener(notification => {
        const { title, body } = notification.request.content;
        const newNotif = {
          title,
          body,
          time: new Date().toISOString(),
        };
        setTodayNotification(newNotif);
        AsyncStorage.setItem("latestNotification", JSON.stringify(newNotif));
        console.log("📩 Bildirim geldi ve kaydedildi:", newNotif);
      });


      await scheduleNotificationOnce();


      return () => {
        receivedSubscription.remove();
      };
    };

    init();
  }, []);

  return (
    <LinearGradient colors={["rgb(41,47,25)", "black"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: screen.width,
          }}
        >
          <Text style={{ color: "white", fontSize: 24, marginBottom: 20 }}>Bugünün Sözü</Text>

          {todayNotification ? (
            <View
              style={{
                backgroundColor: "rgb(49,49,49)",
                padding: 15,
                borderRadius: 10,
                marginBottom: 10,
                elevation: 2,
                width: "90%",
              }}
            >
              <Text style={{ fontWeight: "bold", color: "white", marginBottom: 5 }}>
                {todayNotification.title}
              </Text>
              <Text style={{ color: "white", marginBottom: 5 }}>{todayNotification.body}</Text>
              <Text style={{ fontSize: 12, color: "gray" }}>
                {new Date(todayNotification.time).toLocaleString()}
              </Text>
            </View>
          ) : (
            <Text style={{ color: "gray" }}>Henüz bir bildirim alınmadı.</Text>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
