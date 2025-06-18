import React, { useContext, useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { AllContext } from "../context/AllProvider";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const KeyboardAvoidingComponent = ({ children }) => {
  const { isKeyboardVisible, setKeyboardVisible } = useContext(AllContext);
  const { top, bottom } = useSafeAreaInsets();
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        paddingBottom: isKeyboardVisible ? bottom + top * 2 : bottom + 10,
        backgroundColor: "white",
      }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingComponent;
