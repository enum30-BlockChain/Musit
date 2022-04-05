// log
import axios from "axios";
import store from "../store";

const fetchArtistLikeDataRequest = () => {
  return {
    type: "ARTIST_LIKECOUNT_DATA_REQUEST",
  };
};

const fetchArtistLikeDataSuccess = (payload) => {
  return {
    type: "ARTIST_LIKECOUNT_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchArtistLikeDataFailed = (payload) => {
  return {
    type: "ARTIST_LIKECOUNT_DATA_FAILED",
    payload: payload,
  };
};

export const fetchArtistLikeCountData = (address) => {
  return async (dispatch) => {
    dispatch(fetchArtistLikeDataRequest());
    try {
      const artistlikecount = store.getState().artistlikecount;
      const url = "http://localhost:5000/artists/likes/like";
      const likeInfo = (await axios.post(url, { address })).data;
      dispatch(
        fetchArtistLikeDataSuccess({
          ...artistlikecount,
          artistLikeList: likeInfo,
        })
      );
    } catch (error) {
      dispatch(fetchArtistLikeDataFailed("error!!!"));
    }
  };
};
