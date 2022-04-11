const initialState = {
  loading: false,

  searching:"",
  
  error: false,
  errorMsg: "",
};

const searchingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCHING_DATA_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "SEARCHING_DATA_SUCCESS":
      return {
        ...initialState,
        loading: false,

        searching: action.payload.searching,
        
      };
      case "SEARCHING_DATA_FAILED":
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

export default searchingReducer;
