import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Alerts, Spinner, TxtTruncate } from "../../src/components";
import { getCashAPI } from "../../src/services/cash";
import { AllContext } from "../../src/context/AllProvider";
import { BtnExportExcel, ListCash } from "../../src/features/cash";
import { delay, formatCurrency1 } from "../../src/utils";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";

const Cash = () => {
  const { cashSuccess, setCashSuccess, financialRef } = useContext(AllContext);
  const { top, bottom } = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [cashTotal, setCashTotal] = useState(0);
  const [cash, setCash] = useState([]);
  const getCash = async () => {
    setLoading(true);
    try {
      const { CashSum, data } = await getCashAPI();
      setCashTotal(CashSum);
      setCash(data);
    } catch (error) {
      throw error;
    } finally {
      await delay(100);
      financialRef.current?.scrollToOffset({ animated: true, offset: 0 });
      setLoading(false);
    }
  };
  useEffect(() => {
    if (cashSuccess) {
      getCash();
    }
  }, [cashSuccess]);
  useEffect(() => {
    getCash();
  }, []);
  return (
    <View className="p-2 bg-white flex-1" style={{ paddingBottom: bottom }}>
      {/* history */}
      <FlatList
        data={loading ? [{}] : cash}
        renderItem={({ item, index }) =>
          loading ? (
            <Spinner color="#315EFF" />
          ) : (
            cash.length >= 1 && <ListCash data={item} index={index} />
          )
        }
        keyExtractor={(item, index) =>
          item?.CashId?.toString() || index.toString()
        }
        ListHeaderComponent={
          <>
            {/* total Cash */}
            <View className="my-2 items-end">
              <View className="flex flex-row items-center gap-2 mb-3">
                <Entypo name="wallet" size={24} color="#1F41BB" />
                <Text className="text-center font-montserratbold tracking-wider text-xl text-[#315EFF] my-1">
                  Total Cash :
                </Text>
              </View>
              <TxtTruncate
                title={`${
                  cashTotal
                    ? `+ ${formatCurrency1(cashTotal)}`
                    : `${formatCurrency1(0)}`
                }`}
                className="font-montserratbold tracking-wider text-3xl text-white bg-[#315EFF] px-3 py-1 rounded-xl"
              />
            </View>
            {/* export excel && create  */}
            <View className="flex flex-row justify-between items-center my-4">
              {/* expor excel */}
              <BtnExportExcel />
              <View className="flex flex-row gap-3">
                {/* cash in */}
                <TouchableOpacity
                  className="bg-teal-600 h-[45px] w-[45px] rounded-full flex justify-center items-center"
                  onPress={() =>
                    router.push({
                      pathname: "/(modal)/createcashin",
                      params: { cashTotal },
                    })
                  }
                >
                  <Entypo name="plus" size={30} color="white" />
                </TouchableOpacity>
                {/* cash out */}
                <TouchableOpacity
                  className="bg-red-500 h-[45px] w-[45px] rounded-full flex justify-center items-center"
                  onPress={() =>
                    router.push({
                      pathname: "/(modal)/createcashout",
                      params: { cashTotal },
                    })
                  }
                >
                  <Entypo name="minus" size={30} color="white" />
                </TouchableOpacity>
              </View>
            </View>
            {/* alert */}
            {cashSuccess && (
              <Alerts
                status="success"
                msg={cashSuccess}
                setMsg={setCashSuccess}
              />
            )}
          </>
        }
        ListEmptyComponent={
          !loading && (
            <Text className="text-center text-slate-500 font-montserratsemibolditalic text-2xl my-5">
              Cash Empty...
            </Text>
          )
        }
        contentContainerStyle={{
          padding: 16,
          gap: 5,
          paddingBottom: bottom,
          // flexGrow: 1,
        }}
        ref={financialRef}
        keyboardShouldPersistTaps="always"
      />
    </View>
  );
};

export default Cash;
