const initialState = {
  loading: false,

  artistList: [],

  error: false,
  errorMsg: "",
};

const aritstListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ARTIST_LIST_DATA_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "ARTIST_LIST_DATA_SUCCESS":
      return {
        ...initialState,
        loading: false,
        artistList: action.payload.artistList,
      };
    case "ARTIST_LIST_DATA_FAILED":
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
