const initialState = {
  loading: false,

  likeList: [],
  likeAdd: [],

  error: false,
  errorMsg: "",
};

export const likeListReducer = (state = initialState, action) => {
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

//music count add reducer
export const likeAddReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LIKE_ADD_DATA_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "LIKE_ADD_DATA_SUCCESS":
      return {
        ...initialState,
        loading: false,

        likeAdd: action.payload.likeAdd,
      };
    case "LIKE_ADD_DATA_FAILED":
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
