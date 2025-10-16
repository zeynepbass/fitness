

<<<<<<< HEAD
import React from "react";
=======
import { useState, useEffect } from 'react';
>>>>>>> main
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Text,View,ActivityIndicator } from "react-native";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import Feather from "@expo/vector-icons/Feather";
import DetailsScreen from "../screens/DetailsScreen";
import HomeScreen from "../screens/HomeScreen";
import ActivityScreen from "../screens/ActivityScreen";
import ProfileScreen from "../screens/ProfileScreen";
<<<<<<< HEAD
import { TouchableOpacity ,Text} from "react-native";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeMain"
      component={HomeScreen}
      options={{ headerShown: false, title: "" }}
    />
    <Stack.Screen
      name="DetailsScreen"
      component={DetailsScreen}
      options={{
        headerShown: true,
        title: " ",
        headerShown: true,
        headerTransparent: true
      }}
    />
  </Stack.Navigator>
);
=======
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from "../screens/LoginScreen";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

>>>>>>> main

const BottomTab = () => (
  <Tab.Navigator
    screenOptions={({ navigation }) => ({
      title:"",
      headerTitle: () => (
<<<<<<< HEAD
        <TouchableOpacity onPress={() => navigation.navigate("HomeMain")}>
 
            <Text style={{color:"white",fontWeight:"bold",fontSize:"20"}}>FitnessApp</Text>
     

=======
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
            FitnessApp
          </Text>
>>>>>>> main
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("DetailsScreen")}
          style={{ paddingRight: 10 }}
        >
          <Feather name="settings" size={24} color="rgb(145, 185, 24)" />
        </TouchableOpacity>
      ),
      headerTitleAlign: "center",
      tabBarItemStyle: {
        justifyContent: "center",
        alignItems: "center",
      },
      headerTransparent: true,
<<<<<<< HEAD
      title: "",
=======
>>>>>>> main
      tabBarActiveTintColor: "rgb(201, 235, 100)",
      tabBarStyle: {
        backgroundColor: "rgb(35, 37, 36)",
        position: "absolute",
        height: 50,
        borderTopWidth: 0,
        borderRadius: 20,
        margin: 25,
      },
    })}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ size, color }) => (
          <Feather name="home" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Activity"
      component={ActivityScreen}
      options={{
        tabBarIcon: ({ size, color }) => (
          <Feather name="activity" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="ProfileTab"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ size, color }) => (
          <Feather name="user" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);


const MainNavigator = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe; 
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <Stack.Navigator>
{!user ? (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
    
              headerShown: false
            }}
          />
        </>
      ) : (
        <Stack.Screen
          name="HomeMain"
          component={BottomTab}
          options={{ headerShown: false,title:"" }}
        />
      )}

      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{
          title: "",
          headerTransparent: true,
          headerBackTitleVisible: false,

        }}
      />


    </Stack.Navigator>
  );
};

export default MainNavigator;