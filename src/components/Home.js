
import { useState, useEffect } from 'react';
import Steps from "../components/Steps"
import { LinearGradient } from "expo-linear-gradient";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
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

  const activities = [
    { id: 1, name: "Koşu", value: "5 km" },
    { id: 2, name: "Bisiklet", value: "10 km" },
    { id: 3, name: "Yoga", value: "30 dk" },
    { id: 4, name: "Yüzme", value: "1 km" },
    { id: 5, name: "Koşu", value: "6 km" },
  ];

  return (

       <LinearGradient
       colors={['rgb(41,47,25)', 'black']}
       style={{ flex: 1 }}
     
      >
            <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>

     
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: topPadding, paddingHorizontal: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={true}
      >

        <View style={{ flexDirection: "column"}}>
          <Text style={{ fontSize: 20, fontWeight: "bold" ,color:"rgb(201, 235, 100)",padding:5}}>Merhaba, {userToken?.displayName || "Kullanıcı"}</Text>

          <Text style={{ fontSize: 15, fontWeight: "bold" ,color:"white",padding:5}}>Fitness'a Hoşgeldin !</Text>
        </View>      



        <ScrollView horizontal showsHorizontalScrollIndicator={true} style={{ marginVertical:10 }}>
        <Steps userEmail={userToken?.email}/>
        </ScrollView>

        <View style={{padding:10}}>
        <Text style={{ fontSize: 18, color:"white", marginBottom: 10 }}>Son Aktiviteler</Text>
        {activities.map((item) => (
          <View key={item.id} style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "rgb(49,49,49)", padding: 15, borderRadius: 10, marginBottom: 10, elevation: 2 }}>
            <Text style={{color:"white"}}>{item.name}</Text>
            <Text style={{color:"white"}}>{item.value}</Text>
          </View>
        ))}
        </View>
      </ScrollView>
      </SafeAreaView>
      </LinearGradient>

  );
};

export default Home;
