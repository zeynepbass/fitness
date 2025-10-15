import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { View, Image, TouchableOpacity } from 'react-native';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Feather from "@expo/vector-icons/Feather";
import DetailsScreen from "../screens/DetailsScreen";
import HomeScreen from "../screens/HomeScreen";
import ActivityScreen from "../screens/ActivityScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeMain"
      component={HomeScreen}
      options={{ headerShown: false,title:"Ana Sayfa" }}
    />
    <Stack.Screen
      name="DetailsScreen"
      component={DetailsScreen}
      options={{
        headerShown: true,
        title: " ",
      }}
    />
  </Stack.Navigator>
);

const BottomTab = () => (
  <Tab.Navigator
    screenOptions={({ navigation }) => ({
      headerTitle: () => (
        <TouchableOpacity onPress={() => navigation.navigate("HomeMain")}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={{
                uri: "https://png.pngtree.com/png-clipart/20220604/original/pngtree-fitness-gym-logo-png-png-image_7932229.png",
              }}
              style={{ width: 70, height: 100, resizeMode: "contain" }}
            />
          </View>
        </TouchableOpacity>
      ),
      headerTitleAlign: "center",
      tabBarItemStyle: {
        justifyContent: "center",
        alignItems: "center",
      },
      headerTransparent: true,
      title: "",
      tabBarActiveTintColor: "white",
      tabBarStyle: {
        backgroundColor: "black",
        position: "absolute",
        height: 50,
        borderTopWidth: 0,
        borderRadius: 20,
        margin: 25
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
