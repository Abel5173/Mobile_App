import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./Screens/LoginScreen";
import EmergencyContacts from "./Screens/EmergencyContacts";
import AddContactScreen from "./Screens/AddContactScreen";
import { useState} from "react";
import SplashScreen from "./Screens/SplashScreen";
import { onAuthStateChanged } from "firebase/auth";

const Stack = createNativeStackNavigator();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          options={{
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#4D4A95",
            },
            headerTintColor: "#fff",
          }}
          name="Welcome"
          component={SplashScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        
        <Stack.Screen
          name="Emergency Contacts"
          component={EmergencyContacts}
          options={{
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#4D4A95",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen name="AddContactScreen" component={AddContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
