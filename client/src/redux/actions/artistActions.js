import { ActionTypes } from "../constants/actionTypes";
import axios from "axios";

export const fetchMyArtistData = () => {
  return async (dispatch, getState) => {
    dispatch({type: ActionTypes.ARTIST_DATA_REQUEST});

    try {
      // 메타마스크 reducer에서 주소 가져옴
      let accounts = getState().metamask.accounts;

      // 주소가 있으면 success
      if (accounts.length > 0) {
        const url = "http://localhost:5000/artists/signin";
        const artistInfo = (await axios.post(url, { address: accounts[0] })).data;
        dispatch({
          type: ActionTypes.ARTIST_DATA_SUCCESS,
          payload: artistInfo
        });
      } 
      // 주소가 없으면 fail
      else {
        dispatch({
          type: ActionTypes.ARTIST_DATA_FAIL,
          payload: "Cannot find address",
        });
      }
    } 
    // 요청 자체가 에러가 나면 fail
    catch (error) {
      dispatch({
        type: ActionTypes.ARTIST_DATA_FAIL,
        payload: "Get user request fail",
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
    // 요청 자체가 에러가 나면 fail
    catch (error) {
      dispatch({
        type: ActionTypes.ARTIST_LIST_FAIL,
        payload: "Get user request fail",
      });
    }
  };
};
