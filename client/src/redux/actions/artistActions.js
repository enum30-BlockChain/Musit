import { ActionTypes } from "../constants/actionTypes";
import axios from "axios";

/**** Create ****/
/* 아티스트 생성 */
export const createArtistData = (inputs) => {
	return async (dispatch, getState) => {
		dispatch({ type: ActionTypes.ARTIST_DATA_REQUEST });
		try {
			// 메타마스크 reducer에서 주소 가져옴
      console.log(inputs);
			let accounts = getState().metamask.accounts;
      if (accounts.length > 0 ) {
        const url = "http://localhost:5000/artists/";
        await axios.post(url, { ...inputs, user_address: accounts[0] });

        dispatch({ type: ActionTypes.ARTIST_CREATE_SUCCESS });
      } else {
        dispatch({
          type: ActionTypes.ARTIST_DATA_FAIL,
          payload: "Account is not found",
        });
      }
		} catch (error) {
			dispatch({
				type: ActionTypes.ARTIST_DATA_FAIL,
				payload: "Create artist request fail",
			});
		}
	};
};

/**** Read ****/
/* 아티스트 전체 리스트 불러오기 */
export const readArtistList = () => {
	return async (dispatch) => {
		dispatch({ type: ActionTypes.ARTIST_LIST_REQUEST });
		try {
			const url = "http://localhost:5000/artists/";
			const artistList = (await axios.get(url)).data;
			dispatch({
				type: ActionTypes.ARTIST_LIST_READ_SUCCESS,
				payload: artistList,
			});
		} catch (error) {
			dispatch({
				type: ActionTypes.ARTIST_LIST_FAIL,
				payload: "Read artist list request fail",
			});
		}
	};
};

/* 아티스트 정보 불러오기 */
export const readArtistData = () => {
	return async (dispatch, getState) => {
		dispatch({ type: ActionTypes.ARTIST_DATA_REQUEST });

		try {
			// 메타마스크 reducer에서 주소 가져옴
			let accounts = getState().metamask.accounts;
			if (accounts.length > 0) {
				const url = `http://localhost:5000/artists/${accounts[0]}`;
				const artistInfo = (await axios.get(url)).data;
				dispatch({
					type: ActionTypes.ARTIST_READ_SUCCESS,
					payload: artistInfo,
				});
			} else {
				dispatch({
					type: ActionTypes.ARTIST_DATA_FAIL,
					payload: "Account is not found",
				});
			}
		} catch (error) {
			dispatch({
				type: ActionTypes.ARTIST_DATA_FAIL,
				payload: "Read artist request fail",
			});
		}
	};
};

/* 내가 좋아요 누른 아티스트 리스트 불러오기 */
export const readLikeArtistList = () => {
	return async (dispatch, getState) => {
		dispatch({
			type: ActionTypes.LIKE_ARTIST_REQUEST,
		});
		try {
			const accounts = getState().metamask.accounts;
			if (accounts.length > 0) {
				const url = `http://localhost:5000/artists/likes/${accounts[0]}`;
				const likeArtistList = (await axios.get(url)).data;
				dispatch({
					type: ActionTypes.LIKE_ARTIST_SUCCESS,
					payload: likeArtistList,
				});
			} else {
				dispatch({
					type: ActionTypes.LIKE_ARTIST_FAIL,
					payload: "Account is not found",
				});
			}
		} catch (error) {
			dispatch({
				type: ActionTypes.LIKE_ARTIST_FAIL,
				payload: "Read like artist request fail",
			});
		}
	};
};

/**** Update ****/
/* 아티스트 정보 업데이트 */
export const updateArtistData = (inputs) => {
	return async (dispatch, getState) => {
		dispatch({ type: ActionTypes.ARTIST_DATA_REQUEST });
		try {
			// 메타마스크 reducer에서 주소 가져옴
			let accounts = getState().metamask.accounts;

			if (accounts.length > 0) {
				const url = `http://localhost:5000/artists/${accounts[0]}`;
				await axios.patch(url, inputs);

				dispatch({
					type: ActionTypes.ARTIST_UPDATE_SUCCESS,
					payload: inputs,
				});
			} else {
				dispatch({
					type: ActionTypes.ARTIST_DATA_FAIL,
					payload: "Account is not found",
				});
			}
		} catch (error) {
			dispatch({
				type: ActionTypes.ARTIST_DATA_FAIL,
				payload: "Update artist request fail",
			});
		}
	};
};

/**** Delete ****/
/* 아티스트 삭제 */
export const deleteArtist = () => {
	return async (dispatch, getState) => {
		dispatch({ type: ActionTypes.ARTIST_DATA_REQUEST });
		try {
			// 메타마스크 reducer에서 주소 가져옴
			let accounts = getState().metamask.accounts;
			if (accounts.length > 0) {
				const url = `http://localhost:5000/artists/${accounts[0]}`;
				await axios.delete(url);
				dispatch({
					type: ActionTypes.ARTIST_DELETE_SUCCESS,
				});
			} else {
				dispatch({
					type: ActionTypes.ARTIST_DATA_FAIL,
					payload: "Account is not found",
				});
			}
		} catch (error) {
			dispatch({
				type: ActionTypes.ARTIST_DATA_FAIL,
				payload: "Delete artist request fail",
			});
		}
	};
};


/**** Other actions ****/
/* 좋아요 눌렀을 때 동작 */
export const toggleLikeArtist = () => {
	return async (dispatch, getState) => {
		dispatch({ type: ActionTypes.LIKE_ARTIST_REQUEST });
		try {
			const userInfo = getState().user;
			const artistName = getState().selectedArtist.artist_name;

			if (userInfo && artistName) {
				// user 정보, 선택한 아티스트 이름이 있을 때만 실행
				if (userInfo.ArtistLikes.map((like) => like.artist_name).indexOf(artistName) === -1) {
					// 좋아요를 안눌렀으면 생성
					const url = `http://localhost:5000/artists/likes`;
					await axios.post(url, {
						artist_name: artistName,
						user_address: userInfo.address,
					});

					dispatch({
						type: ActionTypes.LIKE_ARTIST_SUCCESS,
						payload: {
							artist_name: artistName,
							user_address: userInfo.address,
						},
					});
				} else {
					// 좋아요를 눌렀으면 다시 삭제
					const url = `http://localhost:5000/artists/likes/${artistName}`;
					await axios.delete(url, { user_address: userInfo.address });

					dispatch({
						type: ActionTypes.LIKE_ARTIST_SUCCESS,
						payload: {
							artist_name: artistName,
							user_address: userInfo.address,
						},
					});
				}
			} else {
				// user 정보, 선택한 아티스트 이름 중 하나라도 없으면 실패
				dispatch({
					type: ActionTypes.LIKE_ARTIST_FAIL,
					payload: "Cannot find user info or selected artist info",
				});
			}
		} catch (err) {
			dispatch({
				type: ActionTypes.LIKE_ARTIST_FAIL,
				payload: "Like artist request fail",
			});
		}
	};
};

/**** Seleted Artist ****/
export const selectedArtist = (artist) => {
	return {
		type: ActionTypes.SELECTED_ARTIST,
		payload: artist,
	};
};

export const removeSelectedArtist = () => {
	return {
		type: ActionTypes.REMOVE_SELECTED_ARTIST,
	};
};
