import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { delay } from "../utils";

const Pagination = (props) => {
  const { totalPage, req, setReq, getAPI, setLoading } = props;
  const [trigger, setTrigger] = useState(false);
  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);
  const getByPage = async () => {
    setLoading(true);
    await delay(1000);
    await getAPI(req);
    setTrigger(false);
  };
  useEffect(() => {
    if (trigger) {
      getByPage();
    }
  }, [trigger]);
  const prevPage = async () => {
    setReq((prev) => ({ ...prev, offset: req.offset - 1 }));
    if (req.offset === 1) {
      setReq((prev) => ({
        ...prev,
        offset: totalPage,
      }));
    }
    setTrigger(true);
  };
  const currentPage = (page) => {
    setReq((prev) => ({ ...prev, offset: page }));
    setTrigger(true);
  };
  const nextPage = () => {
    setReq((prev) => ({ ...prev, offset: req.offset + 1 }));
    if (req.offset === totalPage) {
      setReq((prev) => ({
        ...prev,
        offset: 1,
      }));
    }
    setTrigger(true);
  };
  return (
    <View className="flex flex-row justify-center gap-2 flex-wrap my-3">
      {/* prev */}
      <TouchableOpacity
        className="w-[42px] h-[42px] bg-[#C6B48E] rounded-full flex"
        onPress={prevPage}
      >
        <MaterialIcons
          name="skip-previous"
          size={24}
          color="white"
          className="text-2xl m-auto"
        />
      </TouchableOpacity>
      {/* number */}
      {pages.map((page) => (
        <TouchableOpacity
          className={`w-[42px] h-[42px] rounded-full flex ${
            req.offset === page ? "bg-[#B67D03]" : "bg-[#C6B48E]"
          }`}
          key={page}
          onPress={() => currentPage(page)}
        >
          <Text className={`m-auto text-white text-2xl`}>{page}</Text>
        </TouchableOpacity>
      ))}
      {/* next */}
      <TouchableOpacity
        className="w-[42px] h-[42px] bg-[#C6B48E] rounded-full flex"
        onPress={nextPage}
      >
        <MaterialIcons
          name="skip-next"
          size={24}
          color="white"
          className="text-2xl m-auto"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Pagination;
