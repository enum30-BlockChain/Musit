import { ActionTypes } from "../constants/actionTypes";

/* Music Reducer */
const musicInitialState = {
  loading: false,
  artist_name: null,
  user_address: null,
  img: null,
  likes: null,
  Artist: {},
  MusicLike: [],
  error: false,
  errorMsg: "",
};

export const musicReducer = (state = musicInitialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.MUSIC_DATA_REQUEST:
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
    case ActionTypes.MUSIC_READ_SUCCESS:
      return {
        ...state,
        loading: false,
        ...payload,
        error: false,
        errorMsg: "",
      };
    case ActionTypes.MUSIC_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        ...payload,
        error: false,
        errorMsg: "",
      };
    case ActionTypes.MUSIC_DELETE_SUCCESS:
      return {
        ...initialState,
        loading: false,
        error: false,
        errorMsg: "",
      };
    case ActionTypes.MUSIC_DATA_FAIL:
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

/* Music List Reducer */
const musicListInitialState = {
  loading: false,
  data: [],
  error: false,
  errorMsg: "",
};

export const musicListReducer = (
  state = musicListInitialState,
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.MUSIC_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case ActionTypes.MUSIC_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...payload],
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

/* Like Music Reducer */
const likeMusicInitialState = {
  loading: false,
  data: [],
  error: false,
  errorMsg: "",
};

export const likeMusicReducer = (
  state = likeMusicInitialState,
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.LIKE_MUSIC_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case ActionTypes.LIKE_MUSIC_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...payload],
        error: false,
        errorMsg: "",
      };
    case ActionTypes.LIKE_MUSIC_FAIL:
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

/* Selected Music Reducer */
export const selectedMusicReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SELECTED_MUSIC:
      return payload;
    case ActionTypes.REMOVE_SELECTED_MUSIC:
      return {};
    default:
      return state;
  }
};
