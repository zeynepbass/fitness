
import { useState, useEffect } from 'react';
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
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({ password: "", email: "" });


  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        navigation.replace("HomeMain");
      }
    };
    checkLogin();
  }, []);

  const login = async (formData) => {
    const { email, password } = formData;

    if (!email || !password) {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun!");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;


      await AsyncStorage.setItem("userToken", user.uid);

      console.log("Login başarılı:", user.email);
      navigation.replace("HomeMain");
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
      <LinearGradient
        colors={["rgba(41,47,25,0.7)", "rgba(0,0,0,0.7)"]}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
          <View style={styles.formContainer}>
            <ScrollView
              contentContainerStyle={{ paddingVertical: 20 }}
              showsVerticalScrollIndicator={true}
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
                secureTextEntry={true}
                onChangeText={(text) =>
                  setFormData({ ...formData, password: text })
                }
              />
<Text style={{color:"rgb(201, 235, 100)", textDecorationLine:"underline",textAlign:"right"}} onPress={()=>navigation.navigate("Register")}>Kayıt Ol</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => login(formData)}
              >
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

export default Home;
