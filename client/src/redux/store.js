import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";



// combineReducers Reducer들 합치는 곳
const rootReducer = combineReducers({
  user: userReducer,
  artist: artistReducer,
  music: musicReducer,

});

// 배포 레벨에서는 리덕스 발동시 찍히는 logger를 사용하지 않습니다.
const middlewares = [thunk, logger];
const enhancer =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware())
    : composeWithDevTools(applyMiddleware(...middlewares)); //composeWithDevTools미들웨어 사용할수있게 해주고 복사로 thunk, logger 합쳐주고

const store = createStore(rootReducer, enhancer);

export default store;
