import { ActionTypes } from "../constants/actionTypes";
import axios from "axios";

/* 유저 생성 */
// inputs : {nickname: "머시기", ...}
export const createUserData = (inputs) => {
  return async (dispatch, getState) => {
    dispatch({type: ActionTypes.USER_DATA_REQUEST});
    try {
      // 메타마스크 reducer에서 주소 가져옴
      let accounts = getState().metamask.accounts;

      const url = "http://localhost:5000/users/create";
      const userInfo = (await axios.post(url, { ...inputs, address: accounts[0] })).data;
      console.log(userInfo);
      dispatch({
        type: ActionTypes.USER_DATA_SUCCESS,
        payload: userInfo
      });
    } 
    catch (error) {
      dispatch({
        type: ActionTypes.USER_DATA_FAIL,
        payload: "Create user request fail",
      });
    }
  };
};


/* 유저정보 불러오기 */
export const readUserData = () => {
	return async (dispatch, getState) => {
		dispatch({ type: ActionTypes.USER_DATA_REQUEST });
		try {
			// 메타마스크 reducer에서 주소 가져옴
			let accounts = getState().metamask.accounts;

			const url = "http://localhost:5000/users/signin";
      const userInfo = (await axios.post(url, { address: accounts[0] })).data;
      dispatch({
        type: ActionTypes.USER_DATA_SUCCESS,
        payload: {...userInfo, address: accounts[0]}
      });
		} catch (error) {
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

      const url = "http://localhost:5000/users/change";
      const userInfo = (await axios.post(url, { ...inputs, address: accounts[0] })).data;
      dispatch({
        type: ActionTypes.USER_DATA_SUCCESS,
        payload: userInfo
      });
    } 
    catch (error) {
      dispatch({
        type: ActionTypes.USER_DATA_FAIL,
        payload: "Get user request fail",
      });
    }
  };
};

/* 유저 삭제 */
// inputs : {nickname: "머시기", ...}
export const deleteUserData = (inputs) => {
  return async (dispatch, getState) => {
    dispatch({type: ActionTypes.USER_DATA_REQUEST});
    try {
      // 메타마스크 reducer에서 주소 가져옴
      let accounts = getState().metamask.accounts;

      const url = "http://localhost:5000/users/signup";
      const userInfo = (await axios.post(url, { ...inputs, address: accounts[0] })).data;
      console.log(userInfo);
      dispatch({
        type: ActionTypes.USER_DATA_SUCCESS,
        payload: userInfo
      });
    } 
    catch (error) {
      dispatch({
        type: ActionTypes.USER_DATA_FAIL,
        payload: "Get user request fail",
      });
    }
  };
};