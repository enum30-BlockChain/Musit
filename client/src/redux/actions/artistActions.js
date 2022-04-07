import { ActionTypes } from "../constants/actionTypes";
import axios from "axios";

export const fetchMyArtistData = () => {
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

export const fetchArtistList = () => {
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
