
import { View, Text, FlatList, SafeAreaView, Dimensions } from "react-native";

import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import { saveNotification, getNotifications } from "../../components/Notifications/notificationStorage";
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
  const [notifications, setNotifications] = useState([]);
  const [screen, setScreen] = useState(Dimensions.get("window"));


  useEffect(() => {
    const scheduleNotification = async () => {
      const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
      const message = motivationalMessages[randomIndex];

      const notif = {
        title: "Motivasyon Zamanı!",
        body: message,
        time: new Date().toISOString(),
      };


      await Notifications.scheduleNotificationAsync({
        content: {
          title: notif.title,
          body: notif.body,
        },
        trigger: {  hour: 9,
          minute: 0,
          repeats: true },
      });


      await saveNotification(notif);
      console.log("✅ Bildirim planlandı ve kaydedildi.");
    };

    scheduleNotification();
  }, []);


  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await getNotifications();
      setNotifications(data.reverse());
    };

    fetchNotifications();

    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setScreen(window);
    });

    return () => subscription?.remove();
  }, []);

  const topPadding = screen.height * 0.1;

  return (
    <LinearGradient colors={["rgb(41,47,25)", "black"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, padding: 20 }}>
        <View style={{ flex: 1, paddingVertical: 20, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: "white", fontSize: 24, marginBottom: 20 }}>Bildirimler</Text>
          <FlatList
            data={notifications}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{
              paddingTop: topPadding,
              paddingBottom: topPadding,
            }}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: "rgb(49,49,49)",
                  padding: 15,
                  borderRadius: 10,
                  marginBottom: 10,
                  elevation: 2,
                }}
              >
                <Text style={{ fontWeight: "bold", color: "white", marginBottom: 5 }}>
                  {item.title}
                </Text>
                <Text style={{ color: "white", marginBottom: 5 }}>{item.body}</Text>
                <Text style={{ fontSize: 12, color: "gray" }}>
                  {new Date(item.time).toLocaleString()}
                </Text>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
