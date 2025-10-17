
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import {getUserByEmail} from "../helper/http"
import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import Modal from "../components/Modal";
import { auth } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ProfileScreen = () => {
  const navigation = useNavigation();
  const [screen, setScreen] = useState(Dimensions.get("window"));
  const [open, setOpen] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [data, setData] = useState(0);
  useEffect(() => {
    const checkTokenAndListen = async () => {
      const token = await AsyncStorage.getItem("userToken");
      const parsedToken = token ? JSON.parse(token) : null;
      setUserToken(parsedToken);

      const subscription = Dimensions.addEventListener(
        "change",
        ({ window }) => {
          setScreen(window);
        }
      );
      const fetchUsers = async () => {
        const users = await getUserByEmail();
        setData(users)
      };
      fetchUsers();
      return () => subscription?.remove();
    };

    checkTokenAndListen();
  }, [data]);

  const topPadding = screen.height * 0.1;
  const cardWidth = (screen.width - 80) / 2;
  const imageSize = Math.min(screen.width, screen.height) * 0.25;
  const handleLogout = async () => {
    try {
      await auth.signOut();
      await AsyncStorage.removeItem("userToken");
      navigation.navigate("Login");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <LinearGradient colors={["rgb(41,47,25)", "black"]} style={{ flex: 1 }}>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "gradient", padding: 20 }}
      >
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            paddingTop: topPadding,
            paddingBottom: topPadding,
            paddingHorizontal: 20,
          }}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity style={{ marginBottom: 10 }}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150" }}
              style={{
                width: imageSize,
                height: imageSize,
                borderRadius: imageSize / 2,
              }}
            />
          </TouchableOpacity>

          <Text style={{ fontSize: 24, color: "white" }}>
            {userToken?.displayName || "Kullanıcı"}
          </Text>
          <Text style={{ fontSize: 14, fontWeight: "bold", color: "white", margin: 10, textAlign: "center" }}>
  Fitness Hedefi: {data?.calories ? `${data.calories}` : "Adım Girilmedi"}
</Text>


          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",

              width: "100%",
              marginBottom: 20,
            }}
          >
            <View
              style={{
                backgroundColor: "rgb(49,49,49)",
                borderRadius: 15,
                padding: 15,

                margin: 5,
                borderRadius: 15,
                alignItems: "center",
                width: cardWidth,
              }}
            >
              <Text style={{ color: "white" }}>Adım Hedefi</Text>
              <Text style={{ fontWeight: "bold", color: "white" }}>{data?.steps}</Text>
            </View>

            <View
              style={{
                backgroundColor: "rgb(49,49,49)",
                borderRadius: 15,
                padding: 15,
                margin: 5,

                borderRadius: 15,
                alignItems: "center",
                width: cardWidth,
              }}
            >
              <Text style={{ color: "white" }}>Kalori Hedefi</Text>
              <Text style={{ fontWeight: "bold", color: "white" }}>
              {data?.calories}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "rgb(201, 235, 100)",
              borderRadius: 15,
              padding: 15,

              paddingHorizontal: screen.width * 0.1,
            }}
            onPress={() => setOpen(true)}
          >
            <Text style={{ color: "black" }}>Hedefleri Düzenle</Text>
          </TouchableOpacity>
          <Modal open={open} setOpen={setOpen}  onUpdate={(newadim, newkalori) => {
setData(prev => ({ ...prev, steps: newadim, calories: newkalori }));
  }}/>
        </ScrollView>
      </SafeAreaView>
      <TouchableOpacity
        style={{
          backgroundColor: "rgb(201, 235, 100)",
          width: 60,
          height: 60,
          marginBottom: topPadding,
          alignSelf: "center",
          borderRadius: 30,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "rgb(155, 181, 76)",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 8,
        }}
        onPress={handleLogout}
      >
        <AntDesign name="logout" size={24} color="black" />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default ProfileScreen;
