import { ActionTypes } from "../constants/actionTypes";
import axios from "axios";

/**** Create ****/
/* 아티스트 생성 */
export const createArtistData = (inputs) => {
	return async (dispatch, getState) => {
		dispatch({ type: ActionTypes.ARTIST_DATA_REQUEST });
		try {
			// 메타마스크 reducer에서 주소 가져옴
			let accounts = getState().metamask.accounts;

			const url = "http://localhost:5000/artists/";
			const createData = (
				await axios.post(url, { ...inputs, user_address: accounts[0] })
			).data;
			dispatch({
				type: ActionTypes.ARTIST_CREATE_SUCCESS,
				payload: createData,
			});
		} catch (error) {
			dispatch({
				type: ActionTypes.ARTIST_DATA_FAIL,
				payload: "Create artist request fail",
			});
		}
	};
};

/**** Read ****/
/* 아티스트 전체 리스트 불러오기 */
export const readArtistList = () => {
	return async (dispatch, getState) => {
		dispatch({ type: ActionTypes.ARTIST_LIST_REQUEST });
		try {
			const url = "http://localhost:5000/artists/";
			const artistList = (await axios.get(url)).data;
			dispatch({
				type: ActionTypes.ARTIST_LIST_READ_SUCCESS,
				payload: artistList,
			});
		} catch (error) {
			dispatch({
				type: ActionTypes.ARTIST_LIST_FAIL,
				payload: "Read artist list request fail",
			});
		}
	};
};

/* 나의 아티스트 정보 불러오기 */
export const readMyArtistData = () => {
	return async (dispatch, getState) => {
		dispatch({ type: ActionTypes.ARTIST_DATA_REQUEST });

		try {
			// 메타마스크 reducer에서 주소 가져옴
			let accounts = getState().metamask.accounts;

			const url = `http://localhost:5000/artists/${accounts[0]}`;
			const artistInfo = (await axios.get(url)).data;
			dispatch({
				type: ActionTypes.ARTIST_READ_SUCCESS,
				payload: artistInfo,
			});
		} catch (error) {
			dispatch({
				type: ActionTypes.ARTIST_DATA_FAIL,
				payload: "Read artist request fail",
			});
		}
	};
};

/**** Update ****/
/* 아티스트 정보 업데이트 */
export const updateMyArtistData = (inputs) => {
	return async (dispatch, getState) => {
		dispatch({ type: ActionTypes.ARTIST_DATA_REQUEST });
		try {
			// 메타마스크 reducer에서 주소 가져옴
			let accounts = getState().metamask.accounts;

			const url = `http://localhost:5000/artists/${accounts[0]}`;
			await axios.patch(url, inputs);

			dispatch({
				type: ActionTypes.ARTIST_UPDATE_SUCCESS,
				payload: inputs,
			});
		} catch (error) {
			dispatch({
				type: ActionTypes.ARTIST_DATA_FAIL,
				payload: "Update artist request fail",
			});
		}
	};
};

/**** Delete ****/
/* 아티스트 삭제 */
export const deleteMyArtistData = () => {
	return async (dispatch, getState) => {
		dispatch({ type: ActionTypes.ARTIST_DATA_REQUEST });
		try {
			// 메타마스크 reducer에서 주소 가져옴
			let accounts = getState().metamask.accounts;

			const url = `http://localhost:5000/artists/${accounts[0]}`;
			const userInfo = (await axios.delete(url)).data;
			dispatch({
				type: ActionTypes.ARTIST_DELETE_SUCCESS,
			});
		} catch (error) {
			dispatch({
				type: ActionTypes.ARTIST_DATA_FAIL,
				payload: "Delete artist request fail",
			});
		}
	};
};

export const selectedArtist = (artist) => {
	return {
		type: ActionTypes.SELECTED_ARTIST,
		payload: artist,
	};
};

export const removeSelectedArtist = () => {
	return {
		type: ActionTypes.REMOVE_SELECTED_ARTIST,
	};
};
