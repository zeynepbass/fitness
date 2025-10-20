
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
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getUserByEmail } from "../helper/http";
import { LinearGradient } from "expo-linear-gradient";
import Modal from "../components/Modal";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function ProfileScreen() {
  const navigation = useNavigation();
  const [screen, setScreen] = useState(Dimensions.get("window"));
  const [open, setOpen] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [data, setData] = useState({});

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

        setData(users);
      };
      fetchUsers();
      return () => subscription?.remove();
    };

    checkTokenAndListen();
  }, []);

  const topPadding = screen.height * 0.1;
  const cardWidth = (screen.width - 80) / 2;
  const imageSize = Math.min(screen.width, screen.height) * 0.25;
  const handleLogout = async () => {
    try {
      navigation.navigate("Login");
      await AsyncStorage.removeItem("userToken");

    } catch (error) {
      alert(error.message);
    }
  };
  const stats = [
    { label: "Yaş", value: data?.age, icon: <MaterialIcons name="emoji-people" size={24} color="white" /> },
    { label: "Kilo", value: data?.weight, icon: <FontAwesome5 name="weight" size={24} color="white" /> },
    { label: "Boy", value: data?.height, icon: <AntDesign name="column-height" size={24} color="white" /> },
  ];
  
  return (
    <LinearGradient colors={["rgb(41,47,25)", "black"]} style={{ flex: 1 }}>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "gradient", padding: 20 }}
      >
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            paddingTop: topPadding,
          }}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity style={{ marginBottom: 10 }}>
            <Image
              source={{ uri: data?.image }}
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
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              color: "white",
              margin: 10,
              textAlign: "center",
            }}
          >
            Fitness Hedefi:{" "}
            {data?.calories ? `${data.calories}` : "Adım Girilmedi"}
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
              <Text style={{ fontWeight: "bold", color: "white" }}>
                {data?.steps}
              </Text>
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
          <Modal
            open={open}
            setOpen={setOpen}
            onUpdate={(newadim, newkalori) => {
              setData((prev) => ({
                ...prev,
                steps: newadim,
                calories: newkalori,
              }));
            }}
          />
       <View style={styles.container}>
       {Array.isArray(stats) && stats.map((item, index) => (
  <View key={item.label || index} style={styles.card}>
    <Text style={styles.label}>
      {item.icon} {item.label}
    </Text>
    <Text style={styles.value}>
      {item.value ?? ""}
    </Text>
  </View>
))}

        </View>  </ScrollView>
       
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
}

const styles = {
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  card: {
    flex: 1,
    backgroundColor: "rgb(49,49,49)",
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 15,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  label: {
    color: "white",
    fontSize: 14,
    marginBottom: 5,
  },
  value: {
    color: "rgb(201,235,100)",
    fontSize: 16,
    fontWeight: "bold",
  },
};

