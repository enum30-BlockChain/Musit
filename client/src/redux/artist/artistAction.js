// log
import axios from "axios";
import store from "../store";
//Artist 액션 타입 지정
const fetchArtistDataRequest = () => {
  return {
    type: "ARTIST_DATA_REQUEST",
  };
};

const fetchArtistDataSuccess = (payload) => {
  return {
    type: "ARTIST_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchArtistDataFailed = (payload) => {
  return {
    type: "ARTIST_DATA_FAILED",
    payload: payload,
  };
};
//////////////////////////////////////////////////

//ArtistList 액션 타입 지정
const fetchArtistListDataRequest = () => {
  return {
    type: "ARTIST_LIST_DATA_REQUEST",
  };
};

const fetchArtistListDataSuccess = (payload) => {
  return {
    type: "ARTIST_LIST_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchArtistListDataFailed = (payload) => {
  return {
    type: "ARTIST_LIST_DATA_FAILED",
    payload: payload,
  };
};

//////////////////////////////////////////////////

const fetchArtistCountDataRequest = () => {
  return {
    type: "ARTIST_COUNTDATA_REQUEST",
  };
};

const fetchArtistCountDataSuccess = (payload) => {
  return {
    type: "ARTIST_COUNTDATA_SUCCESS",
    payload: payload,
  };
};

const fetchArtistCountDataFailed = (payload) => {
  return {
    type: "ARTIST_COUNTDATA_FAILED",
    payload: payload,
  };
};

//////////////////////////////////////////////////

//ArtistLikeList 액션 타입 지정
const fetchArtistLikeDataRequest = () => {
  return {
    type: "ARTIST_LiKELIST_DATA_REQUEST",
  };
};

const fetchArtisLikeDataSuccess = (payload) => {
  return {
    type: "ARTIST_LiKELIST_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchArtistLikeDataFailed = (payload) => {
  return {
    type: "ARTIST_LiKELIST_DATA_FAILED",
    payload: payload,
  };
};

//Artist 액션 함수 선언
export const fetchArtistData = (address) => {
  return async (dispatch) => {
    dispatch(fetchArtistDataRequest());
    try {
      const artist = store.getState().artist;
      const url = "http://localhost:5000/artists/signin";
      const artistInfo = (await axios.post(url, { address })).data;
      dispatch(
        fetchArtistDataSuccess({
          ...artist,
          user_address: address,
          artist_name: artistInfo.artist_name,
          img: artistInfo.img,
          likes: artistInfo.likes,
        })
      );
    } catch (error) {
      dispatch(fetchArtistDataFailed("error!!!"));
    }
  };
};

//ArtistList 액션 함수 선언
export const fetchArtistListData = (address) => {
  return async (dispatch) => {
    dispatch(fetchArtistListDataRequest());
    try {
      const artistlist = store.getState().artistlist;
      const url = "http://localhost:5000/artists/list";
      const listInfo = (await axios.get(url)).data;

      dispatch(
        fetchArtistListDataSuccess({
          ...artistlist,
          artistList: listInfo,
        })
      );
    } catch (error) {
      dispatch(fetchArtistListDataFailed("error!!!"));
    }
  };
};

//Artist like count액션 함수 선언
export const fetchArtistLikeData = (address, selected) => {
  return async (dispatch) => {
    dispatch(fetchArtistCountDataRequest());
    try {
      const artistlikeCount = store.getState().artistlikeCount;
      const url = "http://localhost:5000/artists/likes/like";
      const likeInfo = (await axios.post(url, { address, selected })).data;
      console.log(222222222222222);
      console.log(likeInfo);
      console.log(222222222222222);
      dispatch(
        fetchArtistCountDataSuccess({
          ...artistlikeCount,
          artistCount: likeInfo,
        })
      );
    } catch (error) {
      dispatch(fetchArtistCountDataFailed("error!!!"));
    }
  };
};

//Artist like list액션 함수 선언
export const fetchArtistLikeListData = (address) => {
  return async (dispatch) => {
    dispatch(fetchArtistLikeDataRequest());
    try {
      const artistlikelist = store.getState().artistlikelist;
      const url = "http://localhost:5000/artists/likes/list";
      const likeInfo = (await axios.post(url, { address })).data;
      dispatch(
        fetchArtisLikeDataSuccess({
          ...artistlikelist,
          artistLikeList: likeInfo,
        })
      );
    } catch (error) {
      dispatch(fetchArtistLikeDataFailed("error!!!"));
    }
  };
};
