import { Tabs, router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { useFetchReport } from "../../api/fetchReport";
import { useState } from "react";

export default () => {
  const [notificationsVisited, setNotificationsVisited] = useState(false);

  const reports = useFetchReport();
  const unreadCount = reports.length;

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
          tabBarBadge: notificationsVisited
            ? undefined
            : unreadCount > 0
            ? unreadCount
            : undefined,
          title: "Notifications",
          headerTitleAlign: "center",
          headerTitle: "Notifications",
          headerStyle: { backgroundColor: "#FF6464" },
          headerTintColor: "#fff",
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            setNotificationsVisited(true);
            router.push("notifications");
          },
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
          headerTitle: "Safety Tips",
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
};
