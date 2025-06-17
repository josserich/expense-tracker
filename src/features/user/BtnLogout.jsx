import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const BtnLogout = () => {
  const handleLogout = () => {
    router.push("/");
  };
  return (
    <TouchableOpacity className="ps-8 py-2" onPress={handleLogout}>
      <Text className="font-montserratbold text-red-500 tracking-wider text-lg">
        Logout
      </Text>
    </TouchableOpacity>
  );
};

export default BtnLogout;
