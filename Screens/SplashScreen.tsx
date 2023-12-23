import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Splash from "../assets/Log.png";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const BGColor = "#F78CA2";
type NavigationType = NavigationProp<RootStackParamList>;

export default function SplashScreen() {
  const navigation = useNavigation<NavigationType>();
  const edges = useSafeAreaInsets();
  const startAnimation = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(1)).current;
  const scaleLogo = useRef(new Animated.Value(1)).current;
  const scaleTitle = useRef(new Animated.Value(1)).current;
  const moveLogo = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const moveTitle = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const contentTransition = useRef(
    new Animated.Value(Dimensions.get("window").height)
  ).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(startAnimation, {
          toValue: -Dimensions.get("window").height + edges.top + 65,
          useNativeDriver: true,
        }),
        Animated.timing(scaleLogo, {
          toValue: 0.3,
          useNativeDriver: true,
        }),
        Animated.timing(scaleTitle, {
          toValue: 0.8,
          useNativeDriver: true,
        }),
        Animated.timing(moveLogo, {
          toValue: {
            x: Dimensions.get("window").width / 2 - 35,
            y: Dimensions.get("window").height / 2 - 5,
          },
          useNativeDriver: true,
        }),
        Animated.timing(moveTitle, {
          toValue: {
            x: 0,
            y: Dimensions.get("window").height / 2 - 90,
          },
          useNativeDriver: true,
        }),
        Animated.timing(contentTransition, {
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          // Added opacity animation
          toValue: 0, // Fade out the logo
          useNativeDriver: true,
        }),
      ]).start(() => {
        navigation.navigate("Start");
      });
    }, 500);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: BGColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View
        style={{
          alignItems: "center",
          transform: [{ translateY: startAnimation }],
        }}
      >
        <Animated.Image
          source={Splash}
          style={{
            width: 100,
            height: 100,
            marginBottom: 20,
            transform: [
              { translateX: moveLogo.x },
              { translateY: moveLogo.y },
              { scale: scaleLogo },
            ],
            opacity: logoOpacity, // Added opacity style
          }}
        ></Animated.Image>

        <Animated.Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            color: "white",
            transform: [{ translateY: moveTitle.y }, { scale: scaleTitle }],
          }}
        >
          {"Emergency App"}
        </Animated.Text>
      </Animated.View>
    </View>
  );
}
