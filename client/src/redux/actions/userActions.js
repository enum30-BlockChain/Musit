import { ActionTypes } from "../constants/actionTypes";
import axios from "axios";

export const fetchUserData = () => {
  return async (dispatch, getState) => {
    dispatch({type: ActionTypes.USER_DATA_REQUEST});
    try {
      // 메타마스크 reducer에서 주소 가져옴
      let accounts = getState().metamask.accounts;

      // 주소가 있으면 success
      if (accounts.length > 0) {
        const url = "http://localhost:5000/users/signin";
        const userInfo = (await axios.post(url, { address: accounts[0] })).data;
        dispatch({
          type: ActionTypes.USER_DATA_SUCCESS,
          payload: {...userInfo, address: accounts[0]}
        });
      } 
      // 주소가 없으면 fail
      else {
        dispatch({
          type: ActionTypes.USER_DATA_FAIL,
          payload: "Cannot find address",
        });
      }
    } 
    // 요청 자체가 에러가 나면 fail
    catch (error) {
      dispatch({
        type: ActionTypes.USER_DATA_FAIL,
        payload: "Get user request fail",
      });
    }
  };
};

/* 유저정보 수정 */
// inputs : {nickname: "머시기", ...}
export const updateUserData = (inputs) => {
  return async (dispatch, getState) => {
    dispatch({type: ActionTypes.USER_DATA_REQUEST});
    try {
      // 메타마스크 reducer에서 주소 가져옴
      let accounts = getState().metamask.accounts;

      // 주소가 있으면 success
      if (accounts.length > 0) {
        const url = "http://localhost:5000/users/change";
        const userInfo = (await axios.post(url, { ...inputs, address: accounts[0] })).data;
        dispatch({
          type: ActionTypes.USER_DATA_SUCCESS,
          payload: {...userInfo, address: accounts[0]}
        });
      } 
      // 주소가 없으면 fail
      else {
        dispatch({
          type: ActionTypes.USER_DATA_FAIL,
          payload: "Cannot find address",
        });
      }
    } 
    // 요청 자체가 에러가 나면 fail
    catch (error) {
      dispatch({
        type: ActionTypes.USER_DATA_FAIL,
        payload: "Get user request fail",
      });
    }
  };
};