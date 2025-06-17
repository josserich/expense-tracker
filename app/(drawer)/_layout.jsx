import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import Entypo from "@expo/vector-icons/Entypo";
import { DrawerItemList } from "@react-navigation/drawer";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome6 } from "@expo/vector-icons";
import { BtnLogout, ImgUser } from "../../src/features/user";

function customerDrawerContent(props) {
  return (
    <View>
      <ImgUser />
      <View className="p-3">
        <DrawerItemList {...props} />
      </View>
      <BtnLogout />
    </View>
  );
}
const DrawerLayout = () => {
  return (
    <GestureHandlerRootView>
      <Drawer
        drawerContent={customerDrawerContent}
        screenOptions={{
          headerTitleStyle: {
            fontFamily: "MontserratBold",
          },
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#1F41BB",
          },
          drawerHideStatusBarOnOpen: false,
          drawerActiveBackgroundColor: "#F1F4FF",
          drawerActiveTintColor: "#315EFF",
          drawerLabelStyle: {
            fontFamily: "MontserratBold",
          },
          headerShown: true,
        }}
      >
        <Drawer.Screen
          name="cash"
          options={{
            drawerLabel: "Cash",
            title: "Cash",
            drawerIcon: ({ size, color }) => (
              <Entypo name="wallet" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: "Profile",
            title: "Profile",
            drawerIcon: ({ size, color }) => (
              <FontAwesome6 name="house-user" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};
export default DrawerLayout;
