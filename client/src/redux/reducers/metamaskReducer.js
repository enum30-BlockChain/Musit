import { ActionTypes } from "../constants/actionTypes";

const initialState = {
	loading: false,
  accounts: [],
  network: null,
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
    case ActionTypes.METAMASK_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        accounts: payload.accounts,
        network: payload.network,
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

