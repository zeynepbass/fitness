import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function Filtered({active,setActive,data}) {


  const getPreviousAndToday7Days = () => {
    const days = [];
    const today = new Date();
  

    for (let i = 6; i > 0; i--) {
      const day = new Date();
      day.setDate(today.getDate() - i);
  
      const dayShort = day.toLocaleDateString("en-US", { weekday: "short" });
      const date = day.getDate();
  
      days.push({ id: 6 - i, dayShort, date }); 
    }
  
    return days;
  };

  const weekDays = getPreviousAndToday7Days();



  return (
    <View style={styles.container}>
      {weekDays.map((item) => (
        <TouchableOpacity key={item.id} onPress={() =>     setActive(item.date)}>
          <View
            style={[
              styles.card,
              {
                backgroundColor:
                  active === item.date ? "rgb(201, 235, 100)" : "rgb(49,49,49)",
              },
            ]}
          >
            <Text style={{ color: active === item.date ? "black" : "white" }}>
              {item.dayShort}
            </Text>
            <View
              style={[
                styles.date,
                {
                  backgroundColor:
                    active === item.date ? "white" : "rgb(99,100,96)",
                },
              ]}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 12,

                  color: active === item.date ? "black" : "white",
                }}
              >
                {item.date}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  date: {
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    width: 50,
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    elevation: 3,
    alignItems: "center",
  },
});
