

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Feather from "@expo/vector-icons/Feather";
import DetailsScreen from "../screens/DetailsScreen";
import HomeScreen from "../screens/HomeScreen";
import ActivityScreen from "../screens/ActivityScreen";
import ProfileScreen from "../screens/ProfileScreen";
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

const BottomTab = () => (
  <Tab.Navigator
    screenOptions={({ navigation }) => ({
      headerTitle: () => (
        <TouchableOpacity onPress={() => navigation.navigate("HomeMain")}>
 
            <Text style={{color:"white",fontWeight:"bold",fontSize:"20"}}>FitnessApp</Text>
     

        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
       onPress={() => navigation.navigate("Home", { screen: "DetailsScreen" })}

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
      title: "",
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
      component={HomeStack}
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

export default BottomTab;
