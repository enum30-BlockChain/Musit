import { ActionTypes } from "../constants/actionTypes";

export const readMetamaskData = () => {
	return async (dispatch, getState) => {
		dispatch({ type: ActionTypes.METAMASK_DATA_REQUEST });
		try {
			const metamask = window.ethereum;
			// 메타마스크 주소, 네트워크 정보 요청
			const accounts = await metamask.request({
				method: "eth_accounts",
			});
			const network = await metamask.request({
				method: "eth_chainId",
			});
      
      dispatch({
        type: ActionTypes.METAMASK_DATA_SUCCESS,
        payload: {
          accounts: accounts,
          network: chainIdToNetworkName(network),
        },
      });
		} catch (error) {
			// 요청 과정에서 에러가 생겨도 fail
			dispatch({
				type: ActionTypes.METAMASK_DATA_FAIL,
				payload: "Get metamask data",
			});
		}
	};
};

// 네트워크 16진수 => 이름
const chainIdToNetworkName = (chainId) => {
	let network;
	switch (parseInt(chainId, 16)) {
		case 1:
			network = "Mainnet";
			break;
		case 3:
			network = "Ropsten";
			break;
		case 4:
			network = "Rinkeby";
			break;
		case 5:
			network = "Goerli";
			break;
		case 6:
			network = "Kovan";
			break;
		case 1337:
			network = "Localhost";
			break;
		case 31337:
			network = "Hardhat";
			break;
		default:
			network = "Unknown";
			break;
	}
	return network;
};
