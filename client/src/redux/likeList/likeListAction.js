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
      console.log(payload);
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
