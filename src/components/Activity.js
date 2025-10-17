
import { useState, useEffect } from 'react';
import { SafeAreaView, Text, ScrollView, Dimensions, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { LinearGradient } from "expo-linear-gradient";

const Activity = () => {
  const [screen, setScreen] = useState(Dimensions.get("window"));

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setScreen(window);
    });
    return () => subscription?.remove();
  }, []);

  const topPadding = screen.height * 0.1;

  const data = {
    labels: ["Pzt", "Sal", "Çar", "Per", "Cum"],
    datasets: [{ data: [5000, 7000, 6500, 8000, 9000] }],
  };

  const chartConfig = {
    backgroundGradientFrom: "#2a2e1b",
    backgroundGradientTo: "#000",
    fillShadowGradient: "#c9eb64",  
    fillShadowGradientOpacity: 1,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(201, 235, 100, ${opacity})`, 
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, 
    style: {
      borderRadius: 16,
    },
    propsForBackgroundLines: {
      strokeDasharray: "", 
      stroke: "rgba(255,255,255,0.1)",
    },
    propsForLabels: {
      fontWeight: "bold",
    },
  };

  const chartWidth = Math.max(screen.width - 20, data.labels.length * 70);

  return (
    <LinearGradient colors={['rgb(41,47,25)', 'black']} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        <ScrollView
          contentContainerStyle={{
            paddingTop: topPadding,
            paddingBottom: 40,
            paddingHorizontal: 10,
          }}
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
              Günlük Aktivite
            </Text>

            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: "white",
                padding: 5,
              }}
            >
              Adım Sayısı
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={true}>
            <BarChart
              data={data}
              width={chartWidth}
              height={220}
              yAxisLabel=""
              chartConfig={chartConfig}
              verticalLabelRotation={0}
              fromZero
              showValuesOnTopOfBars
              style={{
                borderRadius: 20, 
                marginVertical: 10,
             
                paddingVertical: 10,
              }}
            />
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Activity;
