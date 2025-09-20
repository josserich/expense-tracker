import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { router } from "expo-router";
import { removeStorage } from "../../utils";
import { AllContext } from "../../context/AllProvider";

const BtnLogout = () => {
  const { isKeyboardVisible, setCashSuccess } = useContext(AllContext);
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    setCashSuccess("");
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
