const initialState = {
  loading: false,

  musicList: [],
  
  error: false,
  errorMsg: "",
};

const musicListReducer = (state = initialState, action) => {
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

export default musicListReducer;
