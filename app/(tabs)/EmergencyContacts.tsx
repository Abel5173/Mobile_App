import React, { useEffect, useState } from "react";
import { Animated, Easing } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useFetchContacts } from "../../api/fetchContacts";
import { View, Text, FlatList, TouchableOpacity, Linking } from "react-native";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Color } from "../../constants/color";
import { ContactItems } from "../../Utils/type";

const EmergencyContactsScreen = () => {
  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000, // Adjust the duration as needed
      useNativeDriver: true,
    }).start(); // Start the animation
  }, []); // Empty dependency array ensures the effect runs once on component mount

  const emergencyContacts: ContactItems[] = [
    {
      id: 1,
      name: "Campus Security",
      number: "123-456-7890",
      role: "Security Office",
      icon: (
        <MaterialCommunityIcons
          name="police-badge"
          size={24}
          color={Color.primary}
        />
      ),
    },
    {
      id: 2,
      name: "Campus Medical Center",
      number: "962807299",
      role: "Medical Services",
      icon: <Fontisto name="ambulance" size={24} color={Color.primary} />,
    },
    {
      id: 3,
      name: "Campus Student Union",
      number: "962807299",
      role: "Student Services",
      icon: (
        <MaterialCommunityIcons
          name="office-building"
          size={24}
          color={Color.primary}
        />
      ),
    },
  ];
  const [animation] = useState(new Animated.Value(0));
  const contacts = useFetchContacts();

  const callContact = (number: string) => {
    Linking.openURL(`tel:${number}`);
  };

  const renderContact = ({
    item,
    index,
  }: {
    item: ContactItems;
    index: number;
  }) => (
    <Animated.View
      style={{
        transform: [
          {
            translateX: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [600, 0],
            }),
          },
        ],
      }}
    >
      <TouchableOpacity onPress={() => callContact(item.number)}>
        <View style={styles.contactContainer}>
          {React.isValidElement(item.icon) ? (
            <View style={styles.iconContainer}>{item.icon}</View>
          ) : (
            <View style={styles.iconContainer}>
              <FontAwesome
                name="user-circle-o"
                size={24}
                color={Color.primary}
              />
            </View>
          )}
          <View style={styles.contactDetails}>
            <Text style={styles.contactName}>{item.name}</Text>
            <Text style={styles.contactRole}>{item.role}</Text>
            <Text style={styles.contactRole}>+251{item.number}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
  const renderContactItem = ({
    item,
    index,
  }: {
    item: ContactItems;
    index: number;
  }) => (
    <Animated.View
      style={{
        transform: [
          {
            translateX: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [600, 0],
            }),
          },
        ],
      }}
    >
      <TouchableOpacity onPress={() => callContact(item.number)}>
        <View style={styles.contactContainer}>
          {React.isValidElement(item.icon) ? (
            <View style={styles.iconContainer}>{item.icon}</View>
          ) : (
            <View style={styles.iconContainer}>
              {/* <MaterialIcons name="perm-contact-cal" size={24} color="black" /> */}
            </View>
          )}
          <View style={styles.contactDetails}>
            <Text style={styles.contactName}>{item.name}</Text>
            <Text style={styles.contactRole}>{item.role}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const allContacts = [...emergencyContacts, ...contacts];
  // console.log(allContacts);

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={allContacts}
          renderItem={renderContact}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : `item-${index}`
          }
        />

        <View style={styles.addButtonContainer}>
          <TouchableOpacity
            onPress={() => router.push("/(public)/AddContactScreen")}
            style={styles.fab}
          >
            <Text style={{ color: "#fff", fontSize: 38 }}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  contactContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  iconContainer: {
    marginRight: 10,
    width: 40,
  },
  contactDetails: {
    flex: 1,
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
  fab: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: "#FF6464",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default EmergencyContactsScreen;
