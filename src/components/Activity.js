

import { useState, useEffect } from 'react';
import { View, Dimensions, Text, ScrollView, SafeAreaView } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { LinearGradient } from "expo-linear-gradient";
import { getStepsAndCalories } from "../helper/http";
import StepsLimit from "./StepsLimit/index";
const screenWidth = Dimensions.get("window").width;

export default function ActivityPieChart() {
  const [screen, setScreen] = useState(Dimensions.get("window"));
  const [data, setData] = useState([]);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setScreen(window);
    });
    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getStepsAndCalories();
        if (res) setData(res);
      } catch (error) {
        console.log("Veri çekme hatası:", error);
      }
    };
    fetchData();
  }, []);

  const colors = [
    "rgb(201,235,100)",
    "rgb(156,193,43)",
    "white",
    "gray",
    "rgb(90,90,90)",
  ];

  const chartConfig = {
    backgroundGradientFrom: "#1e1e1e",
    backgroundGradientTo: "#1e1e1e",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(201, 235, 100, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
    style: { borderRadius: 16 },
  };

  return (
    <LinearGradient colors={["rgb(41,47,25)", "black"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "gradient" }}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 40,
          }}
          showsVerticalScrollIndicator={false}
        >
          <StepsLimit />
          <View
            style={{
              padding: 20,
              marginTop: 10,
              borderRadius: 20,
              backgroundColor: "rgba(255,255,255,0.05)",
              shadowColor: "#000",
              shadowOpacity: 0.5,
              shadowOffset: { width: 0, height: 4 },
              shadowRadius: 8,
              elevation: 5,
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 15,
              }}
            >
              Günlük Adım Dağılımı
            </Text>
            <PieChart
              data={data.map((item, index) => ({
                name: `${item.date}`,
                population: item.steps > 0 ? item.steps : 1,
                color: colors[index % colors.length],
                legendFontColor: "#fff",
                legendFontSize: 12,
              }))}
              width={screenWidth - 60}
              height={250}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
              hasLegend={true}
              avoidFalseZero
            />
          </View>

          <View
            style={{
              padding: 20,
              borderRadius: 20,
              backgroundColor: "rgba(255,255,255,0.05)",
              shadowColor: "#000",
              shadowOpacity: 0.5,
              shadowOffset: { width: 0, height: 4 },
              shadowRadius: 8,
              elevation: 5,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 15,
              }}
            >
              Günlük Kalori Dağılımı
            </Text>
            <PieChart
              data={data.map((item, index) => ({
                name: `${item.date}`,
                population: item.calories > 0 ? item.calories : 1,
                color: colors[index % colors.length],
                legendFontColor: "#fff",
                legendFontSize: 12,
              }))}
              width={screenWidth - 60}
              height={250}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
              hasLegend={true}
              avoidFalseZero
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
