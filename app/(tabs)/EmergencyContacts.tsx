import { ContactItem } from "../../Utils/type";
import React, { useEffect, useState } from "react";
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
import { getAuth } from "firebase/auth";
import { doc, getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";

const Tab = createBottomTabNavigator();
type ContactItems = {
  id: number;
  name: string;
  role: string;
  number: string;
};

const emergencyContacts: ContactItems[] = [
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
  const [contacts, setContacts] = useState<ContactItem[]>([]);

    useEffect(() => {
      const fetchContacts = async () => {
        const user = getAuth().currentUser;

        if (user) {
          const docRef = doc(db, "users", user.uid); 
          const snapshot = await getDocs(collection(docRef, "contacts"));
          const fetchedContacts: ContactItem[] = snapshot.docs.map(
            (doc) =>
              ({
                id: doc.id,
                ...doc.data(), // Extract data from document
              } as ContactItem)
          );
console.log(fetchedContacts);

          setContacts((prevContacts) => [...prevContacts, ...fetchedContacts]); // Merge fetched contacts with previous contacts
        } else {
          console.warn("User not signed in");
        }
      };

      fetchContacts();
    }, []);

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
          data={[...emergencyContacts, ...contacts]} // Merge static and fetched contacts
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
