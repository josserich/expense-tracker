// import JWT from "expo-jwt";
import { createContext, useRef, useState } from "react";
export const AllContext = createContext();
export const AllProvider = ({ children }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  // cash
  const financialRef = useRef(null);
  const [cashSuccess, setCashSuccess] = useState("");
  // user
  const [reqUser, setReqUser] = useState({
    userId: 0,
    userName: "",
    userFullname: "",
    userEmail: "",
    img: "",
    userInfo: "",
  });
  // protected
  return (
    <AllContext.Provider
      value={{
        isKeyboardVisible,
        setKeyboardVisible,
        financialRef,
        cashSuccess,
        setCashSuccess,
        reqUser,
        setReqUser,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};
