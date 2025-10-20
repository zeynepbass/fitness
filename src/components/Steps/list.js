import { View, Text, ScrollView } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const List = ({data}) => {
  return (
    <ScrollView style={{ flex: 1 }}>
      {data.length > 0 ? (
        data.map((item) => (
          <View
            key={item.id}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems:"center",
              backgroundColor: "rgb(49,49,49)",
              padding: 15,
              borderRadius: 10,
              marginBottom: 10,
              elevation: 2,
            }}
          >
            <View> 
            <Text style={{ color: "black",backgroundColor:"rgb(201, 235, 100)",padding:5,borderRadius:10,margin:5,fontWeight:"bold",width:"40" }}> <FontAwesome name="calendar" size={24} color="black" /></Text>
                <Text style={{ color: "white" }}>  {new Date(item.date).toLocaleDateString("tr-TR")}</Text>
                </View>
            <View>

            <Text style={{ color: "white" }}>Adım: {item.steps}</Text>
            <Text style={{ color: "white" }}>Kalori: {item.calories}</Text>
            <Text style={{ color: "white" }}>Mesafe: {parseFloat(item.distance).toFixed(4)}</Text>
            </View>
  
          </View>
        ))
      ) : (
        <Text style={{ textAlign: "center", marginTop: 30,color:"white" }}>
          Henüz veri yok 
        </Text>
      )}
    </ScrollView>
  );
};

export default List;


