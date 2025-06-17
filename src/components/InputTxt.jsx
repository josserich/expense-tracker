import React from "react";
import { View, Text, TextInput } from "react-native";

const InputTxt = (props) => {
  const {
    title = "Name",
    color = "#000000",
    field,
    req,
    setReq,
    ...rest
  } = props;
  const handleChange = (field, val) => {
    setReq((prev) => ({
      ...prev,
      [field]: val,
    }));
  };
  return (
    <View className="mb-5">
      <Text className="text-2xl font-montserratbold mb-2" style={{ color }}>
        {title}
      </Text>
      <TextInput
        className={`bg-white font-montserratbold rounded-lg px-3 border focus:border-2 ${
          field !== "userName" && "capitalize"
        }}`}
        style={{ color, borderColor: color }}
        placeholderTextColor={color}
        onChangeText={(txt) => handleChange(field, txt)}
        {...rest}
      />
    </View>
  );
};

export default InputTxt;
