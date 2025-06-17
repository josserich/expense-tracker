import { View, Text, TextInput } from "react-native";
import React from "react";

const InputTxtMulti = (props) => {
  const {
    title = "More Information",
    color = "#000000",
    req,
    setReq,
    field,
    ...rest
  } = props;
  const handleChange = (field, txt) => {
    setReq((prev) => ({
      ...prev,
      [field]: txt,
    }));
  };
  return (
    <View className="mb-5">
      <Text className={`text-2xl font-montserratbold mb-2`} style={{ color }}>
        {title}
      </Text>
      <TextInput
        multiline={true}
        numberOfLines={15}
        style={{
          height: 180,
          textAlignVertical: "top",
          color,
          borderColor: color,
        }}
        className={`font-montserratbold rounded-lg px-3 border focus:border-2 bg-white`}
        onChangeText={(txt) => handleChange(field, txt)}
        placeholderTextColor={`${color}`}
        {...rest}
      />
    </View>
  );
};

export default InputTxtMulti;
