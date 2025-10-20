import { View, Text, ScrollView } from "react-native";


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
            <View style={{backgroundColor:"rgb(201, 235, 100)",padding:20,borderRadius:10}}> 
                <Text style={{ color: "black" }}> Tarih: {new Date(item.date).toLocaleDateString("tr-TR")}</Text>
                </View>
            <View>

            <Text style={{ color: "white" }}>Adım: {item.steps}</Text>
            <Text style={{ color: "white" }}>Kalori: {item.calories}</Text>
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


