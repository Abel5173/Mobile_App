import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDOB] = useState(new Date());
  const [date, setDate] = useState(""); // this is the date that will be shown in the text input
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = (event: any, selectedDate: any) => {
    if (event.type === "set") {
      const currentDate = selectedDate || dob;
      setDOB(currentDate);
      if (Platform.OS === "android") {
        toggleDatePicker();
        setDate(currentDate.toDateString());
      }
    } else {
      toggleDatePicker();
    }
  };

  const handleSignup = async () => {
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }
    const deviceToken = await registerForPushNotificationsAsync();
    console.log(deviceToken);

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (response) => {
        const uid = response.user?.uid;
        const data = {
          uid: uid,
          email,
          date,
          name,
          phoneNumber,
          contact: [],
          deviceToken,
        };
        try {
          const userRef = await addDoc(collection(db, "users"), data);
          console.log("User added with ID: ", userRef.id);
          const token = await response.user?.getIdToken();
          await AsyncStorage.setItem("authToken", token);
          router.push("../LoginScreen");
        } catch (error: any) {
          console.error("Error adding user: ", error);
        }
      })
      .catch((error: any) => {
        alert(error);
      });
  };
  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: "778f9c11-f8d6-490b-a6ed-bb7dcb5a530e",
        })
      ).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <KeyboardAvoidingView behavior="height" style={styles.container}>
        <Text style={styles.text}>SignUp Here</Text>
        <View style={styles.content}>
          <Text>Full Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={(newText) => setName(newText)}
            value={name}
            placeholder="Enter name"
          />
        </View>
        <View style={styles.content}>
          <Text>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={(newText) => setEmail(newText)}
            value={email}
            placeholder="Enter Email"
          />
        </View>
        <View style={styles.content}>
          <Text>Date of birth</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter date of birth"
            value={date}
            onChangeText={setDate}
            onFocus={toggleDatePicker}
          />
          {showPicker && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={dob}
              onChange={onChange}
              minimumDate={new Date(1950, 0, 1)}
              maximumDate={new Date(2020, 0, 1)}
            />
          )}
        </View>
        <View style={styles.content}>
          <Text>Phone number</Text>
          <TextInput
            style={styles.input}
            onChangeText={(newText) => setPhoneNumber(newText)}
            value={phoneNumber}
            placeholder="Enter phone number"
          />
        </View>
        <View style={styles.content}>
          <Text>Password</Text>
          <TextInput
            secureTextEntry
            style={styles.input}
            onChangeText={(newText) => setPassword(newText)}
            value={password}
            placeholder="Enter Password"
          />
        </View>
        <View style={styles.content}>
          <Text>Confirm Password</Text>
          <TextInput
            secureTextEntry
            style={styles.input}
            value={confirm}
            placeholder="Confirm Password"
            onChangeText={(newText) => setConfirm(newText)}
          />
        </View>
        <View style={styles.content}>
          <Pressable onPress={handleSignup} style={styles.button}>
            <Text style={styles.textbtn}>Submit</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 10, // Add top padding to the container
  },
  text: {
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center", // Center the text
  },
  content: {
    width: "100%",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    borderColor: "#FF6464",
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
  },
  button: {
    width: "100%",
    padding: 10,
    alignItems: "center",
    backgroundColor: "#FF6464",
    borderRadius: 25,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 15,
  },
  textbtn: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
