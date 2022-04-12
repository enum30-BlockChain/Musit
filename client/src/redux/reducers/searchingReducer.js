import { ActionTypes } from "../constants/actionTypes";

const initialState = {
    loading: false,
    searching:"",
    error: false,
    errorMsg: "",
  };
  
  export const searchingReducer = (state = initialState,{type,payload}) => {
    switch (type) {
      case ActionTypes.SEARCHING_DATA_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ActionTypes.SEARCHING_DATA_SUCCESS:
        return {
          ...state,
          loading: false,
          searching: payload,
          
        };
        case ActionTypes.SEARCHING_DATA_FAILED:
          return {
            ...state,
            loading: false,
            error: true,
            errorMsg:payload,
          };
        
      default:
        return state;
    }
  };
  
  