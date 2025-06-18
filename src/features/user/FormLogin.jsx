import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { Alerts, InputPassword, InputTxt } from "../../components";
import { loginAPI } from "../../services/user";
import { getStorage, saveStorage } from "../../utils";
import JWT from "expo-jwt";

const FormLogin = (props) => {
  const { loading, setLoading } = props;
  const [req, setReq] = useState({
    userName: "",
    userPassword: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const handleLogin = async () => {
    setLoading(true);
    try {
      const { token, key } = await loginAPI(req);
      await saveStorage("auth", { token, key });
      const user = await getStorage("auth");
      const auth = JWT.decode(user.token, user.key);
      if (auth) {
        router.push("/(drawer)/order");
      }
      router.push("/(drawer)/cash");
    } catch (error) {
      console.error(error);
      setErrMsg(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <View>
      {/* alert  */}
      <Alerts status="error" msg={errMsg} setMsg={setErrMsg} />
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
          {loading ? "wait...." : "Login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormLogin;
