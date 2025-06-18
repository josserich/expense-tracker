import {
  View,
  Text,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import "./../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoginSVG } from "../src/assets";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FormLogin } from "../src/features/user";
import { userSchema } from "../src/services/user";
import { cashSchema } from "../src/services/cash";

const { width, height } = Dimensions.get("window");

const Login = () => {
  const { top, bottom } = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);

  const dbInit = async () => {
    setLoading(true);
    try {
      await cashSchema();
      await userSchema();
    } catch (error) {
      // console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dbInit();
  }, []);

  return (
    <View className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, backgroundColor: "#315EFF" }}
        keyboardVerticalOffset={Platform.OS === "ios" ? bottom + 20 : 0}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
          // showsVerticalScrollIndicator={false}
        >
          {/* Top Illustration */}
          <View className="items-center py-2" style={{ paddingTop: top }}>
            <LoginSVG
              width={width * 0.9}
              preserveAspectRatio="none"
              height={height * 0.4}
            />
          </View>
          {/* Wrapper Putih */}
          <View
            className="flex-1 bg-white rounded-t-[35px] mt-[-20] p-4"
            style={{ paddingBottom: bottom }}
          >
            {/* quotes money */}
            <View className="my-6">
              <Text className="font-montserratbold text-xl text-center text-[#1F41BB]">
                " Money is not Everything , But Everything needs Money "
              </Text>
            </View>
            {/* form login */}
            <View className="border border-[#1F41BB] p-5 rounded-xl">
              <FormLogin loading={loading} setLoading={setLoading} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;
