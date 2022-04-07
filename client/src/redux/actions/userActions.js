import { ActionTypes } from "../constants/actionTypes";
import axios from "axios";

/* 유저 생성 */
export const createUserData = (inputs) => {
	return async (dispatch, getState) => {
		dispatch({ type: ActionTypes.USER_DATA_REQUEST });
		try {
			// 메타마스크 reducer에서 주소 가져옴
			let accounts = getState().metamask.accounts;

			const url = "http://localhost:5000/users/";
			const createData = (
				await axios.post(url, inputs)
			).data;

			dispatch({
				type: ActionTypes.USER_CREATE_SUCCESS,
			});
		} catch (error) {
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

			const url = `http://localhost:5000/users/${accounts[0]}`;
			const userInfo = (await axios.get(url)).data;

			dispatch({
				type: ActionTypes.USER_READ_SUCCESS,
				payload: { ...userInfo, address: accounts[0] },
			});
		} catch (error) {
			dispatch({
				type: ActionTypes.USER_DATA_FAIL,
				payload: "Read user request fail",
			});
		}
	};
};

/* 유저정보 수정 */
export const updateUserData = (inputs) => {
	return async (dispatch, getState) => {
		dispatch({ type: ActionTypes.USER_DATA_REQUEST });
		try {
			// 메타마스크 reducer에서 주소 가져옴
			let accounts = getState().metamask.accounts;
      let {address, genre, img, nation, nickname, recent_played, subscription} = getState().user;
      let userState = {
        address, genre, img, nation, nickname, recent_played, subscription
      }

			const url = `http://localhost:5000/users/${accounts[0]}`;
			const userInfo = (
				await axios.patch(url, { ...userState, ...inputs })
			).data;

			dispatch({
				type: ActionTypes.USER_UPDATE_SUCCESS,
				payload: userInfo,
			});
		} catch (error) {
			dispatch({
				type: ActionTypes.USER_DATA_FAIL,
				payload: "Update user request fail",
			});
		}
	};
};

/* 유저 삭제 */
export const deleteUserData = (inputs) => {
	return async (dispatch, getState) => {
		dispatch({ type: ActionTypes.USER_DATA_REQUEST });
		try {
			// 메타마스크 reducer에서 주소 가져옴
			let accounts = getState().metamask.accounts;

			const url = `http://localhost:5000/users/${accounts[0]}`;
			const result = (await axios.delete(url)).data;

			dispatch({
				type: ActionTypes.USER_DELETE_SUCCESS,
			});
		} catch (error) {
			dispatch({
				type: ActionTypes.USER_DATA_FAIL,
				payload: "Delete user request fail",
			});
		}
	};
};
