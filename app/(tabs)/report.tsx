import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TextInput,
  Pressable,
  GestureResponderEvent,
  ToastAndroid,
  KeyboardAvoidingView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Color } from "../../constants/color";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { ReportContext } from "../../context/Report/ReportContexProvider";
import { IReport, ReportContextType } from "../../Utils/type";
import { router } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../../firebase";

function report() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handlePress = (index: any) => {
    setSelectedItem(index);
  };

  const { report, setReport } = useContext(ReportContext) as ReportContextType;

  const [isFocused3, setIsFocused3] = useState(false);
  const [contactInfo, setContactInfo] = useState("");
  const [emergencyLocation, setEmergencyLocation] = useState<Region | null>(
    null
  );

  const handleMap = () => {
    router.push("../(public)/mapview)");
  };

  const handleSubmit = async () => {
    if (selectedItem === null) {
      ToastAndroid.show("What is the Emergency?", ToastAndroid.SHORT);
    } else if (contactInfo === null || contactInfo === "") {
      ToastAndroid.show("Please Provide a description", ToastAndroid.SHORT);
    } else if (report.location === null) {
      ToastAndroid.show("Emergency Location Is Not Set", ToastAndroid.SHORT);
    } else {
      setReport({
        ...report,
        reportType: selectedItem,
        date: new Date().toDateString(),
        description: contactInfo,
      });
      const region = {
        latitude: report.location.latitude,
        longitude: report.location.longitude,
      };
      try {
        const data = {
          reportType: selectedItem,
          date: new Date().toDateString(),
          description: contactInfo,
          location: region,
        };
        const userRef = await addDoc(collection(db, "emergency_report"), data);
        console.log("Emergency added with ID: ", userRef.id);
        router.push("/EmergencyContacts");
      } catch (error: any) {
        console.error("Error adding user: ", error);
      }
    }
  };

  const data = [
    {
      lable: "Fire",
      icon: <SimpleLineIcons name="fire" size={32} color={Color.primary} />,
    },
    {
      lable: "Security",
      icon: (
        <MaterialCommunityIcons
          name="police-badge-outline"
          size={32}
          color={Color.primary}
        />
      ),
    },
    {
      lable: "Medic",
      icon: (
        <FontAwesome5
          name="briefcase-medical"
          size={32}
          color={Color.primary}
        />
      ),
    },

    {
      lable: "Disasters",
      icon: (
        <FontAwesome5 name="house-damage" size={32} color={Color.primary} />
      ),
    },
    {
      lable: "Other",
      icon: (
        <MaterialCommunityIcons
          name="crosshairs-question"
          size={32}
          color={Color.primary}
        />
      ),
    },
  ];
  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <Text style={[styles.text, { width: "100%", height: "5%" }]}>
        What Kind of Emergency?
      </Text>
      <View style={[styles.icons, { width: "100%", height: "25%" }]}>
        {data.map((item, index) => (
          <View style={styles.iconContainer} key={index}>
            <TouchableOpacity
              key={index}
              onPress={() => handlePress(index)}
              style={[
                styles.icon,
                selectedItem === index && { backgroundColor: "#FF6464" },
              ]}
            >
              {React.cloneElement(item.icon, {
                color: selectedItem === index ? "#fff" : Color.primary,
              })}
            </TouchableOpacity>
            <Text style={[styles.label]}>{item.lable}</Text>
          </View>
        ))}
      </View>
      <TextInput
        style={[
          styles.input,
          { width: "95%", height: "10%", alignSelf: "center" },
          isFocused3 && {
            borderWidth: 2,
            borderColor: "#FF6464",
            width: "90%",
            height: "10%",
          },
        ]}
        onBlur={() => setIsFocused3(false)}
        onFocus={() => setIsFocused3(true)}
        placeholder="What's the emergency?"
        onChangeText={(text) => setContactInfo(text)}
      />
      <View style={{ width: "100%", height: "60%" }}>
        <Pressable onPress={() => router.push("/(public)/mapview")}>
          <MapView
            style={styles.map}
            onRegionChangeComplete={(region) => setEmergencyLocation(region)}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: 8.21391,
              longitude: 37.80249,
              latitudeDelta: 0.033222,
              longitudeDelta: 0.012143,
            }}
          />
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: Color.primary,
                fontSize: 20,
              }}
            >
              Click to set the location
            </Text>
          </View>
        </Pressable>
      </View>
      <View
        style={[
          {
            width: "85%",
            position: "absolute",
            bottom: 10,
            alignSelf: "center",
          },
        ]}
      >
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.setmap}>Report Emergency</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

export default report;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  text: {
    color: Color.primary,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
  },
  setmap: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    height: 60,
    width: "100%",
    borderColor: "gray",
    borderRadius: 15,
    shadowColor: "#000000",
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 16,
    backgroundColor: "#fff",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  label: {
    color: Color.primary,
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
  },
  icons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginTop: 5,
  },
  icon: {
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 50,
    marginTop: 2,
    paddingVertical: 8,
  },
  iconContainer: {
    alignItems: "center",
    flexBasis: "33.33%",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  button: {
    marginBottom: 25,
    width: "100%",
    padding: 15,
    alignItems: "center",
    backgroundColor: "#FF6464",
    borderRadius: 50,
  },
});
