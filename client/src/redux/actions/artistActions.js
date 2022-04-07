import { ActionTypes } from "../constants/actionTypes";
import axios from "axios";

export const fetchMyArtistData = () => {
  return async (dispatch, getState) => {
    dispatch({type: ActionTypes.ARTIST_DATA_REQUEST});
    try {
      const url = "http://localhost:5000/artists/signin";
      const artistInfo = (await axios.post(url)).data;
      dispatch({
        type: ActionTypes.ARTIST_DATA_SUCCESS,
        payload: artistInfo
      });
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
    dispatch({type: ActionTypes.ARTIST_DATA_REQUEST});
    try {
      const url = "http://localhost:5000/artists/list";
      const artistList = (await axios.get(url)).data;
      dispatch({
        type: ActionTypes.ARTIST_DATA_SUCCESS,
        payload: artistList
      });
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
