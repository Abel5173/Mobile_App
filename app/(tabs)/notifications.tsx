import { Pressable, StyleSheet, Text, ToastAndroid, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { ReportContext } from "../../context/Report/ReportContexProvider";
import { ReportContextType } from "../../Utils/type";
import { router } from "expo-router";
import { useFetchReport } from "../../api/fetchReport";

const tips = () => {
  const [emergencyLocation, setEmergencyLocation] = useState({
    latitude: 8.21391,
    longitude: 37.80249,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const reports = useFetchReport(); 

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={emergencyLocation}
        onRegionChangeComplete={(region) => setEmergencyLocation(region)}
        provider={PROVIDER_GOOGLE}
      >
        {reports.map((report) => (
          <Marker
            key={report.id}
            coordinate={{
              latitude: report.location.latitude,
              longitude: report.location.longitude,
            }}
            title={report.description}
          />
        ))}
      </MapView>
    </View>
  );
};
export default tips;

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
