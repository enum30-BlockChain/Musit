import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";

import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import userReducer from "./user/userReducer";
import userListReducer from "./userList/userListReducer";

import musicListReducer from "./musicList/musicListReducer";
import likeListReducer from "./likeList/likeListReducer";
import searchingReducer from "./searching/searchingReducer";

import artistLikeDetailReducer from "./artistlike/artistLikeDetailReducer";
import { aritstLikeListReducer, artistReducer } from "./artist/artistReducer";
import { aritstListReducer } from "./artist/artistReducer";
import metamaskReducer from "./metamask/metamaskReducer";

// combineReducers Reducer들 합치는 곳
const rootReducer = combineReducers({
  user: userReducer,
  userList: userListReducer,
  musicList: musicListReducer,
  likeList: likeListReducer,
  artist: artistReducer,
  artistList: aritstListReducer,
  searching: searchingReducer,
  metamask: metamaskReducer,
  artistlikeDetail: artistLikeDetailReducer,
  artistlike: artistLikeDetailReducer,
  artistlikelist: aritstLikeListReducer,
});

// 배포 레벨에서는 리덕스 발동시 찍히는 logger를 사용하지 않습니다.
const middlewares = [thunk, logger];
const enhancer =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware())
    : composeWithDevTools(applyMiddleware(...middlewares)); //composeWithDevTools미들웨어 사용할수있게 해주고 복사로 thunk, logger 합쳐주고

const store = createStore(rootReducer, enhancer);

export default store;
