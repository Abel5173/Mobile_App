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
  ImageBackground,
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
  const image = { uri: "../../assets/map.png" };
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
        const dataReport = {
          reportType: data[selectedItem].lable,
          date: new Date().toDateString(),
          description: contactInfo,
          location: region,
        };
        const userRef = await addDoc(
          collection(db, "emergency_report"),
          dataReport
        );
        setSelectedItem(null); 
        setContactInfo(""); 
        console.log("Emergency added with ID: ", dataReport.reportType);
        router.push("/EmergencyContacts");
      } catch (error: any) {
        console.error("Error adding user: ", error);
      }
    }
  };

  useEffect(() => {
setEmergencyLocation({
  latitude: 8.21391,
  longitude: 37.80249,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
});
  }, [])

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
      <Text style={styles.text}>What Kind of Emergency?</Text>
      <View style={styles.icons}>
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
          isFocused3 && {
            borderWidth: 2,
            borderColor: "#FF6464",
          },
        ]}
        onBlur={() => setIsFocused3(false)}
        onFocus={() => setIsFocused3(true)}
        placeholder="What's the emergency?"
        onChangeText={(text) => setContactInfo(text)}
        value={contactInfo}
      />
      <View style={styles.mapContainer}>
        <Pressable onPress={() => router.push("/(public)/mapview")}>
          {/* <ImageBackground
            style={styles.mapContainer}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/campus-emergency-app-2a6c0.appspot.com/o/map.jpg?alt=media&token=887fd679-250a-4db2-bca8-539cbde6efd7",
            }}
          >
          </ImageBackground> */}
          <MapView
            initialRegion={emergencyLocation || undefined}
            style={styles.mapContainer}
          >
            <Text style={styles.map}>Click here to set the location</Text>
          </MapView>
        </Pressable>
      </View>
      <View>
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
    flex: 1,
    justifyContent: "space-between",
  },
  mapContainer: {
    height: 305,
    opacity: 0.75,
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
    borderColor: "gray",
    borderRadius: 5,
    elevation: 1,
    backgroundColor: "#fff",
    margin: 5,
    paddingHorizontal: 10,
  },
  label: {
    color: Color.primary,
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
  },
  icons: {
    width: "100%",
    // height: "35%",
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
    color: Color.primary,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
  },
  button: {
    width: "100%",
    padding: 15,
    alignItems: "center",
    backgroundColor: "#FF6464",
  },
});
