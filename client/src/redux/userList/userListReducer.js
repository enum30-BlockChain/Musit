const initialState = {
  loading: false,

  userList: null,
  
  error: false,
  errorMsg: "",
};

const userListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LIST_DATA_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "USER_LIST_DATA_SUCCESS":
      return {
        ...initialState,
        loading: false,

        userList: action.payload.userList,
        
      };
      case "USER_LIST_DATA_FAILED":
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

export default userListReducer;
