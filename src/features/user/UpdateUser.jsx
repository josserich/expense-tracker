import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { getUserAPI, updateUserAPI } from "../../services/user";
import {
  Alerts,
  InputImg,
  InputTxt,
  InputTxtMulti,
  Spinner,
} from "../../components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AllContext } from "../../context/AllProvider";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const UpdateUser = () => {
  const {
    isKeyboardVisible,
    userSuccess,
    setUserSuccess,
    reqUser,
    setReqUser,
  } = useContext(AllContext);
  const { top, bottom } = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef(null);
  const getUser = async () => {
    setLoading(true);
    try {
      const users = await getUserAPI();
      setReqUser({
        userId: users.UserId,
        userName: users.UserName,
        userFullname: users.UserFullname,
        userEmail: users.UserEmail,
        img: users.UserImg,
        userInfo: users.UserInfo,
      });
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const [errMsg, setErrMsg] = useState("");
  const handleUpdate = async () => {
    setLoading(true);
    try {
      const updated = await updateUserAPI({
        userName: reqUser.userName,
        userFullname: reqUser.userFullname,
        userEmail: reqUser.userEmail,
        userImg: reqUser.img || "",
        userInfo: reqUser.userInfo,
      });
      await getUser();
      setErrMsg("");
      setUserSuccess(updated);
    } catch (error) {
      setUserSuccess("");
      console.error(error.message);
      setErrMsg(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <View className="flex-1">
      {loading && (
        <View className="m-auto" style={{ paddingBottom: bottom + 40 }}>
          <Spinner color="#315EFF" />
        </View>
      )}
      {!loading && (
        <>
          <ScrollView
            ref={scrollViewRef}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ padding: 15, border: 1 }}
          >
            <Alerts
              status="success"
              msg={userSuccess}
              setMsg={setUserSuccess}
            />
            <Alerts status="error" msg={errMsg} setMsg={setErrMsg} />
            {/* reset password */}
            <View className="items-end">
              <TouchableOpacity
                className="flex flex-row gap-3 items-center bg-yellow-600 px-2 py-1 rounded-md"
                onPress={() => router.push("(modal)/resetpassword")}
              >
                <MaterialIcons name="key" size={20} color="white" />
                <Text className="font-montserratbold text-white text-lg">
                  Reset Password
                </Text>
              </TouchableOpacity>
            </View>
            {/* UserName */}
            <InputTxt
              title="Username :"
              color="#1F41BB"
              placeholder="ex : josse112"
              field="userName"
              value={reqUser.userName}
              req={reqUser}
              setReq={setReqUser}
            />
            {/* UserFullname */}
            <InputTxt
              title="Fullname :"
              color="#1F41BB"
              placeholder="ex : josse112"
              field="userFullname"
              value={reqUser.userFullname}
              req={reqUser}
              setReq={setReqUser}
            />
            {/* UserEmail */}
            <InputTxt
              title="Email :"
              color="#1F41BB"
              placeholder="ex : pinemjosse@gmail.com"
              field="userEmail"
              value={reqUser.userEmail}
              req={reqUser}
              setReq={setReqUser}
            />
            {/* UserImg */}
            <InputImg
              title="Photo :"
              color="#1F41BB"
              setLoading={setLoading}
              req={reqUser}
              setReq={setReqUser}
            />
            {/* information */}
            <InputTxtMulti
              color="#1F41BB"
              field="userInfo"
              placeholder="ex : desc your bussiness detail....."
              req={reqUser}
              setReq={setReqUser}
              value={reqUser.userInfo}
            />
          </ScrollView>
          {/* button update */}
          <View
            className="p-4 border-t border-t-[#d1c6c4]"
            // style={{
            //   paddingBottom: bottom,
            // }}
          >
            <TouchableOpacity
              className="bg-[#1F41BB] px-4 py-3 rounded-md"
              disabled={loading}
              onPress={handleUpdate}
            >
              <Text className="text-white font-montserratbold text-center text-2xl">
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default UpdateUser;
