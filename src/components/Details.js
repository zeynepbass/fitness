import { useState, useEffect } from "react";
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
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Home = () => {
  const { width } = useWindowDimensions();
  const [photo, setPhoto] = useState(null);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    age: "",
    height: "",
    weight: "",
    image: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const stored = await AsyncStorage.getItem("userToken");
        if (stored) {
          setUserData(JSON.parse(stored));
        }
      } catch (error) {
        console.log("LocalStorage hatası:", error);
      }
    };
    fetchUserData();
  }, []);

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

  const updated = async () => {
    for (let key in formData) {
      if (!formData[key]) {
        Alert.alert("Hata", "Lütfen tüm alanları doldurun!");
        return;
      }
    }

    if (!userData) {
      Alert.alert("Hata", "Kullanıcı bilgisi bulunamadı!");
      return;
    }

    const uid = userData.uid || userData.user?.uid;
    const email = userData.email || userData.user?.email;
    const displayName =
      userData.displayName || userData.user?.displayName || "Bilinmiyor";

    if (!uid) {
      Alert.alert("Hata", "Kullanıcı ID'si (uid) bulunamadı!");
      return;
    }

    const payload = {
      email,
      name: displayName,
      age: formData.age,
      height: formData.height,
      weight: formData.weight,
      image: formData.image,
      updatedAt: new Date().toISOString(),
    };

    try {
      const userRef = doc(db, "users", uid);
      await setDoc(userRef, payload, { merge: true });

      Alert.alert("Başarılı", "Profil bilgilerin Firebase'e kaydedildi!");
      setFormData({ age: "", height: "", weight: "" });
    } catch (error) {
      console.log("Firestore Hatası:", error);
      Alert.alert("Hata", "Firebase'e kayıt başarısız oldu!");
    }
  };

  return (
    <LinearGradient colors={["rgb(41,47,25)", "black"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, padding: 20 }}>
        <View style={{ flex: 1, paddingVertical: 50 }}>
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 20 }}
            showsVerticalScrollIndicator={true}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.headerText}>Profil Bilgilerini Düzenle</Text>

            {photo ? (
              <Image
                source={{ uri: photo }}
                style={[
                  styles.photo,
                  { width: width * 0.5, height: width * 0.5 },
                ]}
              />
            ) : (
              <Text style={styles.noPhotoText}>Fotoğraf seçilmedi</Text>
            )}

            <TouchableOpacity
              onPress={pickImage}
              style={[styles.photoBtn, { width: width * 0.5 }]}
            >
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
              value={formData.height}
              placeholder="Boy (cm)"
              style={styles.input}
              keyboardType="number-pad"
              placeholderTextColor="white"
              onChangeText={(text) =>
                setFormData({ ...formData, height: text })
              }
            />

            <TextInput
              value={formData.weight}
              placeholder="Kilo (kg)"
              style={styles.input}
              keyboardType="number-pad"
              placeholderTextColor="white"
              onChangeText={(text) =>
                setFormData({ ...formData, weight: text })
              }
            />

            <TouchableOpacity style={styles.closeButton} onPress={updated}>
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
    color: "white",
    fontSize: 20,
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
    padding: 15,
    marginTop: 20,
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
    color: "white",
  },
});

export default Home;
