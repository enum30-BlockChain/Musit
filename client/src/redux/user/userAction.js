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

export const fetchUserData = (account) => {
  return async (dispatch) => {
    dispatch(fetchUserDataRequest());
    try {
      dispatch(
        fetchUserDataSuccess({
          address: address,
          nickname: nickname,
          nation: nation,
          genre: genre,
          recentPlayed: recentPlayed,
          image: image,
          subscription: subscription,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchUserDataFailed("Could not load data from contract."));
    }
  };
};

