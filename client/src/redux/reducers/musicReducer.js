import { ActionTypes } from "../constants/actionTypes";

/* Music List Reducer */
const initialListState = {
	loading: false,
  data: [],
  createMusic: [],
  error: false,
  errorMsg: "",
};

export const musicListReducer = (state = initialListState, {type, payload}) => {
  switch (type) {
    case ActionTypes.MUSIC_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case ActionTypes.MUSIC_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: "",
      };
    case ActionTypes.MUSIC_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
        error: false,
        errorMsg: "",
      };
      case ActionTypes.MUSIC_LIST_FAIL:
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

export const selectedMusicReducer = (state = {}, {type, payload}) => {
  switch (type) {
    case ActionTypes.SELECTED_MUSIC:
      return payload
    case ActionTypes.REMOVE_SELECTED_MUSIC:
      return {}
    default:
      return state;
  }
}
