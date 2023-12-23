import {
  useNavigation,
  NavigationProp,
  NavigationContainer,
} from "@react-navigation/native";
import React from "react";
import AddContactScreen from "../(public)/AddContactScreen";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
  Button,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { router } from "expo-router";
import { StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();
type ContactItem = {
  id: number;
  name: string;
  role: string;
  number: string;
};

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
    <>
      <View style={styles.container}>
        <FlatList
          data={emergencyContacts}
          renderItem={renderContactItem}
          keyExtractor={(item) => item.id.toString()}
        />
        <View style={styles.addButtonContainer}>
          <TouchableOpacity
            onPress={() => router.push("/(public)/AddContactScreen")}
          >
            <Text style={{ color: "#fff", fontSize: 38 }}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles =StyleSheet.create({
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
    color: "#FF6464",
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
    backgroundColor: "#FF6464",
    justifyContent: "center",
    alignItems: "center",
    bottom: 20,
    right: 20,
  },
});

export default EmergencyContactsScreen;
