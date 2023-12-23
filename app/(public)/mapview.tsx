import { Pressable, StyleSheet, Text, ToastAndroid, View } from "react-native";
import React, { useContext, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { ReportContext } from "../../context/Report/ReportContexProvider";
import { ReportContextType } from "../../Utils/type";
import { router } from "expo-router";

const ReportMapView = () => {
  const [emergencyLocation, setEmergencyLocation] = useState({
    latitude: 8.21391,
    longitude: 37.80249,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const {report, setReport} = useContext(ReportContext) as ReportContextType;
  const setLocation = () => {
    setReport({
      ...report,
      location: emergencyLocation,
    });
    ToastAndroid.show("Location Set", ToastAndroid.SHORT)
    router.push("/(tabs)/report");
    console.log(report);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        onRegionChangeComplete={(region) => setEmergencyLocation(region)}
        provider={PROVIDER_GOOGLE}
        initialRegion={emergencyLocation}
      >
        {emergencyLocation !== undefined && (
          <Marker coordinate={emergencyLocation} />
        )}
      </MapView>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={setLocation}>
          <Text style={styles.text}>Set Emergency Location</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ReportMapView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 10,
    width: "85%",
    alignSelf: "center",
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
