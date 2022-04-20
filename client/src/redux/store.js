import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./reducers/userReducer";
import { metaMaskReducer } from "./reducers/metamaskReducer";
import { artistListReducer, likeArtistReducer, artistReducer, selectedArtistReducer } from "./reducers/artistReducer";
import { likeMusicReducer, musicListReducer, musicReducer, selectedMusicReducer } from "./reducers/musicReducer";
import { searchingReducer } from "./reducers/searchingReducer";
import { onAuctionMusitNFTReducer, onMarketMusitNFTReducer, ownedMusitNFTReducer, selectedMusitNFTReducer } from "./reducers/contractReducer";




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
  music: musicReducer,
  musicList: musicListReducer,
  likeMusic: likeMusicReducer,
  selectedMusic: selectedMusicReducer,

  // Search Reducer
  searching: searchingReducer,

  // Metamask Reducer
  metamask: metaMaskReducer,

  // Contracts Reducer
  ownedMusitNFT: ownedMusitNFTReducer,
  market: onMarketMusitNFTReducer,
  auction: onAuctionMusitNFTReducer,
  selectedMusitNFT: selectedMusitNFTReducer,
});

// 개발 모드에서만 logger 생성
const middlewares = [thunk];
const enhancer =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware(thunk))
    : composeWithDevTools(applyMiddleware(...middlewares)); //composeWithDevTools미들웨어 사용할수있게 해주고 복사로 thunk, logger 합쳐주고

const store = createStore(rootReducer, enhancer);

export default store;
