// log
import axios from "axios";
import store from "../store";

const fetchUserListDataRequest = () => {
  return {
    type: "USER_LIST_DATA_REQUEST",
  };
};

const fetchUserListDataSuccess = (payload) => {
  return {
    type: "USER_LIST_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchUserListDataFailed = (payload) => {
  return {
    type: "USER_LIST_DATA_FAILED",
    payload: payload,
  };
};

export const fetchUserListData = (payload) => {
  return async (dispatch) => {
    dispatch(fetchUserListDataRequest());
    try {
      dispatch(fetchUserListDataSuccess({
        userList: payload,
      }))
    } catch (error) {
      dispatch(fetchUserListDataFailed("error!!!"))
    }
  }
}