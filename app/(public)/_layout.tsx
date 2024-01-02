import { Text, View } from "react-native";
import React, { Component } from "react";
import { Stack, useGlobalSearchParams } from "expo-router";
import { useFetchTip } from "../../api/fetchTip";
import { SafetyTip } from "../../Utils/type";

function _layout() {
  const { tipId } = useGlobalSearchParams();
  if (typeof tipId === "string") {
    // const t = safetyTip?.title;
  } else if (Array.isArray(tipId)) {
    console.log(tipId[0]);
  } else {
    console.log(tipId);
  }
  return (
    <Stack>
      <Stack.Screen
        name="AddContactScreen"
        options={{
          headerTitleAlign: "center",
          title: "Add Contact",
          headerStyle: { backgroundColor: "#FF6464" },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="mapview"
        options={{
          headerTitleAlign: "center",
          title: "Where is the emergency?",
          headerStyle: { backgroundColor: "#FF6464" },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="SignUp"
        options={{
          headerTitleAlign: "center",
          title: "Sign Up",
          headerStyle: { backgroundColor: "#FF6464" },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="[SaftyTips]"
        options={{
          headerTitleAlign: "center",
          title: "Safety Tips",
          headerStyle: { backgroundColor: "#FF6464" },
          headerTintColor: "#fff",
        }}
      />
    </Stack>
  );
}

export default _layout;
