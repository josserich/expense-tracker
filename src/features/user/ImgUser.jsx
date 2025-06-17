import { View, Text, Image } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Josse } from "../../assets";

const ImgUser = () => {
  const { top } = useSafeAreaInsets();
  return (
    <View
      className="p-5 bg-[#1F41BB] items-center"
      style={{ paddingVertical: top }}
    >
      <Image
        source={Josse}
        style={{ height: 220, width: 220, borderRadius: 100 }}
      />
    </View>
  );
};

export default ImgUser;
