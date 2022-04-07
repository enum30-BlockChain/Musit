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

//나의 앨범리스트
const fetchMyMusicListDataRequest = () => {
  return {
    type: "MY_MUSIC_LIST_DATA_REQUEST",
  };
};

const fetchMyMusicListDataSuccess = (payload) => {
  return {
    type: "MY_MUSIC_LIST_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchMyMusicListDataFailed = (payload) => {
  return {
    type: "MY_MUSIC_LIST_DATA_FAILED",
    payload: payload,
  };
};

export const fetchMusicListData = (payload) => {
  return async (dispatch) => {
    dispatch(fetchMusicListDataRequest());
    try {
      dispatch(
        fetchMusicListDataSuccess({
          musicList: payload,
        })
      );
    } catch (error) {
      dispatch(fetchMusicListDataFailed("error!!!"));
    }
  };
};
//나의 앨범을 불러오는 함수
export const fetchMyMusicListData = (address) => {
  return async (dispatch) => {
    dispatch(fetchMyMusicListDataRequest());
    try {
      const myelbum = store.getState().myelbum;
      const url = "http://localhost:5000/artists/music";
      const elbumInfo = (await axios.post(url, { address })).data;
      dispatch(
        fetchMyMusicListDataSuccess({
          ...myelbum,
          myMusic: elbumInfo,
        })
      );
    } catch (error) {
      dispatch(fetchMyMusicListDataFailed("error!!!"));
    }
  };
};
