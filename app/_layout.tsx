import { Stack } from "expo-router";
import index from ".";
import ReportContextProvider from "../context/Report/ReportContexProvider";

const StackLayout = () => {
  return (
    <ReportContextProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
      </Stack>
    </ReportContextProvider>
  );
};

export default StackLayout;
