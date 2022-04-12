import { ActionTypes } from "../constants/actionTypes";

const initialMusitNFTState = {
  loading: false,
  myNFTList:[],
  myMintedNFTList:[],
  error: false,
  errorMsg: "",
}

export const musitNFTReducer = (state = initialMusitNFTState, { type, payload }) => {
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
        myNFTList: payload,
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
        myMintedNFTList: payload,
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