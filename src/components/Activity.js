
import { useState, useEffect } from 'react';
import {
  View,
  Dimensions,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import { LinearGradient } from "expo-linear-gradient";
import { getStepsAndCalories } from "../helper/http";
import StepsLimit from "./StepsLimit/index";

const screenWidth = Dimensions.get("window").width;

export default function ActivityPieChart() {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

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
    "rgb(255,159,67)",
    "rgb(90,90,90)",
    "rgb(52,172,224)",
    "rgb(255,105,180)",
  ];

  const chartConfig = {
    backgroundGradientFrom: "#1e1e1e",
    backgroundGradientTo: "#1e1e1e",
    color: (opacity = 1) => `rgba(255,255,255,${opacity})`,
    labelColor: () => "white",
  };


  const pieData = data.map((item, index) => ({
    name: item.date,
    population: item.steps > 0 ? item.steps : 1,
    color: colors[index % colors.length],
    legendFontColor: "#fff",
    legendFontSize: 12,
  }));

  return (
    <LinearGradient colors={["rgb(41,47,25)", "black"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 40,
          }}
        >
          <StepsLimit />

          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 15,
              marginTop: 10,
            }}
          >
            Günlük Adım Dağılımı
          </Text>

          <View style={{ alignItems: "center" }}>
            <PieChart
              data={pieData}
              width={screenWidth - 40}
              height={250}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
              hasLegend={true}
            />

    
            <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 15, justifyContent: "center" }}>
              {pieData.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => setSelectedItem(item)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    margin: 6,
                    backgroundColor: "rgba(4, 4, 4, 0.09)",
                    borderRadius: 10,
                    padding: 6,
                  }}
                >
                  <View
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 8,
                      backgroundColor: item.color,
                      marginRight: 6,
                    }}
                  />
                  <Text style={{ color: "white", fontSize: 14 }}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>


          <Modal
            transparent
            visible={!!selectedItem}
            animationType="fade"
            onRequestClose={() => setSelectedItem(null)}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.9)",
              }}
            >
              <View
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  padding: 20,
                  borderRadius: 16,
                  width: "75%",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 18, marginBottom: 8 }}>
                  {selectedItem?.name}
                </Text>
                <Text style={{ color: "rgb(201,235,100)", fontSize: 16 }}>
                  {selectedItem?.population} adım
                </Text>

                <TouchableOpacity
                  onPress={() => setSelectedItem(null)}
                  style={{
                    marginTop: 15,
                    backgroundColor: "rgb(201,235,100)",
                    borderRadius: 10,
                    paddingVertical: 6,
                    paddingHorizontal: 20,
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Kapat</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
