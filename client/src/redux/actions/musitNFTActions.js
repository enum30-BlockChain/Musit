import Ethers from "../../web3/Ethers";
import { ActionTypes } from "../constants/actionTypes";

/* 내가 소유한 NFT 리스트 불러오기 */
export const readMyNFTList = () => {
	return async (dispatch, getState) => {
		dispatch({ type: ActionTypes.MUSIT_NFT_LIST_REQUEST });
		try {
			const user = getState().user;
			if (user.address) {
				const myNFTList = await Ethers.myNFTList(user.address)
				dispatch({
					type: ActionTypes.MUSIT_NFT_LIST_SUCCESS,
					payload: myNFTList,
				});
			} else {
				dispatch({
					type: ActionTypes.MUSIT_NFT_LIST_FAIL,
					payload: "Cannot find user address",
				});
			}
		} catch (error) {
			dispatch({
				type: ActionTypes.MUSIT_NFT_LIST_FAIL,
				payload: "Read Minting list failed",
			});
		}
	};
};

/* 내가 민팅했던 NFT 리스트 불러오기 */
export const readMyMintedNFTList = () => {
	return async (dispatch, getState) => {
		dispatch({ type: ActionTypes.MUSIT_NFT_MINTED_LIST_REQUEST });
		try {
			const user = getState().user;
      console.log(user.address);
      
			if (user.address) {
        const myMintedNFTList = await Ethers.myMintingNFTList(user.address)
				dispatch({
					type: ActionTypes.MUSIT_NFT_MINTED_LIST_SUCCESS,
					payload: myMintedNFTList,
				});
			} else {
				dispatch({
					type: ActionTypes.MUSIT_NFT_MINTED_LIST_FAIL,
					payload: "Cannot find user address",
				});
			}
		} catch (error) {
			dispatch({
				type: ActionTypes.MUSIT_NFT_MINTED_LIST_FAIL,
				payload: "Read minted list failed",
			});
		}
	};
};
