import React, { createContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
export const ToastContext = CreateContext();

export const ToastContextProvider = (props) => {
  const notifications = [
    {
      id: uuidv4(),
      type: "SUCCESS",
      title: "회원가입이 가능한 주소입니다.",
      message: "메타마스크 주소로 가입이 진행됩니다.",
    },
  ];
  return <ToastContext.Provider>{props.children}</ToastContext.Provider>;
};
