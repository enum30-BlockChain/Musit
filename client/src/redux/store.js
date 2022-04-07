import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./reducers/userReducer";
import { metaMaskReducer } from "./reducers/metamaskReducer";
import { artistListReducer, myArtistReducer } from "./reducers/artistReducer";




// combineReducers Reducer들 합치는 곳
const rootReducer = combineReducers({
  user: userReducer,
  myArtist: myArtistReducer,
  artistList: artistListReducer,
  metamask: metaMaskReducer,
});

// 개발 모드에서만 logger 생성
const middlewares = [thunk, logger];
const enhancer =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware(thunk))
    : composeWithDevTools(applyMiddleware(...middlewares)); //composeWithDevTools미들웨어 사용할수있게 해주고 복사로 thunk, logger 합쳐주고

const store = createStore(rootReducer, enhancer);

export default store;
