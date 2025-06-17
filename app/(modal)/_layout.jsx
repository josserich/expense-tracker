import { Stack } from "expo-router";

const ModalLayout = () => {
  return (
    <Stack
      screenOptions={{
        presentation: "modal",
        headerTitleStyle: {
          fontFamily: "MontserratBold",
        },
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#1F41BB",
        },
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="createcashin"
        options={{
          headerTitle: "Cash In",
        }}
      />
      <Stack.Screen
        name="createcashout"
        options={{
          headerTitle: "Cash Out",
        }}
      />
      <Stack.Screen
        name="resetpassword"
        options={{
          headerTitle: "Reset Password",
        }}
      />
    </Stack>
  );
};

export default ModalLayout;
