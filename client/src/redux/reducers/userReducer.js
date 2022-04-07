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
  error: false,
  errorMsg: "",
};

export const getUserReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.USER_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.USER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        address: payload.address,
        nickname: payload.nickname,
        nation: payload.nation,
        genre: payload.genre,
        recent_played: payload.recent_played,
        img: payload.img,
        subscription: payload.subscription,
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

export const createUserReducer = (state=initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.USER_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.USER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        address: payload.address,
        nickname: payload.nickname,
        nation: payload.nation,
        genre: payload.genre,
        recent_played: payload.recent_played,
        img: payload.img,
        subscription: payload.subscription,
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
}

export const updateUserReducer = (state=initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.USER_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.USER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        address: payload.address,
        nickname: payload.nickname,
        nation: payload.nation,
        genre: payload.genre,
        recent_played: payload.recent_played,
        img: payload.img,
        subscription: payload.subscription,
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
}