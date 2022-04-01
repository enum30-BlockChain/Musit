// log
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
          recentPlayed: userInfo.recentPlayed,
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

