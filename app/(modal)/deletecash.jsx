import React from "react";
import { View, Text } from "react-native";
import { DeleteCash } from "../../src/features/cash";

const ModalDeleteCash = () => {
  return (
    <View className="flex-1">
      <DeleteCash />
    </View>
  );
};

export default ModalDeleteCash;
