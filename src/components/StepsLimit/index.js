
import { useState, useEffect } from 'react';
import { Text, View, Dimensions, SafeAreaView, ScrollView } from "react-native";
import { getUserByEmail } from "../../helper/http";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Index = () => {
  const [data, setData] = useState({});
  const [userToken, setUserToken] = useState(null);
  const [screen, setScreen] = useState(Dimensions.get("window"));

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setScreen(window);
    });
    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("userToken");
      const parsedToken = token ? JSON.parse(token) : null;
      setUserToken(parsedToken);

      if (parsedToken?.email) {
        const user = await getUserByEmail(parsedToken.email);
        setData(user);
      }
    };
    fetchData();
  }, []);

  const topPadding = screen.height * 0.1;
  const cardWidth = (screen.width - 70) / 2; 

  return (
    <SafeAreaView style={{ flex: 1}}>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          paddingTop: topPadding,
        }}
        showsVerticalScrollIndicator={false}
      >

        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "white",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          Fitness Hedefi: {data?.calories ?? "Adım Girilmedi"}
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "center", width: "100%" }}>
          <View
            style={{
              backgroundColor: "rgb(49,49,49)",
              width: cardWidth,
              padding: 5,
              
margin:10,
              borderRadius: 15,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", marginBottom: 10 }}>Adım Hedefi</Text>
            <Text style={{ fontWeight: "bold",        color: "rgb(201, 235, 100)", fontSize: 18 }}>
              {data?.steps ?? 0}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "rgb(49,49,49)",
              width: cardWidth,
              padding: 5,
margin:10,

              borderRadius: 15,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", marginBottom: 10 }}>Kalori Hedefi</Text>
            <Text style={{ fontWeight: "bold",  color: "rgb(201, 235, 100)", fontSize: 18 }}>
              {data?.calories ?? 0}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
