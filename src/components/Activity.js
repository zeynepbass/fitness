
import { useState, useEffect } from 'react';
import { SafeAreaView, Text, ScrollView, Dimensions,View } from "react-native";
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
    backgroundColor: "#f2f2f2",
    backgroundGradientFrom: "#f2f2f2",
    backgroundGradientTo: "#f2f2f2",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(78, 115, 223, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: { borderRadius: 16 },
    propsForDots: { r: "6", strokeWidth: "2", stroke: "#4e73df" },
  };

 
  const chartWidth = Math.max(screen.width - 20, data.labels.length * 70);

  return (
       <LinearGradient
       colors={['rgb(41,47,25)', 'black']}
       style={{ flex: 1 }}
     
      >
            <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: topPadding,
          paddingBottom: 40,
          paddingHorizontal: 10,
        }}
      >

       <View style={{ flexDirection: "column"}}>
          <Text style={{ fontSize: 20, fontWeight: "bold" ,color:"rgb(201, 235, 100)",padding:5}}>Günlük Aktivite</Text>

          <Text style={{ fontSize: 15, fontWeight: "bold" ,color:"white",padding:5}}>Adım Sayısı</Text>
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
          />
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
</LinearGradient>
  );
};

export default Activity;
