import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveNotification = async (notification) => {
  try {
    const stored = await AsyncStorage.getItem("notifications");
    const notifications = stored ? JSON.parse(stored) : [];
    notifications.push(notification);
    await AsyncStorage.setItem("notifications", JSON.stringify(notifications));
  } catch (error) {
    console.log("Bildirim kaydetme hatası:", error);
  }
};

export const getNotifications = async () => {
  try {
    const stored = await AsyncStorage.getItem("notifications");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.log("Bildirim alma hatası:", error);
    return [];
  }
};
