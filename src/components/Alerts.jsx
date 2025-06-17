import { View, Text, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import * as Animatable from "react-native-animatable";
import { FontAwesome } from "@expo/vector-icons";

const Alerts = (props) => {
  const { status, msg, setMsg } = props;
  const alertRef = useRef(null);
  const handleClose = () => {
    if (alertRef.current) {
      alertRef.current.fadeOutUp(300).then(() => setMsg(""));
    }
  };
  return (
    <>
      {msg !== "" && (
        <Animatable.View
          ref={alertRef}
          animation="fadeInDown"
          duration={500}
          className={`${
            status === "error" ? "bg-red-500" : "bg-teal-600"
          } p-4 rounded-lg mb-5`}
        >
          <View className="flex flex-row justify-between mb-1">
            <Text className="font-montserratextrabold text-white text-xl capitalize">
              {status === "error" ? "Error :" : "Success :"}
            </Text>
            <TouchableOpacity onPress={handleClose}>
              <FontAwesome name="times" size={22} color="white" />
            </TouchableOpacity>
          </View>
          <View>
            <Text className="font-montserratbold text-white">{msg}</Text>
          </View>
        </Animatable.View>
      )}
    </>
  );
};

export default Alerts;
