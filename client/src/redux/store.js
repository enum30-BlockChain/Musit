import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./reducers/userReducer";
import { metaMaskReducer } from "./reducers/metamaskReducer";
import {
  artistListReducer,
  likeArtistReducer,
  artistReducer,
  selectedArtistReducer,
} from "./reducers/artistReducer";
import {
  likeMusicReducer,
  musicListReducer,
  selectedMusicReducer,
} from "./reducers/musicReducer";

// combineReducers Reducer들 합치는 곳
const rootReducer = combineReducers({
  // User Reducer
  user: userReducer,

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
});

// 개발 모드에서만 logger 생성
const middlewares = [thunk];
const enhancer =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware(thunk))
    : composeWithDevTools(applyMiddleware(...middlewares)); //composeWithDevTools미들웨어 사용할수있게 해주고 복사로 thunk, logger 합쳐주고

const store = createStore(rootReducer, enhancer);

export default store;
