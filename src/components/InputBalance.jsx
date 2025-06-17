import { View, Text, TextInput } from "react-native";
import React from "react";
import { formatCurrency } from "../utils";

const InputBalance = (props) => {
  const {
    title = "balance",
    color = "#000000",
    req,
    setReq,
    field,
    ...rest
  } = props;
  const handleChange = (txt) => {
    setReq((prev) => ({
      ...prev,
      [field]: formatCurrency(txt),
    }));
  };
  return (
    <View className="mb-5">
      <Text className={`text-2xl font-montserratbold mb-2`} style={{ color }}>
        {title}
      </Text>
      <TextInput
        className={`bg-white font-montserratbold rounded-lg px-3 border focus:border-2 capitalize`}
        style={{ color, borderColor: color }}
        placeholderTextColor={`${color}`}
        onChangeText={(txt) => handleChange(txt)}
        value={req.balance}
        {...rest}
      />
    </View>
  );
};

export default InputBalance;
