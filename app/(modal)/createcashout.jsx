import { View, Text } from "react-native";
import React from "react";
import { KeyboardAvoidingComponent } from "../../src/components";
import { CreateCash } from "../../src/features/cash";

const ModalCreateCashOut = () => {
  return (
    <KeyboardAvoidingComponent>
      <CreateCash delta={-1} />
    </KeyboardAvoidingComponent>
  );
};

export default ModalCreateCashOut;
