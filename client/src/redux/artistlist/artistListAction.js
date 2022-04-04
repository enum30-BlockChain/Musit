// log
import axios from "axios";
import store from "../store";

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

export const fetchArtistListData = (address) => {
  return async (dispatch) => {
    dispatch(fetchArtistListDataRequest());
    try {
      const artistlist = store.getState().artistlist;
      const url = "http://localhost:5000/artists/list";
      const listInfo = (await axios.get(url)).data;
      console.log(1111111111);
      console.log(listInfo);
      console.log(1111111111);
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
