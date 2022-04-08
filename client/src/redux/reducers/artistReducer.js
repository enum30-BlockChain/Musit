import { ActionTypes } from "../constants/actionTypes";

/* My Artist Reducer */
const initialState = {
	loading: false,
  artist_name: null,
  user_address: null,
  img: null,
  likes: null,
  user: {},
  music: [],
  error: false,
  errorMsg: "",
};

export const myArtistReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.ARTIST_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case ActionTypes.ARTIST_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        ...payload,
        error: false,
        errorMsg: "",
      };
    case ActionTypes.ARTIST_READ_SUCCESS:
      return {
        ...state,
        loading: false,
        ...payload,
        error: false,
        errorMsg: "",
      };
    case ActionTypes.ARTIST_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        ...payload,
        error: false,
        errorMsg: "",
      };
    case ActionTypes.ARTIST_DELETE_SUCCESS:
      return {
        ...initialState,
        loading: false,
        error: false,
        errorMsg: "",
      };
      case ActionTypes.ARTIST_DATA_FAIL:
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

/* Artist List Reducer */
const initialListState = {
	loading: false,
  data: [],
  error: false,
  errorMsg: "",
};

export const artistListReducer = (state = initialListState, {type, payload}) => {
  switch (type) {
    case ActionTypes.ARTIST_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case ActionTypes.ARTIST_LIST_READ_SUCCESS:
      return {
        ...state,
        loading: false,
        ...payload,
        error: false,
        errorMsg: "",
      };
      case ActionTypes.ARTIST_LIST_FAIL:
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

export const selectedArtistReducer = (state = {}, {type, payload}) => {
  switch (type) {
    case ActionTypes.SELECTED_ARTIST:
      return payload
    case ActionTypes.REMOVE_SELECTED_ARTIST:
      return {}
    default:
      return state;
  }
}
