import { Tabs } from "expo-router"
import { Feather } from '@expo/vector-icons';
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
export default () => {
    
    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FF6464",
          tabBarInactiveTintColor: "#000",
        }}
      >
        <Tabs.Screen
          name="EmergencyContacts"
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="contacts" size={18} color={color} />
            ),
            title: "Contacts",
            headerTitleAlign: "center",
            headerTitle: "Emergency Contacts",
            headerStyle: { backgroundColor: "#FF6464" },
            headerTintColor: "#fff",
          }}
        />
        <Tabs.Screen
          name="report"
          options={{
            headerTitleAllowFontScaling: true,
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="report-problem" size={24} color={color} />
            ),
            title: "Report",
            headerTitleAlign: "center",
            headerTitle: "REPORT",
            headerStyle: { backgroundColor: "#FF6464" },
            headerTintColor: "#fff",
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="notification" size={18} color={color} />
            ),
            tabBarBadge: 3,
            title: "Notifications",
            headerTitleAlign: "center",
            headerTitle: "Settings",
            headerStyle: { backgroundColor: "#FF6464" },
            headerTintColor: "#fff",
          }}
        />
        <Tabs.Screen
          name="tips"
          options={{
            tabBarIcon: ({ color }) => (
              <Foundation name="lightbulb" size={24} color={color} />
            ),
            title: "Tips",
            headerTitleAlign: "center",
            headerTitle: "Settings",
            headerStyle: { backgroundColor: "#FF6464" },
            headerTintColor: "#fff",
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="settings" size={18} color={color} />
            ),
            title: "Settings",
            headerTitleAlign: "center",
            headerTitle: "Settings",
            headerStyle: { backgroundColor: "#FF6464" },
            headerTintColor: "#fff",
          }}
        />
      </Tabs>
    );
}
