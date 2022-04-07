const initialState = {
  loading: false,

  musicList: [],
  myMusic: [],

  error: false,
  errorMsg: "",
};

export const musicListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MUSIC_LIST_DATA_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "MUSIC_LIST_DATA_SUCCESS":
      return {
        ...initialState,
        loading: false,

        musicList: action.payload.musicList,
      };
    case "MUSIC_LIST_DATA_FAILED":
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export const myMusicListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MY_MUSIC_LIST_DATA_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "MY_MUSIC_LIST_DATA_SUCCESS":
      return {
        ...initialState,
        loading: false,

        myMusic: action.payload.myMusic,
      };
    case "MY_MUSIC_LIST_DATA_FAILED":
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};
