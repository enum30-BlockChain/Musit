// log
import axios from "axios";
import store from "../store";

const fetchSearchingDataRequest = () => {
  return {
    type: "SEARCHING_DATA_REQUEST",
  };
};

const fetchSearchingDataSuccess = (payload) => {
  return {
    type: "SEARCHING_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchSearchingDataFailed = (payload) => {
  return {
    type: "SEARCHING_DATA_FAILED",
    payload: payload,
  };
};

export const fetchSearchingData = (payload) => {
  return async (dispatch) => {
    dispatch(fetchSearchingDataRequest());
    try {
      dispatch(fetchSearchingDataSuccess({
        searching: payload,
      }))
    } catch (error) {
      dispatch(fetchSearchingDataFailed("error!!!"))
    }
  }
}