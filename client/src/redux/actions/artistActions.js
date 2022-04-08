import { ActionTypes } from "../constants/actionTypes";
import axios from "axios";

export const readMyArtistData = () => {
	return async (dispatch, getState) => {
		dispatch({ type: ActionTypes.ARTIST_DATA_REQUEST });

		try {
			// 메타마스크 reducer에서 주소 가져옴
			let accounts = getState().metamask.accounts;
			const url = "http://localhost:5000/artists/signin";
			const artistInfo = (await axios.post(url, { address: accounts[0] })).data;
			dispatch({
				type: ActionTypes.ARTIST_DATA_SUCCESS,
				payload: artistInfo,
			});
		} catch (error) {
			dispatch({
				type: ActionTypes.ARTIST_DATA_FAIL,
				payload: "Get artist request fail",
			});
		}
	};
};

export const updateMyArtistData = (inputs) => {
  return async (dispatch, getState) => {
    dispatch({type: ActionTypes.ARTIST_DATA_REQUEST});
    try {
      // 메타마스크 reducer에서 주소 가져옴
      let accounts = getState().metamask.accounts;

      const url = "http://localhost:5000/users/change";
      const userInfo = (await axios.post(url, { ...inputs, address: accounts[0] })).data;
      dispatch({
        type: ActionTypes.ARTIST_DATA_SUCCESS,
        payload: userInfo
      });
    } 
    catch (error) {
      dispatch({
        type: ActionTypes.ARTIST_DATA_FAIL,
        payload: "Get user request fail",
      });
    }
  };
};

export const createArtistData = (inputs) => {
  return async (dispatch, getState) => {
    dispatch({type: ActionTypes.ARTIST_DATA_REQUEST});
    try {
      // 메타마스크 reducer에서 주소 가져옴
      let accounts = getState().metamask.accounts;

      const url = "http://localhost:5000/users/change";
      const userInfo = (await axios.post(url, { ...inputs, address: accounts[0] })).data;
      dispatch({
        type: ActionTypes.ARTIST_DATA_SUCCESS,
        payload: userInfo
      });
    } 
    catch (error) {
      dispatch({
        type: ActionTypes.ARTIST_DATA_FAIL,
        payload: "Get user request fail",
      });
    }
  };
};


export const readArtistList = () => {
  return async (dispatch, getState) => {
    dispatch({type: ActionTypes.ARTIST_LIST_REQUEST});
    try {
      const url = "http://localhost:5000/artists/list";
      const artistList = (await axios.get(url)).data;
      dispatch({
        type: ActionTypes.ARTIST_LIST_SUCCESS,
        payload: artistList
      });
    } 
    catch (error) {
      dispatch({
        type: ActionTypes.ARTIST_LIST_FAIL,
        payload: "Get artist list request fail",
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
