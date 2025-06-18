import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { removeStorage } from "../../utils";

const BtnLogout = () => {
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    try {
      await removeStorage("auth");
      router.push("/");
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableOpacity
      className="ps-8 py-2"
      onPress={handleLogout}
      disabled={loading}
    >
      <Text className="font-montserratbold text-red-500 tracking-wider text-lg">
        Logout
      </Text>
    </TouchableOpacity>
  );
};

export default BtnLogout;
