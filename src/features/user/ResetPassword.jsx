import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Alerts, InputPassword, Spinner } from "../../components";
import { resetPasswordAPI } from "../../services/user";
import { AllContext } from "../../context/AllProvider";
import { router } from "expo-router";

const ResetPassword = () => {
  const { setUserSuccess } = useContext(AllContext);
  const [loading, setLoading] = useState(false);
  const { top, bottom } = useSafeAreaInsets();
  const [req, setReq] = useState({
    password: "",
    passwordConfirmation: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await resetPasswordAPI({
        userPassword: req.password,
        userPasswordConfirmation: req.passwordConfirmation,
      });
      setUserSuccess(res);
      router.back();
    } catch (error) {
      // console.error(error);
      setErrMsg(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <View className="flex-1 justify-center p-4">
      {loading && <Spinner color="#315EFF" />}
      {!loading && (
        <View className="border border-[#1F41BB] rounded-lg w-full p-4">
          {/* alert */}
          <Alerts status="error" msg={errMsg} setMsg={setErrMsg} />
          {/* password */}
          <InputPassword
            title="Password"
            color="#1F41BB"
            field="password"
            setReq={setReq}
            value={req.password}
          />
          {/* confirmationPassword */}
          <InputPassword
            title="Confirmation Password :"
            color="#1F41BB"
            setReq={setReq}
            field="passwordConfirmation"
            value={req.passwordConfirmation}
          />
          {/* btn submit */}
          <TouchableOpacity
            className="bg-[#1F41BB] p-3 rounded-md mb-4"
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text className="text-white text-center font-montserratbold text-xl">
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ResetPassword;
