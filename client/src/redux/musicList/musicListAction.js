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
      const myalbum = store.getState().myalbum;
      const url = "http://localhost:5000/artists/music";
      const albumInfo = (await axios.post(url, { address })).data;
      dispatch(
        fetchMyMusicListDataSuccess({
          ...myalbum,
          myMusic: albumInfo,
        })
      );
    } catch (error) {
      dispatch(fetchMyMusicListDataFailed("error!!!"));
    }
  };
};

//내가 좋아하는 함수의 길이를 불러오는 함수
export const fetchMusicCountData = (address) => {
  return async (dispatch) => {
    dispatch(fetchMusicCountDataRequest());
    try {
      const musicLikeCount = store.getState().musicLikeCount;
      const url = "http://localhost:5000/music/likes/like";
      const albumInfo = (await axios.post(url, { address })).data;
      console.log(albumInfo);
      dispatch(
        fetchMyMusicCountDataSuccess({
          ...musicLikeCount,
          musicLikeList: albumInfo,
        })
      );
    } catch (error) {
      dispatch(fetchMusicCountDataFailed("error!!!"));
    }
  };
};

//나의 앨범리스트
const fetchMusicCountDataRequest = () => {
  return {
    type: "MY_MUSIC_COUNT_DATA_REQUEST",
  };
};

const fetchMyMusicCountDataSuccess = (payload) => {
  return {
    type: "MY_MUSIC_COUNT_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchMusicCountDataFailed = (payload) => {
  return {
    type: "MY_MUSIC_COUNT_DATA_FAILED",
    payload: payload,
  };
};
