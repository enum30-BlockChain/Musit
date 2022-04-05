// log
import axios from "axios";
import store from "../store";

const fetchArtistDataRequest = () => {
  return {
    type: "DATA_REQUEST",
  };
};

const fetchArtistDataSuccess = (payload) => {
  return {
    type: "DATA_SUCCESS",
    payload: payload,
  };
};

const fetchArtistDataFailed = (payload) => {
  return {
    type: "DATA_FAILED",
    payload: payload,
  };
};

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
