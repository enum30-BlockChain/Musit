import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
<<<<<<< HEAD
import { userReducer } from "./reducers/userReducer";
import { metaMaskReducer } from "./reducers/metamaskReducer";
import { artistListReducer, likeArtistReducer, artistReducer, selectedArtistReducer } from "./reducers/artistReducer";
import { likeMusicReducer, musicListReducer, selectedMusicReducer } from "./reducers/musicReducer";



=======
import userReducer from "./user/userReducer";
import userListReducer from "./userList/userListReducer";

import {
  musicListReducer,
  myMusicListReducer,
} from "./musicList/musicListReducer";
import likeListReducer from "./likeList/likeListReducer";
import searchingReducer from "./searching/searchingReducer";

import artistLikeDetailReducer from "./artistlike/artistLikeDetailReducer";
import {
  aritstCountReducer,
  aritstLikeListReducer,
  artistReducer,
} from "./artist/artistReducer";
import { aritstListReducer } from "./artist/artistReducer";
import metamaskReducer from "./metamask/metamaskReducer";
>>>>>>> haemin

// combineReducers Reducer들 합치는 곳
const rootReducer = combineReducers({
  // User Reducer
  user: userReducer,
<<<<<<< HEAD
  
  // Artist Reducer
  artist: artistReducer,
  artistList: artistListReducer,
  selectedArtist: selectedArtistReducer,
  likeArtist: likeArtistReducer,
  
  // Music Reducer
  musicList: musicListReducer,
  likeMusic: likeMusicReducer,
  selectedMusic: selectedMusicReducer,

  // Metamask Reducer
  metamask: metaMaskReducer,
=======
  userList: userListReducer,

  musicList: musicListReducer,
  myalbum: myMusicListReducer,

  likeList: likeListReducer,

  searching: searchingReducer,

  metamask: metamaskReducer,

  artist: artistReducer,
  artistList: aritstListReducer,
  artistlikeCount: aritstCountReducer,
  artistlikelist: aritstLikeListReducer,
  artistlike: artistLikeDetailReducer,
>>>>>>> haemin
});

// 개발 모드에서만 logger 생성
const middlewares = [thunk];
const enhancer =
  process.env.NODE_ENV === "production"
<<<<<<< HEAD
    ? compose(applyMiddleware(thunk))
=======
    ? compose(applyMiddleware())
>>>>>>> haemin
    : composeWithDevTools(applyMiddleware(...middlewares)); //composeWithDevTools미들웨어 사용할수있게 해주고 복사로 thunk, logger 합쳐주고

const store = createStore(rootReducer, enhancer);

export default store;
