import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import "./../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
const { width, height } = Dimensions.get("window");
import { LoginSVG } from "../src/assets";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { InputPassword, InputTxt } from "../src/components";
import { router } from "expo-router";
import { userSchema } from "../src/services/user";
import { cashSchema } from "../src/services/cash";

const Login = () => {
  const { top, bottom } = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [req, setReq] = useState({
    userName: "",
    userPassword: "",
  });
  const dbInit = async () => {
    setLoading(true);
    try {
      await cashSchema();
      await userSchema();
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    dbInit();
  }, []);
  const handleLogin = async () => {
    setLoading(true);
    try {
      // console.log(req);
      router.push("/(drawer)/cash");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView className="flex-1 items-center bg-[#315EFF]">
      <LoginSVG
        width={width * 0.9}
        preserveAspectRatio="none"
        height={height * 0.4}
      />
      <View
        className="bg-white h-[65%] w-full absolute bottom-0 rounded-t-[30px] px-6"
        style={{ paddingTop: 30, paddingBottom: bottom }}
      >
        <View className="my-6">
          <Text className="font-montserratbold text-xl text-center text-[#1F41BB]">
            " Money is not Everything , But Everything needs Money "
          </Text>
        </View>
        <View
          className="border border-[#1F41BB] p-5 rounded-xl"
          // style={{
          //   shadowColor: "#000",
          //   shadowOffset: { width: 1, height: 2 },
          //   shadowOpacity: 0.1,
          //   shadowRadius: 3,
          //   elevation: 3,
          // }}
        >
          <View>
            {/* username */}
            <InputTxt
              title="Username :"
              color="#1F41BB"
              field="userName"
              value={req.userName}
              req={req}
              setReq={setReq}
              placeholder="ex : josse"
            />
            {/* password */}
            <InputPassword
              color="#1F41BB"
              field="userPassword"
              req={req}
              setReq={setReq}
              value={req.userPassword}
            />
            {/* button */}
            <TouchableOpacity
              className="bg-[#1F41BB] text-white py-3 rounded-lg my-5"
              onPress={handleLogin}
              disabled={loading}
            >
              <Text className="text-center text-white font-montserratextrabold text-2xl tracking-wider">
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
