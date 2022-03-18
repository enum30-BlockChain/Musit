// import React, { createContext, useReducer } from "react";
// import { v4 as uuidv4 } from "uuid";
// export const ToastContext = CreateContext();

// export const ToastContextProvider = (props) => {
//   const notifications = [
//     {
//       id: uuidv4(),
//       type: "SUCCESS",
//       title: "회원가입이 가능한 주소입니다.",
//       message: "메타마스크 주소로 가입이 진행됩니다.",
//     },
//   ];

//   const [state, dispatch] = useReducer((state, action) => {
//     switch (action.type) {
//       case "알림사항 추가하기":
//         return state;
//       case "알림사항 지우기":
//         return state;
//       default:
//         return state;
//     }
//   }, notifications);

//   dispatch({ type: "알림사항", payload: { id, type, title, message } });
//   dispatch({ type: "알림사항 취소", payload: { id } });

//   return <ToastContext.Provider>{props.children}</ToastContext.Provider>;
// };
