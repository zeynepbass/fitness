

import { useState } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import {
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Alert,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const Home = () => {
  const { width } = useWindowDimensions();
  const [photo, setPhoto] = useState(null);
  const [formData, setFormData] = useState({
    age: "",

    height: "",
    weight: "",
    image: "",
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
      setFormData({ ...formData, image: result.assets[0].uri });
    }
  };

  const updated=(formData)=>{
   for(let key in formData){
    if (!formData[key]) {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun!");
      return;
    }
   }
  console.log("fomdat",formData)
}
  return (
           <LinearGradient
           colors={['rgb(41,47,25)', 'black']}
           style={{ flex: 1 }}
         
          >

    <SafeAreaView style={{ flex: 1, backgroundColor: "gradient",padding:20 }}>
  <View style={{ flex: 1, paddingVertical: 50 }}>
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingHorizontal: 20}}
      showsVerticalScrollIndicator={true}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.headerText}>Profil Bilgilerini Düzenle</Text>

 
      {photo ? (
        <Image
          source={{ uri: photo }}
          style={[styles.photo, { width: width * 0.5, height: width * 0.5 }]}
        />
      ) : (
        <Text style={styles.noPhotoText}>Fotoğraf seçilmedi</Text>
      )}

      <TouchableOpacity onPress={pickImage}   style={[styles.photoBtn, { width: width * 0.5 }]}>
        <Text style={styles.photoBtnText}>
          {photo ? "Fotoğraf Seçildi" : "Fotoğraf Seç"}
        </Text>
      </TouchableOpacity>


      <TextInput
        value={formData.age}
        placeholder="Yaş"
        keyboardType="number-pad"
        style={styles.input}
 placeholderTextColor="white"
        onChangeText={(text) => setFormData({ ...formData, age: text })}
      />

      <TextInput
        value={formData.email}
        placeholder="Email"
        style={styles.input}
          keyboardType="email-address"
  autoCapitalize="none"
   placeholderTextColor="white"
        onChangeText={(text) => setFormData({ ...formData, email: text })}
      />



      <TextInput
        value={formData.height}
        placeholder="Boy (cm)"
        style={styles.input}
        keyboardType="number-pad"
 placeholderTextColor="white"
        onChangeText={(text) => setFormData({ ...formData, height: text })}
      />
      <TextInput
        value={formData.weight}
        placeholder="Kilo (kg)"
        style={styles.input}
                keyboardType="number-pad"
  placeholderTextColor="white"
        onChangeText={(text) => setFormData({ ...formData, weight: text })}
      />




      <TouchableOpacity style={styles.closeButton} onPress={() => updated(formData)}>
        <Text style={styles.buttonText}>Güncelle</Text>
      </TouchableOpacity>
    </ScrollView>
  </View>
</SafeAreaView>
</LinearGradient>

  );
};

const styles = StyleSheet.create({
  headerText: {
    paddingVertical: 30,
    textAlign: "center",
    color:"white",
    fontSize: 20
  },
  photo: {
    margin: 10,
    alignSelf: "center",
    borderRadius: 10,
  },
  noPhotoText: {
    color: "white",
    textAlign: "center",
    padding: 5,
  },
  photoBtn: {
    backgroundColor: "rgb(222, 222, 222)",
    padding: 10,
    margin: 10,
    alignSelf: "center",
    borderRadius: 8,
  },
  photoBtnText: {

    color: "black",
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "rgb(201, 235, 100)",
    borderRadius: 15,
    padding:15,
    marginTop: 20,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "black",

    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    backgroundColor: "rgb(49,49,49)",
    padding: 10,

    marginVertical: 8,
    borderRadius: 8,
  }
});

export default Home;
