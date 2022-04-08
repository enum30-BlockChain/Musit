const initialState = {
  loading: false,

  artistLikeList: [],

  error: false,
  errorMsg: "",
};

const artistLikeDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ARTIST_LIKE_DATA_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "ARTIST_LIKE_DATA_SUCCESS":
      return {
        ...initialState,
        loading: false,
        artistLikeList: action.payload.artistLikeList,
      };
    case "ARTIST_LIKE_DATA_FAILED":
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

export default artistLikeDetailReducer;
