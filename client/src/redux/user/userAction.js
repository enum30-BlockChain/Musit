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

export const fetchUserData = (userInfo) => {
  return async (dispatch) => {
    dispatch(fetchUserDataRequest());
    try {
      

      dispatch(
        fetchUserDataSuccess({
          address: userInfo.address,
          nickname: userInfo.nickname,
          nation: userInfo.nation,
          genre: userInfo.genre,
          recent_played: userInfo.recent_played,
          image: userInfo.image,
          subscription: userInfo.subscription,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchUserDataFailed("Could not load data from contract."));
    }
  };
};

export const testFunc = (address) => {
  return async (dispatch) => {
    dispatch(fetchUserDataRequest());
    try {
      const userData = store.getState().user;
      const url = "http://localhost:5000/users/signin";
      const userInfo = (await axios.post(url, { address })).data;
      console.log(userInfo)
      dispatch(fetchUserDataSuccess({
        ...userData,
        address: address,
        nickname: userInfo.nickname,
        nation: userInfo.nation,
        genre: userInfo.genre,
        recent_played: userInfo.recent_played,
        img: userInfo.img,
        subscription: userInfo.subscription,
      }))
    } catch (error) {
      dispatch(fetchUserDataFailed("error!!!"))
    }
  }
}