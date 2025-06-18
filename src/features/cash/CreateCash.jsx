import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useContext, useRef, useState } from "react";
import {
  Alerts,
  InputBalance,
  InputTxt,
  InputTxtMulti,
} from "../../components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { formatCurrency, unFormatCurrency } from "../../utils";
import { createCashAPI } from "../../services/cash";
import { router, useLocalSearchParams } from "expo-router";
import { AllContext } from "../../context/AllProvider";
import { Entypo } from "@expo/vector-icons";

const CreateCash = (props) => {
  const { delta } = props;
  const { cashTotal } = useLocalSearchParams();
  const { isKeyboardVisible, setCashSuccess } = useContext(AllContext);
  const { top, bottom } = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef(null);
  const [req, setReq] = useState({
    cashName: "",
    cashBalance: 0,
    cashInfo: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const handleCreate = async () => {
    setLoading(true);
    setCashSuccess("");
    try {
      const res = await createCashAPI({
        cashName: req.cashName,
        cashBalance:
          delta === 1
            ? unFormatCurrency(req.cashBalance)
            : unFormatCurrency(req.cashBalance) * -1,
        cashInfo: req.cashInfo,
      });
      setCashSuccess(res);
      router.back();
    } catch (error) {
      setErrMsg(error.message);
      //   await delay(100);
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <View className="flex-1">
      <ScrollView ref={scrollViewRef} keyboardShouldPersistTaps="handled">
        <View className="p-5">
          {/* alert error */}
          <Alerts status="error" msg={errMsg} setMsg={setErrMsg} />
          {/* cash available */}
          <View className="items-end mb-2">
            <View className="flex flex-row items-center gap-2 mb-3">
              <Entypo name="wallet" size={24} color="#1F41BB" />
              <Text className="text-center font-montserratbold tracking-wider text-xl text-[#1F41BB]">
                Total Cash :
              </Text>
            </View>
            <Text className="font-montserratbold text-2xl px-2 py-1 rounded-lg bg-[#315EFF] text-white">
              {formatCurrency(cashTotal)}
            </Text>
          </View>
          {/* cashName */}
          <InputTxt
            title="Cash Name"
            color="#1F41BB"
            placeholder="ex : cash name"
            req={req}
            value={req.cashName}
            setReq={setReq}
            field="cashName"
          />
          {/* cashBalance */}
          <InputBalance
            title="Cash Balance"
            color="#1F41BB"
            placeholder="ex : $ 10,00"
            req={req}
            value={req.cashBalance}
            setReq={setReq}
            field="cashBalance"
          />
          {/* cashInfo */}
          <InputTxtMulti
            title="More Information"
            color="#1F41BB"
            placeholder="ex : desc your cash detail.."
            req={req}
            value={req.cashInfo}
            setReq={setReq}
            field="cashInfo"
          />
        </View>
      </ScrollView>
      <View
        className="p-4 border-t border-t-[#d1c6c4]"
        style={{
          paddingBottom: bottom + 20,
        }}
      >
        <TouchableOpacity
          className="bg-[#1F41BB] px-4 py-3 rounded-md"
          disabled={loading}
          onPress={handleCreate}
        >
          <Text className="text-white font-montserratbold text-center text-2xl">
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateCash;
