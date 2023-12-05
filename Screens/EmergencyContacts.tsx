import { useNavigation } from "@react-navigation/native";
import React from "react";
import AddContactScreen from "./AddContactScreen";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
  Button,
} from "react-native";

type ContactItem = {
  id: number;
  name: string;
  role: string;
  number: string;
};

// Emergency contacts data (sample)
const emergencyContacts: ContactItem[] = [
  {
    id: 1,
    name: "Campus Security",
    number: "123-456-7890",
    role: "Security Office",
  },
  {
    id: 2,
    name: "Campus Medical Center",
    number: "0962807299",
    role: "Medical Services",
  },
  {
    id: 3,
    name: "Campus Student Union",
    number: "0962807299",
    role: "Student Services",
  },
];

const EmergencyContactsScreen = () => {
  const navigation = useNavigation();
  const callContact = (number: string) => {
    Linking.openURL(`tel:${number}`);
  };

  const renderContactItem = ({ item }: { item: ContactItem }) => (
    <TouchableOpacity onPress={() => callContact(item.number)}>
      <View style={styles.contactItem}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactRole}>{item.role}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={emergencyContacts}
        renderItem={renderContactItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddContactScreen")}
        >
          <Text style={{ color: "#fff", fontSize: 38 }}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 20,
  },
  contactItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  contactName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  contactRole: {
    fontSize: 14,
    color: "grey",
  },
  addButtonContainer: {
    position: "absolute",
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: "#4D4A95",
    justifyContent: "center",
    alignItems: "center",
    bottom: 20,
    right: 20,
  },
};

export default EmergencyContactsScreen;
