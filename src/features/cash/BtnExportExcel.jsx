import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { getCashAPI } from "../../services/cash";
import { exportXls } from "../../utils";

const BtnExportExcel = () => {
  const [loading, setLoading] = useState(false);
  const handleExport = async () => {
    setLoading(true);
    try {
      const { data } = await getCashAPI();
      if (!data || data.length === 0) {
        Alert.alert("Cash is Empty...");
        setLoading(false);
        return;
      }
      await exportXls(data);
    } catch (error) {
      console.error("Export error: ", error);
      Alert.alert("Gagal", "Gagal export data ke Excel.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity onPress={handleExport} disabled={loading}>
      <View className="flex flex-row items-center gap-4">
        <Text className="font-montserratbold text-2xl text-[#1F41BB]">
          Transaction
        </Text>
        <MaterialIcons name="download-for-offline" size={40} color="#1F41BB" />
      </View>
    </TouchableOpacity>
  );
};

export default BtnExportExcel;
