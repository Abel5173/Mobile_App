import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";

// type RootStackParamList = {
//   Home: undefined;
//   AddContact: undefined;
// };

// type AddContactScreenNavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   "AddContact"
// >;

// type Props = {
//   navigation: AddContactScreenNavigationProp;
// };

const AddContactScreen = () => {
  const [contactInfo, setContactInfo] = useState({
    name: "",
    role: "",
    number: "",
  });

  const handleAddContact = () => {
    console.log("Contact Added:", contactInfo);
  };
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);
  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={[
            styles.input,
            isFocused1 && { borderWidth: 2, borderColor: "#FF6464" },
          ]}
          onBlur={() => setIsFocused1(false)}
          onFocus={() => setIsFocused1(true)}
          value={contactInfo.name}
          onChangeText={(text) =>
            setContactInfo({ ...contactInfo, name: text })
          }
        />
      </View>
      <View style={{ width: "100%" }}>
        <Text style={styles.label}>Role</Text>
        <TextInput
          style={[
            styles.input,
            isFocused2 && { borderWidth: 2, borderColor: "#FF6464" },
          ]}
          onBlur={() => setIsFocused2(false)}
          onFocus={() => setIsFocused2(true)}
          value={contactInfo.role}
          onChangeText={(text) =>
            setContactInfo({ ...contactInfo, role: text })
          }
        />
      </View>
      <View style={{ width: "100%" }}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={[
            styles.input,
            isFocused3 && { borderWidth: 2, borderColor: "#FF6464" },
          ]}
          onBlur={() => setIsFocused3(false)}
          onFocus={() => setIsFocused3(true)}
          value={contactInfo.number}
          onChangeText={(text) =>
            setContactInfo({ ...contactInfo, number: text })
          }
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
        <Text style={styles.addButtonText}>Add Contact</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#eee",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "400",
    marginTop: 10,
    color: "#FF6464",
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderRadius: 15,
    shadowColor: "#000000",
    shadowOffset: {width: 8, height: 8},
    shadowOpacity: 1, 
    shadowRadius: 0,
    elevation: 16,
    backgroundColor: "#fff",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  addButton: {
    marginBottom: 25,
    width: "100%",
    padding: 15,
    alignItems: "center",
    backgroundColor: "#FF6464",
    borderRadius: 15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowColor: "#000",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AddContactScreen;
