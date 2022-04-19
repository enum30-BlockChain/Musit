import axios from "axios";
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

/* 민팅 동작 */
export const mintingMusitNFT = (inputs) => {
	return async (dispatch, getState) => {
		dispatch({ type: ActionTypes.MUSIT_NFT_MINTING_REQUEST });
		try {
			if (inputs.artist_address !== undefined && inputs.ipfs_hash !== undefined ) {
				const url = "http://localhost:5000/files/upload/metadata";
				const uploadResult = ((await axios.post(url, inputs))).data;
				const result = await Ethers.minting(uploadResult.path)
				dispatch({
					type: ActionTypes.MUSIT_NFT_MINTING_SUCCESS,
					payload: result,
				});
			} else {
				dispatch({
					type: ActionTypes.MUSIT_NFT_MINTING_FAIL,
					payload: "Improper metadata",
				});
			}
		} catch (error) {
			dispatch({
				type: ActionTypes.MUSIT_NFT_MINTING_FAIL,
				payload: "Musit NFT Minting request fail",
			});
		}
	};
};


/**** Seleted nft ****/
export const selectedMusitNFT = (nftInfo) => {
  return {
    type: ActionTypes.SELECTED_MUSIT_NFT,
    payload: nftInfo,
  };
};

export const removeSelectedMusitNFT = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_MUSIT_NFT,
  };
};
