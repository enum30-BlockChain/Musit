import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import userReducer from "./user/userReducer";
import thunk from 'redux-thunk';

// import logger from "redux-logger";
// import { composeWithDevTools } from "redux-devtools-extension";


// Reducer들 합치는 곳 
const rootReducer = combineReducers({
  user: userReducer,
});

const middlewares = [thunk]

// 배포 레벨에서는 리덕스 발동시 찍히는 logger를 사용하지 않습니다.
// middlewares = [...middlewares, logger]
// const enhancer =
//   process.env.NODE_ENV === "production"
//     ? compose(applyMiddleware())
//     : composeWithDevTools(applyMiddleware(middlewares));
// const store = createStore(rootReducer, enhancer);

const store = createStore(rootReducer, applyMiddleware(middlewares));

export default store;
