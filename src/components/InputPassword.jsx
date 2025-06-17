import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";

const InputPassword = (props) => {
  const {
    title = "Password :",
    color = "#00000",
    setReq,
    field = "password",
  } = props;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleChange = (field, txt) => {
    console.log(field, txt);
    setReq((prev) => ({
      ...prev,
      [field]: txt,
    }));
  };
  return (
    <View className="mb-3">
      <Text className="text-2xl font-montserratbold mb-2" style={{ color }}>
        {title}
      </Text>
      <View
        className="flex flex-row justify-between items-center mb-4 px-3 rounded-lg border"
        style={{ borderColor: color }}
      >
        <TextInput
          style={{ color }}
          secureTextEntry={passwordVisible ? false : true}
          className="font-montserratbold tracking-widest rounded-md w-[90%]"
          placeholder={passwordVisible ? "ex : password" : "******"}
          placeholderTextColor={color}
          onChangeText={(txt) => handleChange(field, txt)}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Entypo
            name={passwordVisible ? "eye" : "eye-with-line"}
            size={25}
            color={color}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InputPassword;
