// log
import axios from "axios";
import store from "../store";

const fetchUserDataRequest = () => {
  return {
    type: "DATA_REQUEST",
  };
};

const fetchUserDataSuccess = (payload) => {
  return {
    type: "DATA_SUCCESS",
    payload: payload,
  };
};

const fetchUserDataFailed = (payload) => {
  return {
    type: "DATA_FAILED",
    payload: payload,
  };
};

export const fetchUserData = (address) => {
  return async (dispatch) => {
    dispatch(fetchUserDataRequest());
    try {
      const userData = store.getState().user;
      const url = "http://localhost:5000/users/signin";
      const userInfo = (await axios.post(url, { address })).data;
      dispatch(
        fetchUserDataSuccess({
          ...userData,
          address: address,
          nickname: userInfo.nickname,
          nation: userInfo.nation,
          genre: userInfo.genre,
          recent_played: userInfo.recent_played,
          img: userInfo.img,
          subscription: userInfo.subscription,
        })
      );
    } catch (error) {
      dispatch(fetchUserDataFailed("error!!!"));
    }
  };
};
