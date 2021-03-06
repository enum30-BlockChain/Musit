import { ActionTypes } from "../constants/actionTypes";

const initialState = {
	loading: false,
  accounts: [],
  network: null,
  balance: null,
  error: false,
  errorMsg: "",
};

export const metaMaskReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.METAMASK_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case ActionTypes.METAMASK_CONNECT_SUCCESS:
      return {
        ...state,
        loading: false,
        ...payload,
        error: false,
        errorMsg: "",
      };
    case ActionTypes.METAMASK_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        ...payload,
        error: false,
        errorMsg: "",
      };
    case ActionTypes.METAMASK_DATA_FAIL:
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

