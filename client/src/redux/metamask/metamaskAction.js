// log
import axios from "axios";
import Metamask from "../../web3/Metamask";
import store from "../store";

const fetchMetamaskDataRequest = () => {
  return {
    type: "DATA_REQUEST",
  };
};

const fetchMetamaskDataSuccess = (payload) => {
  return {
    type: "DATA_SUCCESS",
    payload: payload,
  };
};

const fetchMetamaskDataFailed = (payload) => {
  return {
    type: "DATA_FAILED",
    payload: payload,
  };
};

export const fetchMetamaskData = () => {
  return async (dispatch) => {
    dispatch(fetchMetamaskDataRequest());
    try {
      const metamaskData = store.getState().metamaskData;
      const accounts = await Metamask.getAccounts();
      const network = await Metamask.getNetwork();

      Metamask.walletListener();

      dispatch(
        fetchMetamaskDataSuccess({
          ...metamaskData,
          address: accounts.data[0],
          network: network.data,
          message: `${accounts.message}\n${network.message}`
        })
      );
    } catch (error) {
      dispatch(fetchMetamaskDataFailed("error!!!"));
    }
  };
};


