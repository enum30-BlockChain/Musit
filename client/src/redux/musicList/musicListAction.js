// log
import axios from "axios";
import store from "../store";

const fetchMusicListDataRequest = () => {
  return {
    type: "MUSIC_LIST_DATA_REQUEST",
  };
};

const fetchMusicListDataSuccess = (payload) => {
  return {
    type: "MUSIC_LIST_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchMusicListDataFailed = (payload) => {
  return {
    type: "MUSIC_LIST_DATA_FAILED",
    payload: payload,
  };
};

export const fetchMusicListData = (payload) => {
  return async (dispatch) => {
    dispatch(fetchMusicListDataRequest());
    try {
      dispatch(fetchMusicListDataSuccess({
        musicList: payload,
      }))
    } catch (error) {
      dispatch(fetchMusicListDataFailed("error!!!"))
    }
  }
}