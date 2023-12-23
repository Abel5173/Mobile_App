import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, NavigationProp, useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { MotiView } from "moti";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Button,
  Pressable,
} from "react-native";
import { Easing } from "react-native-reanimated";

const Start = () => {
  useEffect(() => {
    checkAuthToken();
  }, []);
  const [loggedIn, setLoggedIn] = useState(false);

  const checkAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    } catch (error: any) {
      console.error(error);
    }
    if (loggedIn) {
    }
  };

  const onPressed = () => {
    router.push("/LoginScreen");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={styles.container}>
          {[...Array(5).keys()].map((index) => {
            return (
              <MotiView
                from={{ opacity: 1, scale: 2 }}
                animate={{ opacity: 0, scale: 6 }}
                transition={{
                  type: "timing",
                  duration: 1500,
                  easing: Easing.out(Easing.ease),
                  loop: true,
                  delay: index * 400,
                  repeatReverse: false,
                }}
                key={index}
                style={[StyleSheet.absoluteFillObject, styles.container]}
              />
            );
          })}
          <Text style={styles.wave}>SOS</Text>
        </View>
      </View>
      {/* <Link replace href="/(tabs)/report" asChild> */}
      <Pressable style={styles.button} onPress={onPressed}>
        <Text style={styles.text}>Get Started</Text>
      </Pressable>
      {/* </Link> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FF6464",
  },
  wave: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    margin: 10,
  },
  button: {
    marginBottom: 25,
    width: 250,
    padding: 15,
    alignItems: "center",
    backgroundColor: "#FF6464",
    borderRadius: 15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowColor: "#000",
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Start;
