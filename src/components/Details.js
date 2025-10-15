

import { useState } from 'react';
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
    email: "",
    height: "",
    weight: "",
    name: "",
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
  <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
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

      <TouchableOpacity onPress={pickImage} style={styles.photoBtn}>
        <Text style={styles.photoBtnText}>
          {photo ? "Fotoğraf Seçildi" : "Fotoğraf Seç"}
        </Text>
      </TouchableOpacity>


      <TextInput
        value={formData.age}
        placeholder="Yaş"
        keyboardType="number-pad"
        style={styles.input}

        onChangeText={(text) => setFormData({ ...formData, age: text })}
      />
      <TextInput
        value={formData.email}
        placeholder="Email"
        style={styles.input}
          keyboardType="email-address"
  autoCapitalize="none"
        onChangeText={(text) => setFormData({ ...formData, email: text })}
      />
      <TextInput
        value={formData.height}
        placeholder="Boy (cm)"
        style={styles.input}
        keyboardType="number-pad"

        onChangeText={(text) => setFormData({ ...formData, height: text })}
      />
      <TextInput
        value={formData.weight}
        placeholder="Kilo (kg)"
        style={styles.input}
                keyboardType="number-pad"
 
        onChangeText={(text) => setFormData({ ...formData, weight: text })}
      />
      <TextInput
        value={formData.name}
        placeholder="İsim"
        style={styles.input}

        onChangeText={(text) => setFormData({ ...formData, name: text })}
      />


      <TouchableOpacity style={styles.closeButton} onPress={() => updated(formData)}>
        <Text style={styles.buttonText}>Güncelle</Text>
      </TouchableOpacity>
    </ScrollView>
  </View>
</SafeAreaView>

  );
};

const styles = StyleSheet.create({
  headerText: {
    paddingVertical: 30,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  photo: {
    margin: 10,
    alignSelf: "center",
    borderRadius: 10,
  },
  noPhotoText: {
    color: "gray",
    textAlign: "center",
    padding: 5,
  },
  photoBtn: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    margin: 10,
    borderRadius: 8,
  },
  photoBtnText: {
    color: "gray",
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "black",
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
  },
});

export default Home;
