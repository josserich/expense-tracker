import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome5, Foundation } from "@expo/vector-icons";
import { deleteCashAPI, getCashAPI } from "../../services/cash";
import { Spinner } from "../../components";
import { AllContext } from "../../context/AllProvider";
import { router } from "expo-router";
import { formatCurrency1 } from "../../utils";

const DeleteCash = () => {
  const { setCashSuccess } = useContext(AllContext);
  const { top, bottom } = useSafeAreaInsets();
  const [cash, setCash] = useState({
    cashId: 0,
    cashDate: "",
    cashTime: "",
    cashName: "",
    cashBalance: 0,
  });
  const [loading, setLoading] = useState(false);
  const getCash = async () => {
    setLoading(true);
    try {
      const { data } = await getCashAPI();
      setCash({
        cashId: data[0].CashId,
        cashDate: data[0].CashDate,
        cashTime: data[0].CashTime,
        cashName: data[0].CashName,
        cashBalance: data[0].CashBalance,
      });
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCash();
  }, []);
  const handleDelete = async () => {
    setLoading(true);
    setCashSuccess("");
    try {
      const deleted = await deleteCashAPI();
      setCashSuccess(deleted);
      router.back();
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <View className="bg-white flex-1 p-5" style={{ paddingBottom: bottom }}>
      <View className="m-auto items-center">
        {loading && <Spinner color="#315EFF" />}
        {!loading && (
          <>
            <Foundation name="alert" size={140} color="red" />
            <Text className="font-montserratbold text-2xl text-center tracking-wider mb-1">
              Are You Sure Want to Delete - {cash.cashName} ?
            </Text>
            <Text className="font-montserratsemibolditalic text-md text-center tracking-widest mb-4">
              Date: {cash.cashDate}, Time : {cash.cashTime}, Balance :{" "}
              {formatCurrency1(cash.cashBalance)}
            </Text>
            <View className="flex flex-row gap-2">
              <TouchableOpacity
                className="flex flex-row bg-red-600 px-4 py-2 rounded-lg gap-3 items-center"
                onPress={handleDelete}
                disabled={loading}
              >
                <FontAwesome5 name="check" size={24} color="white" />
                <Text className="text-white text-2xl font-montserratbold">
                  Yes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex flex-row bg-slate-600 px-4 py-2 rounded-lg gap-3 items-center"
                onPress={() => router.back()}
              >
                <FontAwesome5 name="times" size={24} color="white" />
                <Text className="text-white text-2xl font-montserratbold">
                  No
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default DeleteCash;
