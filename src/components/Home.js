

import { useState, useEffect } from 'react';

import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [screen, setScreen] = useState(Dimensions.get("window"));
const navigation=useNavigation();
  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setScreen(window);
    });
    return () => subscription?.remove();
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: topPadding, paddingHorizontal: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={true}
      >

        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", margin:10}}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>Merhaba, Zeynep!</Text>
          <TouchableOpacity  onPress={()=>navigation.navigate("DetailsScreen")} >
            <Feather name="settings" size={24} color="black"/>
          </TouchableOpacity>
        </View>


        <ScrollView horizontal showsHorizontalScrollIndicator={true} style={{ marginBottom: 20 }}>

          <View style={{ width: 150, backgroundColor: "white", borderRadius: 15, padding: 15, marginRight: 10, elevation: 3 }}>
            <Text>Adım</Text>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>8,500</Text>
          </View>
          <View style={{ width: 150, backgroundColor: "white", borderRadius: 15, padding: 15, marginRight: 10, elevation: 3 }}>
            <Text>Kalori</Text>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>320 kcal</Text>
          </View>
          <View style={{ width: 150, backgroundColor: "white", borderRadius: 15, padding: 15, marginRight: 10, elevation: 3 }}>
            <Text>Mesafe</Text>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>5 km</Text>
          </View>


        </ScrollView>

        <View style={{padding:10}}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Son Aktiviteler</Text>
        {activities.map((item) => (
          <View key={item.id} style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "white", padding: 15, borderRadius: 10, marginBottom: 10, elevation: 2 }}>
            <Text>{item.name}</Text>
            <Text>{item.value}</Text>
          </View>
        ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
