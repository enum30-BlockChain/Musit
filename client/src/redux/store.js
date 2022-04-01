import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import userReducer from "./user/userReducer";

// import logger from "redux-logger";
// import { composeWithDevTools } from "redux-devtools-extension";


// Reducer들 합치는 곳 
const rootReducer = combineReducers({
  user: userReducer,
});

// 배포 레벨에서는 리덕스 발동시 찍히는 logger를 사용하지 않습니다.
// const enhancer =
//   process.env.NODE_ENV === "production"
//     ? compose(applyMiddleware())
//     : composeWithDevTools(applyMiddleware(logger));
// const store = createStore(rootReducer, enhancer);

const store = createStore(rootReducer);

export default store;
