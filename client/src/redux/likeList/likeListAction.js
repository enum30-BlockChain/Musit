import axios from "axios";
import store from "../store";

const fetchLikeListDataRequest = () => {
  return {
    type: "LIKE_LIST_DATA_REQUEST",
  };
};

const fetchLikeListDataSuccess = (payload) => {
  return {
    type: "LIKE_LIST_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchLikeListDataFailed = (payload) => {
  return {
    type: "LIKE_LIST_DATA_FAILED",
    payload: payload,
  };
};

export const fetchLikeListData = (payload) => {
  return async (dispatch) => {
    dispatch(fetchLikeListDataRequest());
    try {
      dispatch(
        fetchLikeListDataSuccess({
          likeList: payload,
        })
      );
    } catch (error) {
      dispatch(fetchLikeListDataFailed("error!!!"));
    }
  };
};

/////////////////////////////////////////////////////////
//내가 좋아하는 노래 좋아요 카운트 늘려주기
const fetchLikeAddDataRequest = () => {
  return {
    type: "LIKE_ADD_DATA_REQUEST",
  };
};

const fetchLikeAddDataSuccess = (payload) => {
  return {
    type: "LIKE_ADD_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchLikeAddDataFailed = (payload) => {
  return {
    type: "LIKE_ADD_DATA_FAILED",
    payload: payload,
  };
};

export const fetchLikeAddData = (address) => {
  return async (dispatch) => {
    dispatch(fetchLikeAddDataRequest());
    try {
      const musiclikeadd = store.getState().musiclikeadd;
      const url = "http://localhost:5000/music/like";
      const likeInfo = (await axios.post(url, { address })).data;
      dispatch(
        fetchLikeAddDataSuccess({
          ...musiclikeadd,
          likeAdd: likeInfo,
        })
      );
    } catch (error) {
      dispatch(fetchLikeAddDataFailed("error!!!"));
    }
  };
};
