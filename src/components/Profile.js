
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import Modal from "../components/Modal"
const ProfileScreen = () => {

  const [screen, setScreen] = useState(Dimensions.get("window"));
const [open,setOpen]=useState(false)
  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setScreen(window);
    });
    return () => subscription?.remove();
  }, []);

  const topPadding = screen.height * 0.1;
  const cardWidth = (screen.width - 80) / 2;
  const imageSize = Math.min(screen.width, screen.height) * 0.25;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2",padding:20 }}>
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

        <Text  style={{ fontSize: 24, fontWeight: "bold" }}>
          Zeynep Baş
        </Text>
        <Text
 style={{ fontSize: 24, fontWeight: "bold",
            color: "gray",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          Fitness Hedefi: 10,000 Adım
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: 20,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 15,
              borderRadius: 15,
              alignItems: "center",
              width: cardWidth,
              margin:2
            }}
          >
            <Text>Adım Hedefi</Text>
            <Text style={{ fontWeight: "bold" }}>10,000</Text>
          </View>

          <View
            style={{
              backgroundColor: "white",
              padding: 15,
              borderRadius: 15,
              alignItems: "center",
              width: cardWidth,
              margin:2
            }}
          >
            <Text>Kalori Hedefi</Text>
            <Text style={{ fontWeight: "bold" }}>500 kcal</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "black",
            paddingVertical: 12,
            paddingHorizontal: screen.width * 0.1,
            borderRadius: 25,
          }}
          onPress={()=>setOpen(true)}
        >
          <Text style={{ color: "white", fontWeight: "bold" }} >
            Hedefleri Düzenle
          </Text>
        </TouchableOpacity>
   <Modal   open={open} setOpen={setOpen}/>

      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
