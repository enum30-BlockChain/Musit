import { ActionTypes } from "../constants/actionTypes";

const initialMusitNFTState = {
  loading: false,
  allMusitNFTList:[],
  error: false,
  errorMsg: "",
}

export const musitNFTReducer = (state = initialMusitNFTState, { type, payload }) => {
  switch (type) {
    case ActionTypes.MUSIT_NFT_ALL_LIST_REQUEST:
      return {
        loading: true,
        error: false,
        errorMsg: "",
      };
    case ActionTypes.MUSIT_NFT_ALL_LIST_SUCCESS:
      return {
        loading: false,
        error: false,
        errorMsg: "",
      };
    case ActionTypes.MUSIT_NFT_ALL_LIST_FAIL:
      return {
        loading: false,
        error: true,
        errorMsg: "Get all list of Musit NFT failed",
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