import React, { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { login } from "../api/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { IUserContext } from "../Utils/type";
import { UserContext } from "../context/Report/UserContextProvider";

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<Boolean>(false);

  const handleLogin = async () => {
    setLoading(true);

    const isEmailValid = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!email || !isEmailValid(email)) {
      alert("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (!password || password.length < 6) {
      alert("Please enter a password with at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      const token: any = await login(email, password);
      if (token != null) {
        await AsyncStorage.setItem("authToken", token);
        router.push("/(tabs)/EmergencyContacts");
      } else {
        alert("Sign in failed. Check your email or password and try again.");
        // Clear input fields on failed sign-in attempt
        setEmail("");
        setPassword("");
      }
    } catch (error: any) {
      // Clear input fields on error
      setEmail("");
      setPassword("");
      // Handle the error if necessary (e.g., display an error message)
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    console.log("Sign Up");
    router.push("/(public)/SignUp");
  };
  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <Text style={styles.banner}>SOS</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.textLink}>Don't have an Account? </Text>
          <Text
            onPress={() => {
              setLoading(true);
              handleSignUp();
            }}
            style={styles.link}
          >
            Signup
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    borderColor: "#FF6464",
    borderWidth: 2,
    color: "#000",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  button: {
    backgroundColor: "#FF6464",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: "#fff",
    marginTop: 5,
    borderWidth: 2,
    borderColor: "#0782f9",
  },
  buttonOutlineText: {
    color: "#0782f9",
    fontWeight: "700",
    fontSize: 16,
  },
  banner: {
    color: "#FF6464",
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 30,
  },
  link: {
    color: "#FF6464",
    fontWeight: "400",
    marginTop: 10,
  },
  textLink: {
    color: "#919191",
    fontWeight: "400",
    marginTop: 10,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
});
