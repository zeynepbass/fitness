
import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { auth, db } from "../../firebase"; 
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    ad: "",
    soyad: "",
  });

  const handleRegister = async () => {
    await AsyncStorage.clear();
    const { email, confirmEmail, password, confirmPassword, ad, soyad } = formData;

    if (!email || !confirmEmail || !password || !confirmPassword || !ad || !soyad) {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun!");
      return;
    }

    if (email !== confirmEmail) {
      Alert.alert("Hata", "Email adresleri eşleşmiyor!");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Hata", "Parolalar eşleşmiyor!");
      return;
    }

    try {

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;


      await updateProfile(user, {
        displayName: ad + " " + soyad,
      });


      await setDoc(doc(db, "users", user.uid), {
        ad,
        soyad,
        displayName: ad + " " + soyad,
        email,
        createdAt: Date.now(),
      });

      Alert.alert("Başarılı", "Kayıt tamamlandı!");
      navigation.navigate("Login");

    } catch (error) {
      console.log(error.message);
      Alert.alert("Hata", error.message);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={{ flex: 1 }}
    >
      <LinearGradient colors={["rgba(41,47,25,0.7)", "rgba(0,0,0,0.7)"]} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
          <View style={styles.formContainer}>
            <ScrollView
              contentContainerStyle={{ paddingVertical: 20 }}
              showsVerticalScrollIndicator={true}
              keyboardShouldPersistTaps="handled"
            >
              <Text style={styles.headerText}>Kayıt Ol</Text>
              <TextInput
                value={formData.ad}
                placeholder="Ad"
                style={styles.input}
                placeholderTextColor="white"
                onChangeText={(text) => setFormData({ ...formData, ad: text })}
              />
              <TextInput
                value={formData.soyad}
                placeholder="Soyad"
                style={styles.input}
                placeholderTextColor="white"
                onChangeText={(text) => setFormData({ ...formData, soyad: text })}
              />
              <TextInput
                value={formData.email}
                placeholder="Email"
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor="white"
                onChangeText={(text) => setFormData({ ...formData, email: text })}
              />
              <TextInput
                value={formData.confirmEmail}
                placeholder="Email tekrar"
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor="white"
                onChangeText={(text) => setFormData({ ...formData, confirmEmail: text })}
              />
              <TextInput
                value={formData.password}
                placeholder="Parola"
                style={styles.input}
                autoCapitalize="none"
                placeholderTextColor="white"
                secureTextEntry
                onChangeText={(text) => setFormData({ ...formData, password: text })}
              />
              <TextInput
                value={formData.confirmPassword}
                placeholder="Parola tekrar"
                style={styles.input}
                autoCapitalize="none"
                placeholderTextColor="white"
                secureTextEntry
                onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
              />
                     <TouchableOpacity  onPress={()=>navigation.navigate("Login")}>
              <Text
                style={{ color: "rgb(201, 235, 100)", textDecorationLine: "underline", textAlign: "left" }}

              >
                Giriş Yap
              </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Kayıt Ol</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: "90%",
    backgroundColor: "rgba(255,255,255,0.05)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    borderRadius: 20,
    padding: 20,
  },
  headerText: {
    paddingVertical: 20,
    textAlign: "center",
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "rgb(51, 51, 51)",
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "rgb(201, 235, 100)",
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
    alignItems: "center",
    width: "50%",
    alignSelf: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
});

export default Register;
