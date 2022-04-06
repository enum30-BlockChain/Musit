const initialState = {
  //artist초기값
  artist_name: null,
  img: null,
  likes: null,
  user_address: null,
  //artistList초기값
  artistList: [],

  error: false,
  errorMsg: "",
};

//artist 리듀서
export const artistReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ARTIST_DATA_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "ARTIST_DATA_SUCCESS":
      return {
        ...initialState,
        loading: false,
        user_address: action.payload.user_address,
        artist_name: action.payload.artist_name,
        likes: action.payload.likes,
        img: action.payload.img,
      };
    case "ARTIST_DATA_FAILED":
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

//artistList리듀서
export const aritstListReducer = (state = initialState, action) => {
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
