
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

import AntDesign from '@expo/vector-icons/AntDesign';

import { LinearGradient } from "expo-linear-gradient";
import Modal from "../components/Modal"
import {auth} from "../../firebase"
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ProfileScreen = () => {
const navigation=useNavigation();
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
  const handleLogout = async () => {
    try {
      await auth.signOut();
      await AsyncStorage.removeItem("userToken");
      navigation.replace("Login");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
           <LinearGradient
           colors={['rgb(41,47,25)', 'black']}
           style={{ flex: 1 }}
         
          >

    <SafeAreaView style={{ flex: 1, backgroundColor: "gradient",padding:20 }}>
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

        <Text  style={{ fontSize: 24, color:"white"}}>
          Zeynep Baş
        </Text>
        <Text
 style={{ fontSize: 14, fontWeight: "bold",
            color: "white",
            margin: 10,
            textAlign: "center",
          }}
        >
          Fitness Hedefi: 10,000 Adım
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
              borderRadius: 15, padding: 15, 

               margin:5,
              borderRadius: 15,
              alignItems: "center",
              width: cardWidth

            }}
          >
            <Text style={{              color:"white"}}>Adım Hedefi</Text>
            <Text style={{ fontWeight: "bold",color:"white" }}>10,000</Text>
          </View>

          <View
            style={{
              backgroundColor: "rgb(49,49,49)", 
              borderRadius: 15, padding: 15, 
              margin:5,

              borderRadius: 15,
              alignItems: "center",
              width: cardWidth
 
            }}
          >
            <Text style={{ color:"white" }}>Kalori Hedefi</Text>
            <Text style={{  fontWeight: "bold",color:"white" }}>500 kcal</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "rgb(201, 235, 100)",
            borderRadius: 15,
            padding:15,
    
            paddingHorizontal: screen.width * 0.1,
  
          }}
          onPress={()=>setOpen(true)}
        >
          <Text style={{ color: "black" }} >
            Hedefleri Düzenle
          </Text>
        </TouchableOpacity>
   <Modal   open={open} setOpen={setOpen}/>
  
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
