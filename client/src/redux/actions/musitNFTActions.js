import Ethers from "../../web3/Ethers";
import { ActionTypes } from "../constants/actionTypes";

/* 내가 소유한 NFT 리스트 불러오기 */
export const readMyNFTList = () => {
	return async (dispatch, getState) => {
		dispatch({ type: ActionTypes.MUSIT_NFT_LIST_REQUEST });
		try {
			const user = getState((state) => state.user);
			if (user.address) {
				const musitNFT = Ethers.loadContracts().musitNFT;
				const filter = musitNFT.filters.Minted(null, null, user.address);
				const myMintedList = await Promise.all(
					(
						await musitNFT.queryFilter(filter)
					).map(async (event) => {
						const item = event.args;
						const tokenURI = await musitNFT.tokenURI(item.tokenId);
						const metadata = await (await fetch(tokenURI)).json();
						const tokenId = item.tokenId.toNumber();

						return {
							tokenId,
							...metadata,
						};
					})
				);
				console.log(myMintedList);
				dispatch({
					type: ActionTypes.MUSIT_NFT_LIST_SUCCESS,
					payload: myMintedList,
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
				payload: "Read minted list failed",
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
        const musitNFT = Ethers.loadContracts().musitNFT;
				const filter = musitNFT.filters.Minted(null, null, user.address);
				const myMintedList = await Promise.all(
					(
						await musitNFT.queryFilter(filter)
					).map(async (event) => {
						const item = event.args;
						const tokenURI = await musitNFT.tokenURI(item.tokenId);
						const metadata = await (await fetch(tokenURI)).json();
						const tokenId = item.tokenId.toNumber();

						return {
							tokenId,
							...metadata,
						};
					})
				);
				console.log(myMintedList);
				dispatch({
					type: ActionTypes.MUSIT_NFT_MINTED_LIST_SUCCESS,
					payload: myMintedList,
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
