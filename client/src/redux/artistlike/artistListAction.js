// log
import axios from "axios";
import store from "../store";

const fetchArtistListDataRequest = () => {
  return {
    type: "ARTIST_LIKE_DATA_REQUEST",
  };
};

const fetchArtistListDataSuccess = (payload) => {
  return {
    type: "ARTIST_LIKE_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchArtistListDataFailed = (payload) => {
  return {
    type: "ARTIST_LIKE_DATA_FAILED",
    payload: payload,
  };
};

export const fetchArtistListData = (address) => {
  return async (dispatch) => {
    dispatch(fetchArtistListDataRequest());
    try {
      const artistlike = store.getState().artistlike;
      const url = "http://localhost:5000/artists/likes/list/detail";
      const likeInfo = (await axios.post(url, { address })).data;
      console.log(1111111111111);
      console.log(likeInfo);
      console.log(1111111111111);
      dispatch(
        fetchArtistListDataSuccess({
          ...artistlike,
          artist_artist_name: likeInfo.artist_name,
          user_address: likeInfo.user_address,
        })
      );
    } catch (error) {
      dispatch(fetchArtistListDataFailed("error!!!"));
    }
  };
};
