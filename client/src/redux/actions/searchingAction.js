import { ActionTypes } from "../constants/actionTypes";
import axios from "axios";

export const searchingReducer = (payload) => {
	return async (dispatch) => {
	  dispatch({type: ActionTypes.SEARCHING_DATA_REQUEST});
	  try {
		dispatch({
			type: ActionTypes.SEARCHING_DATA_SUCCESS,
			payload: payload,
		});
	  } catch (error) {
		dispatch({
			type: ActionTypes.SEARCHING_DATA_FAILED,
			payload: "Read like artist request fail",
		});
	  }
	}
  }