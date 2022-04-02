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
        address: action.payload.address,
        nickname: action.payload.nickname,
        nation: action.payload.nation,
        genre: action.payload.genre,
        recent_played: action.payload.recent_played,
        img: action.payload.img,
        subscription: action.payload.subscription,
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
          onSaleNfts: action.payload.onSaleNfts
      }
    default:
      return state;
  }
};

export default userReducer;
