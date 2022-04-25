import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  loading: false,
  address: null,
  nickname: null,
  nation: null,
  genre: null,
  recent_played: null,
  img: null,
  subscription: null,
  subsEndAt: null,
  ArtistLikes: [],
  MusicLikes: [],
  error: false,
  errorMsg: "",
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.USER_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };

    case ActionTypes.USER_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: "",
      };

    case ActionTypes.USER_READ_SUCCESS:
      return {
        ...state,
        loading: false,
        ...payload,
        error: false,
        errorMsg: "",
      };

    case ActionTypes.USER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        ...payload,
        error: false,
        errorMsg: "",
      };

    case ActionTypes.USER_DELETE_SUCCESS:
      return {
        ...initialState,
        loading: false,
        error: false,
        errorMsg: "",
      };

    case ActionTypes.USER_DATA_FAIL:
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
