import { View, Text } from "react-native";
import React from "react";
import { ResetPassword } from "../../src/features/user";
import { KeyboardAvoidingComponent } from "../../src/components";

const ModalResetPassword = () => {
  return (
    <KeyboardAvoidingComponent>
      <ResetPassword />
    </KeyboardAvoidingComponent>
  );
};

export default ModalResetPassword;
