// log
import axios from "axios";
import Metamask from "../../web3/Metamask";
import store from "../store";

const fetchMetamaskDataRequest = () => {
  return {
    type: "METAMASK_DATA_REQUEST",
  };
};

const fetchMetamaskDataSuccess = (payload) => {
  return {
    type: "METAMASK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchMetamaskDataFailed = (payload) => {
  return {
    type: "METAMASK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchMetamaskAddress = () => {
  return async (dispatch) => {
    dispatch(fetchMetamaskDataRequest());
    try {
      const metamaskData = store.getState().metamaskData;
      const accounts = await Metamask.getAccounts();

      Metamask.walletListener();

      dispatch(
        fetchMetamaskDataSuccess({
          ...metamaskData,
          address: accounts.data[0],
        })
      );
    } catch (error) {
      dispatch(fetchMetamaskDataFailed("error!!!"));
    }
  };
};


