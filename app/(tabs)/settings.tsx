import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { Component, useContext, useEffect, useState } from "react";
import { IUser, IUserContext } from "../../Utils/type";
import { UserContext } from "../../context/Report/UserContextProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { getAuth, updateEmail } from "firebase/auth";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

const Settings = () => {
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<IUser>({
    id: "",
    name: "",
    email: "",
    date: "",
    password: "",
    phoneNumber: "",
  });
  const { setUser: setContextUser } = useContext(UserContext) as IUserContext;

  const currentUser = getAuth().currentUser;

  useEffect(() => {
    const getUser = async () => {

      try {
        if (currentUser) {
          const q = query(
            collection(db, "users"),
            where("uid", "==", currentUser.uid)
          );
          const querySnapshot = await getDocs(q);
          const userData = querySnapshot.docs[0].data();
          setEditedUser(userData as IUser);
          console.log(userData.date);
        } else {
          console.warn("User not signed in");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getUser();
    console.log(editedUser);
  }, [currentUser]);

  const handleEditProfile = () => {

    setEditing(true);
  };

  const handleUpdateProfile = async () => {
    try {
      if (editedUser && currentUser) {
        const q = query(
          collection(db, "users"),
          where("uid", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const id = querySnapshot.docs[0].id;
        const docRef = doc(db, "users", id);
        await updateDoc(docRef, {
          name: editedUser.name,
          email: editedUser.email,
          phoneNumber: editedUser.phoneNumber,
        });
        console.log("Profile updated successfully");
        setEditing(false);
        setContextUser(editedUser); // Update context
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleChange = (key: keyof IUser, value: string) => {
    setEditedUser({ ...editedUser, [key]: value });
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("authToken");
    router.push("/LoginScreen");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          style={styles.userImg}
          source={require("../../assets/profile.png")}
        />
        <View style={styles.btn}>
          {editing ? (
            <View style={styles.inputFieldContainer}>
              <TextInput
                style={styles.inputField}
                value={editedUser.name}
                onChangeText={(text) => handleChange("name", text)}
              />
              <TextInput
                style={styles.inputField}
                value={editedUser.phoneNumber}
                onChangeText={(text) => handleChange("phoneNumber", text)}
              />
              <TouchableOpacity
                style={styles.updateButton}
                onPress={handleUpdateProfile}
              >
                <Text style={styles.updateText}>Update</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <TouchableOpacity
                style={styles.editButton}
                onPress={handleEditProfile}
              >
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.editButton}
                onPress={handleLogout}
              >
                <Text style={styles.editText}>Logout</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        {!editing && ( 
          <View style={styles.userInfoContainer}>
            <Text style={styles.userInfoText}>Name: {editedUser.name}</Text>
            <Text style={styles.userInfoText}>Email: {editedUser.email}</Text>
            <Text style={styles.userInfoText}>
              Phone Number: {editedUser.phoneNumber}
            </Text>
            <Text style={styles.userInfoText}>
              Date of birth: {editedUser.date}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  userInfoContainer: {
    width: "80%",
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    shadowRadius: 4,
    elevation: 5,
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#ff6464",
  },
  btn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    width: "80%",
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
    marginTop: 50,
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: "#ff6464",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  editText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputFieldContainer: {
    width: "100%",
  },
  inputField: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 10,
    paddingHorizontal: 10,
  },

  updateButton: {
    backgroundColor: "#ff6464",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  updateText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
