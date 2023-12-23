import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { Stack } from 'expo-router'

export class _layout extends Component {
  render() {
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
      </Stack>
    );
  }
}

export default _layout