import { ActionTypes } from "../constants/actionTypes";

const initialMusitNFTListState = {
  loading: false,
  myNFTList:[],
  myMintedNFTList:[],
  error: false,
  errorMsg: "",
}

export const musitNFTReducer = (state = initialMusitNFTListState, { type, payload }) => {
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
        myNFTList: [...payload],
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
    case ActionTypes.MUSIT_NFT_MINTED_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case ActionTypes.MUSIT_NFT_MINTED_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        myMintedNFTList: [...payload],
        error: false,
        errorMsg: "",
      };
    case ActionTypes.MUSIT_NFT_MINTED_LIST_FAIL:
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

/*  */
const initialMusitNFTMintingState = {
  loading: false,
  data: {},
  error: false,
  errorMsg: "",
}

export const musitNFTMintingReducer = (state = initialMusitNFTMintingState, { type, payload }) => {
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
        data: {...payload},
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