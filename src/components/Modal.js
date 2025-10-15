

import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

const AppModal = ({ open, setOpen }) => {
  const { width, height } = Dimensions.get("window");
  const [formData, setFormData] = useState({
    adim: "",
    kalori: "",
  });

  const handleSave = (formData) => {
    for (let key in formData){
      if(!formData[key]){
        Alert.alert("Hata", "Lütfen tüm alanları doldurun!");
        return;
      }
    }
    console.log(formData);
    setOpen(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={() => setOpen(false)}
    >
      <View style={styles.modalBackground}>
        <View style={[styles.modalContainer, { width: width * 0.85 }]}>
          <Text style={styles.modalTitle}>Düzenle</Text>

          <TextInput
            value={formData.adim}
            placeholder="Adım"
            keyboardType="numeric"
             placeholderTextColor="white"
            style={styles.input}
            onChangeText={(text) => setFormData({ ...formData, adim: text })}
          />

          <TextInput
            value={formData.kalori}
            placeholder="Kalori"
         
 placeholderTextColor="white"
            keyboardType="numeric"
            style={styles.input}
            onChangeText={(text) =>
              setFormData({ ...formData, kalori: text })
            }
          />

          <View style={styles.buttonContainer}>
          <TouchableOpacity
          onPress={handleSave} 
      
              style={styles.closeButton}
            >
              <Text style={styles.buttonText}>Güncelle</Text>
            </TouchableOpacity>
            <TouchableOpacity   onPress={() => setOpen(false)} style={styles.saveButton}>
              <Text style={styles.buttonText}>Kapat</Text>
            </TouchableOpacity>

   
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AppModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "rgb(49,49,49)",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 22,

    color:"white",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  saveButton: {
  backgroundColor: "rgb(222, 222, 222)",
    flex: 1,
    marginLeft: 5,
    paddingVertical: 12,
    borderRadius: 15,
    padding:10,
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: "rgb(201, 235, 100)",
    flex: 1,
    marginLeft: 5,
    paddingVertical: 12,
    borderRadius: 15,
    padding:10,
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
});
