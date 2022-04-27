import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  loading: false,
  data: [],
  error: false,
  errorMsg: "",
}

export const ownedMusitNFTReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.MUSIT_NFT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case ActionTypes.MUSIT_NFT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...payload],
        error: false,
        errorMsg: "",
      };
    case ActionTypes.MUSIT_NFT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: payload,
      };
    default:
      return state;
  }
};

export const mintingMusitNFTReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.MUSIT_NFT_MINTING_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case ActionTypes.MUSIT_NFT_MINTING_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...payload],
        error: false,
        errorMsg: "",
      };
    case ActionTypes.MUSIT_NFT_MINTING_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: payload,
      };
    default:
      return state;
  }
};

export const onMarketMusitNFTReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.MUSIT_NFT_MARKET_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case ActionTypes.MUSIT_NFT_MARKET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...payload],
        error: false,
        errorMsg: "",
      };
    case ActionTypes.MUSIT_NFT_MARKET_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: payload,
      };
    default:
      return state;
  }
};

export const onAuctionMusitNFTReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.MUSIT_NFT_AUCTION_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case ActionTypes.MUSIT_NFT_AUCTION_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...payload],
        error: false,
        errorMsg: "",
      };
    case ActionTypes.MUSIT_NFT_AUCTION_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: payload,
      };
    default:
      return state;
  }
};

/* Selected Musit NFT Reducer */
export const selectedMusitNFTReducer = (state = {}, { type, payload }) => {
	switch (type) {
		case ActionTypes.SELECTED_MUSIT_NFT:
			return payload;
		case ActionTypes.REMOVE_SELECTED_MUSIT_NFT:
			return {};
		default:
			return state;
	}
};