import { Stack } from "expo-router";
import index from ".";
import ReportContextProvider from "../context/Report/ReportContexProvider";
import UserContextProvider from "../context/Report/UserContextProvider";

const StackLayout = () => {
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
