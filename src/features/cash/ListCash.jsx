import { View, PanResponder, Animated, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import { formatCurrency1, formatDate } from "../../utils";
import { TxtTruncate } from "../../components";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";

const ListCash = (props) => {
  const { data, index } = props;
  const { CashDate, CashTime, CashName, CashBalance } = data;
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return (
          index === 0 &&
          Math.abs(gestureState.dx) > 20 &&
          Math.abs(gestureState.dy) < 10
        );
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -50) {
          Animated.spring(pan, {
            toValue: { x: -80, y: 0 }, // reveal trash
            useNativeDriver: false,
          }).start();
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 }, // reset
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;
  return (
    <View className="relative">
      {/* Trash background */}
      <TouchableOpacity
        onPress={() => router.push("(modal)/deletecash")}
        className="absolute right-0 top-0 bottom-0 w-[80px] bg-red-600 items-center justify-center rounded-md"
      >
        <Entypo name="trash" size={24} color="white" />
      </TouchableOpacity>
      {/* Swipeable foreground */}
      <Animated.View
        style={[pan.getLayout()]}
        {...panResponder.panHandlers}
        className="bg-white rounded-md"
      >
        <View className="flex flex-row justify-between mb-1">
          <TxtTruncate
            title={formatDate(CashDate)}
            className="font-montserrat text-sm"
          />
          <TxtTruncate title={CashTime} className="font-montserrat text-sm" />
        </View>
        <TxtTruncate
          title={CashName}
          className="font-montserratbold text-xl mb-2"
        />
        <View className="pb-4 border-b-2 border-b-slate-200 mb-2">
          <TxtTruncate
            title={
              CashBalance >= 1
                ? `+ ${formatCurrency1(CashBalance)}`
                : `- ${formatCurrency1(Math.abs(CashBalance))}`
            }
            className={`font-montserratbold ms-2 text-xl self-start px-2 py-1 rounded-md text-white ${
              CashBalance >= 1 ? "bg-teal-600" : "bg-red-600"
            }`}
          />
        </View>
      </Animated.View>
    </View>
  );
};

export default ListCash;
