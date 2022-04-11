const initialState = {
  //artist초기값
  artist_name: null,
  img: null,
  likes: null,
  user_address: null,
  // navbar에 아티스트일 때 조건 렌더 요구사항
  isArtist: false,
  //artistList초기값
  artistList: [],
  artistCount: "",
  artistLikeList: [],
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

export const aritstCountReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ARTIST_COUNTDATA_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "ARTIST_COUNTDATA_SUCCESS":
      return {
        ...initialState,
        loading: false,
        artistCount: action.payload.artistCount,
      };
    case "ARTIST_COUNTDATA_FAILED":
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

//artistLikeList리듀서
export const aritstLikeListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ARTIST_LiKELIST_DATA_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "ARTIST_LiKELIST_DATA_SUCCESS":
      return {
        ...initialState,
        loading: false,
        artistLikeList: action.payload.artistLikeList,
      };
    case "ARTIST_LiKELIST_DATA_FAILED":
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
