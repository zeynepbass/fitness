

import { useEffect, useState } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Text } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from "@expo/vector-icons/Feather";
import HomeScreen from "../screens/HomeScreen";
import NotificationsScreen from '../screens/NotificationsScreen';
import DetailsScreen from "../screens/DetailsScreen";
import ActivityScreen from "../screens/ActivityScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import LoadingScreen from "../screens/LoadingScreen"

import { NavigationContainer } from "@react-navigation/native";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTab = () => (
  <Tab.Navigator
    screenOptions={({ navigation }) => ({
      title: "",
      headerTitle: () => (
        <TouchableOpacity onPress={() => navigation.navigate("HomeMain")}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
            FitnessApp
          </Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <>
                 <TouchableOpacity
               onPress={() => navigation.navigate("Notifications")}
               style={{ paddingRight: 10 }}
             >
<MaterialIcons name="sports-gymnastics" size={24} color="rgb(145, 185, 24)"  />

             </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("DetailsScreen")}
          style={{ paddingRight: 10 }}
        >
          <Feather name="settings" size={24} color="rgb(145, 185, 24)" />
        </TouchableOpacity>

             </>
      ),
      headerTitleAlign: "center",
      tabBarItemStyle: {
        justifyContent: "center",
        alignItems: "center",
      },
      headerTransparent: true,
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
    const fetchUserData = async () => {
      try {
        const stored = await AsyncStorage.getItem("userToken");
        if (stored) {
          setUser(JSON.parse(stored));  
        }
      } catch (error) {
        console.log("LocalStorage hatası:", error);
      } finally {
        setLoading(false);  
      }
    };

    fetchUserData();
  }, []);


  if (loading) {

    return <LoadingScreen />;
  }

return(

  <NavigationContainer>
  <Stack.Navigator initialRouteName={user ? 'HomeMain' : 'Login'}>
    <Stack.Screen
      name="HomeMain"
      component={BottomTab}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="DetailsScreen"
      component={DetailsScreen}
      options={{
        title: "",
        headerTransparent: true,
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="Notifications"
      component={NotificationsScreen}
      options={{
        title: "",
        headerTransparent: true,
        headerBackTitleVisible: false,
      }}
    />
  </Stack.Navigator>
</NavigationContainer>



  );
};

export default MainNavigator;
