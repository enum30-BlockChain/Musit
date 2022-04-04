const initialState = {
  loading: false,

  artist_artist_name: null,
  user_address: null,

  error: false,
  errorMsg: "",
};

const aritstListReducer = (state = initialState, action) => {
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

        artist_artist_name: action.payload.artist_name,
        user_address: action.payload.user_address,
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

export default aritstListReducer;
