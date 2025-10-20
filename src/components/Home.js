import { useState, useEffect } from "react";
import { getStepsAndCalories } from "../helper/http";
import List from "../components/Steps/list";
import Steps from "../components/Steps";
import Filtered from "../components/Steps/filtered";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, Text, View, ScrollView, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Home = () => {
  const [screen, setScreen] = useState(Dimensions.get("window"));
  const [userToken, setUserToken] = useState("");

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

      return () => subscription?.remove();
    };

    checkTokenAndListen();
  }, []);
  const topPadding = screen.height * 0.1;


  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await getStepsAndCalories();
      if (res) {
        setData(res);
        console.log(res);
      } else {
        console.log("Veri bulunamadı.");
      }
    } catch (error) {
      console.log("Veri çekme hatası:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [active, setActive] = useState(null);

const filteredData = active
  ? data.filter(item => {

      const today = new Date(item.date); 
      const dayNum = today.getDate(); 
      return dayNum === active;
    })
  : data; 

  return (
    <LinearGradient colors={["rgb(41,47,25)", "black"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingTop: topPadding,
            paddingHorizontal: 20,
            paddingBottom: 40,
          }}
          showsVerticalScrollIndicator={true}
        >
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "rgb(201, 235, 100)",
                padding: 5,
              }}
            >
              Merhaba, {userToken?.displayName || "Kullanıcı"}
            </Text>

            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: "white",
                padding: 5,
              }}
            >
              Fitness'a Hoşgeldin !
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            style={{ marginVertical: 10 }}
          >
            <Steps userEmail={userToken?.email} />
          </ScrollView>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            style={{ marginVertical: 10 }}
          >
   <Filtered data={data} setActive={setActive}  active={active}/>

        </ScrollView>
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 18, color: "white", marginBottom: 10 }}>
              Son Aktiviteler
            </Text>
            <List data={filteredData}/>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Home;
