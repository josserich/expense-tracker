import React from "react";
import { KeyboardAvoidingComponent } from "../../src/components";
import { CreateCash } from "../../src/features/cash";

const ModalCreateCashIn = () => {
  return (
    <KeyboardAvoidingComponent>
      <CreateCash delta={1} />
    </KeyboardAvoidingComponent>
  );
};

export default ModalCreateCashIn;
