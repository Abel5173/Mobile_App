import { Stack } from "expo-router";
import index from ".";
import ReportContextProvider from "../context/Report/ReportContexProvider";
import UserContextProvider from "../context/Report/UserContextProvider";
import * as Notifications from "expo-notifications";


const StackLayout = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
  return (
    <UserContextProvider>
      <ReportContextProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        ></Stack>
      </ReportContextProvider>
    </UserContextProvider>
  );
};

export default StackLayout;
