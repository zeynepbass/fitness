import { View, Text, SafeAreaView,ImageBackground, ScrollView, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useState } from 'react';

import { LinearGradient } from "expo-linear-gradient";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {

  const navigation = useNavigation();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const login = async () => {
    const { email, password } = formData;

    if (!email || !password) {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun!");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;


      await AsyncStorage.setItem("userToken", JSON.stringify(user));
      
   
      console.log("✅ Giriş başarılı:", user.email);
      navigation.navigate("HomeMain");

      
    } catch (error) {
      console.log("❌ Login hatası:", error.message);
      Alert.alert("Hata", "Giriş başarısız, bilgileri kontrol et.");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={{ flex: 1 }}
    >
      <LinearGradient
        colors={["rgba(41,47,25,0.7)", "rgba(0,0,0,0.7)"]}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
          <View style={styles.formContainer}>
            <ScrollView
              contentContainerStyle={{ paddingVertical: 20 }}
              keyboardShouldPersistTaps="handled"
            >
              <Text style={styles.headerText}>Giriş Yap</Text>

              <TextInput
                value={formData.email}
                placeholder="Email"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="white"
                onChangeText={(text) =>
                  setFormData({ ...formData, email: text })
                }
              />

              <TextInput
                value={formData.password}
                placeholder="Parola"
                style={styles.input}
                placeholderTextColor="white"
                secureTextEntry
                onChangeText={(text) =>
                  setFormData({ ...formData, password: text })
                }
              />
           <TouchableOpacity  onPress={() => navigation.navigate("Register")}>


              <Text
                style={{
                  color: "rgb(201, 235, 100)",
                  textDecorationLine: "underline",
                  textAlign: "right",
                }}

              >
                Kayıt Ol
              </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={login}>
                <Text style={styles.buttonText}>Giriş yap</Text>
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
    backgroundColor: "rgb(26, 38, 19)",
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

export default LoginScreen;
