import { View, Text, Image } from "react-native";
import React, { useContext, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Josse } from "../../assets";
import { AllContext } from "../../context/AllProvider";
import { getUserAPI } from "../../services/user";

const ImgUser = () => {
  const { reqUser, setReqUser } = useContext(AllContext);
  const { top } = useSafeAreaInsets();
  const getUser = async () => {
    try {
      const res = await getUserAPI();
      setReqUser((prev) => ({
        ...prev,
        img: res.UserImg,
      }));
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <View
      className="p-5 bg-[#1F41BB] items-center"
      style={{ paddingVertical: top }}
    >
      <Image
        source={
          reqUser.img ? { uri: `data:image/jpeg;base64,${reqUser.img}` } : Josse
        }
        style={{ height: 220, width: 220, borderRadius: 100 }}
      />
    </View>
  );
};

export default ImgUser;
