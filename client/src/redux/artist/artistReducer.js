const initialState = {
  artist_name: null,
  img: null,
  likes: null,
  user_address: null,
  error: false,
  errorMsg: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DATA_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "DATA_SUCCESS":
      return {
        ...initialState,
        loading: false,
        user_address: action.payload.user_address,
        artist_name: action.payload.artist_name,
        likes: action.payload.likes,
        img: action.payload.img,
      };
    case "DATA_FAILED":
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    case "SUCCESS_SUBMIT_SALE":
      return {
        ...initialState,
        onSaleNfts: action.payload.onSaleNfts,
      };
    default:
      return state;
  }
};

export default userReducer;
