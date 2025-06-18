import { View, Text } from "react-native";
import React from "react";
import { UpdateUser } from "../../src/features/user";
import { KeyboardAvoidingComponent } from "../../src/components";
const Profile = () => {
  return (
    <KeyboardAvoidingComponent>
      <UpdateUser />
    </KeyboardAvoidingComponent>
  );
};

export default Profile;
