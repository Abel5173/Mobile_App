import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  AddContact: undefined;
};

type AddContactScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AddContact"
>;

type Props = {
  navigation: AddContactScreenNavigationProp;
};

const AddContactScreen = ({ navigation }: Props) => {
  const [contactInfo, setContactInfo] = useState({
    name: "",
    role: "",
    number: "",
  });

  const handleAddContact = () => {
    console.log("Contact Added:", contactInfo);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={contactInfo.name}
        onChangeText={(text) => setContactInfo({ ...contactInfo, name: text })}
      />

      <Text style={styles.label}>Role</Text>
      <TextInput
        style={styles.input}
        value={contactInfo.role}
        onChangeText={(text) => setContactInfo({ ...contactInfo, role: text })}
      />

      <Text style={styles.label}>Number</Text>
      <TextInput
        style={styles.input}
        value={contactInfo.number}
        onChangeText={(text) =>
          setContactInfo({ ...contactInfo, number: text })
        }
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
        <Text style={styles.addButtonText}>Add Contact</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: "#4D4A95",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
};

export default AddContactScreen;
