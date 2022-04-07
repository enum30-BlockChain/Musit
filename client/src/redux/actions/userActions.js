import { ActionTypes } from "../constants/actionTypes";
import axios from "axios";

export const fetchUserData = () => {
  return async (dispatch) => {
    dispatch({type: ActionTypes.USER_DATA_REQUEST});
    try {
      let address;
      const metamask = window.ethereum;
      const accounts = await metamask.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        address = accounts[0]
        const url = "http://localhost:5000/users/signin";
        const userInfo = (await axios.post(url, { address })).data;
        dispatch({
          type: ActionTypes.USER_DATA_SUCCESS,
          payload: userInfo
        });
      } else {
        dispatch({
          type: ActionTypes.USER_DATA_FAIL,
          payload: "Cannot find address",
        });
      }
    } catch (error) {
      dispatch({
        type: ActionTypes.USER_DATA_FAIL,
        payload: "Get user request fail",
      });
    }
  };
};

