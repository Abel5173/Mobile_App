import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import React, { useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useFetchReport } from "../../api/fetchReport";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { Color } from "../../constants/color";

const tips = () => {
  const [emergencyLocation, setEmergencyLocation] = useState({
    latitude: 8.21391,
    longitude: 37.80249,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const reports = useFetchReport(); 
const getMarkerIcon = (reportType: string | null) => {
  switch (reportType) {
    case "Fire":
      return require("../../assets/fire.png");
    case "Security":
      return require("../../assets/Security.png");
    case "Medic":
      return require("../../assets/Medic.png");

    case "Disasters":
      return require("../../assets/disaster.png");
    case "Other":
      return require("../../assets/sos.png");
    default:
      return require("../../assets/sos.png");
  }
};

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
            title={report.reportType || undefined}
            description={report.description}
            icon={getMarkerIcon(report.reportType)}
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
