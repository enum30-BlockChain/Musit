const initialState = {
  loading: false,

  likeList: null,
  
  error: false,
  errorMsg: "",
};

const likeListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LIKE_LIST_DATA_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "LIKE_LIST_DATA_SUCCESS":
      return {
        ...initialState,
        loading: false,

        likeList: action.payload.likeList,
      };
      case "LIKE_LIST_DATA_FAILED":
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

export default likeListReducer;
