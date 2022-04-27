import { ActionTypes } from "../constants/actionTypes";
import axios from "axios";
import Ethers from "../../web3/Ethers";

/**** Create ****/
/* 유저 생성 */
export const createUserData = (inputs) => {
  return async (dispatch, getState) => {
    dispatch({ type: ActionTypes.USER_DATA_REQUEST });
    try {
      // 메타마스크 reducer에서 주소 가져옴
      let accounts = getState().metamask.accounts;
      if (accounts.length > 0) {
        const url = "http://54.180.145.5/users/";
        await axios.post(url, { ...inputs, address: accounts[0] });

        dispatch({ type: ActionTypes.USER_CREATE_SUCCESS });
      } else {
        dispatch({
          type: ActionTypes.USER_DATA_FAIL,
          payload: "Account is not found",
        });
      }
    } catch (error) {
      dispatch({
        type: ActionTypes.USER_DATA_FAIL,
        payload: "Create user request fail",
      });
    }
  };
};

/**** Read ****/
/* 유저정보 불러오기 */
export const readUserData = () => {
  return async (dispatch, getState) => {
    dispatch({ type: ActionTypes.USER_DATA_REQUEST });
    try {
      // 메타마스크 reducer에서 주소 가져옴
      let accounts = getState().metamask.accounts;
      if (accounts.length > 0) {
        const url = `http://54.180.145.5/users/${accounts[0]}`;
        const subsEndAt = await Ethers.getSubscriptionEndAt(accounts[0]); // 구독 종료 시점
        const userInfo = (await axios.get(url)).data;
        dispatch({
          type: ActionTypes.USER_READ_SUCCESS,
          payload: { ...userInfo, subsEndAt },
        });
      } else {
        dispatch({
          type: ActionTypes.USER_DATA_FAIL,
          payload: "Account is not found",
        });
      }
    } catch (error) {
      dispatch({
        type: ActionTypes.USER_DATA_FAIL,
        payload: "Read user request fail",
      });
    }
  };
};

/**** Update ****/
/* 유저정보 수정 */
export const updateUserData = (inputs) => {
  return async (dispatch, getState) => {
    dispatch({ type: ActionTypes.USER_DATA_REQUEST });
    try {
      // 메타마스크 reducer에서 주소 가져옴
      let accounts = getState().metamask.accounts;
      if (accounts.length > 0) {
        const url = `http://54.180.145.5/users/${accounts[0]}`;

        await axios.patch(url, inputs);

        dispatch({
          type: ActionTypes.USER_UPDATE_SUCCESS,
          payload: inputs,
        });
      } else {
        dispatch({
          type: ActionTypes.USER_DATA_FAIL,
          payload: "Account is not found",
        });
      }
    } catch (error) {
      dispatch({
        type: ActionTypes.USER_DATA_FAIL,
        payload: "Update user request fail",
      });
    }
  };
};

/**** Delete ****/
/* 유저 삭제 */
/* 기능 삭제 */
export const deleteUser = () => {
  return async (dispatch, getState) => {
    dispatch({ type: ActionTypes.USER_DATA_REQUEST });
    try {
      // 메타마스크 reducer에서 주소 가져옴
      let accounts = getState().metamask.accounts;
      if (accounts.length > 0) {
        const url = `http://54.180.145.5/users/${accounts[0]}`;
        await axios.delete(url);

        dispatch({
          type: ActionTypes.USER_DELETE_SUCCESS,
        });
      } else {
        dispatch({
          type: ActionTypes.USER_DATA_FAIL,
          payload: "Account is not found",
        });
      }
    } catch (error) {
      dispatch({
        type: ActionTypes.USER_DATA_FAIL,
        payload: "Delete user request fail",
      });
    }
  };
};
