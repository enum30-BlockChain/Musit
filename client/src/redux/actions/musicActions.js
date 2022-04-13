import { ActionTypes } from "../constants/actionTypes";
import axios from "axios";

/**** Create ****/
export const createMusicData = (imgFormData, audioFormData, input) => {
  return async (dispatch, getState) => {
    dispatch({ type: ActionTypes.MUSIC_DATA_REQUEST });
    try {
      const artistInfo = getState().myArtist;

      const imgUrl = (
        await axios.post("http://localhost:5000/files/upload/img", imgFormData)
      ).data;
      console.log(imgUrl);
      console.log(audioFormData.get("audio"));

      const audioIpfsHash = (
        await axios.post(
          "http://localhost:5000/files/upload/audio",
          audioFormData
        )
      ).data;

      const musicData = {
        ...input,
        img_file: imgUrl,
        ipfs_hash: audioIpfsHash,
      };
      console.log(musicData);
      const createData = await axios.post(
        "http://localhost:5000/music/",
        musicData
      );
      console.log(createData);
      dispatch({ type: ActionTypes.MUSIC_CREATE_SUCCESS });
    } catch (error) {
      dispatch({
        type: ActionTypes.MUSIC_DATA_FAIL,
        payload: "Create user request fail",
      });
    }
  };
};

/**** Read ****/
export const readMusicList = () => {
  return async (dispatch, getState) => {
    dispatch({ type: ActionTypes.MUSIC_LIST_REQUEST });
    try {
      const url = "http://localhost:5000/music/";
      const musicList = (await axios.get(url)).data;
      dispatch({
        type: ActionTypes.MUSIC_LIST_SUCCESS,
        payload: musicList,
      });
    } catch (error) {
      dispatch({
        type: ActionTypes.MUSIC_LIST_FAIL,
        payload: "Read music list request fail",
      });
    }
  };
};

export const readMusicData = (ipfs_hash) => {
  return async (dispatch, getState) => {
    dispatch({ type: ActionTypes.MUSIC_DATA_REQUEST });
    try {
      const url = `http://localhost:5000/music/${ipfs_hash}`;
      const musicList = (await axios.get(url)).data;
      dispatch({
        type: ActionTypes.MUSIC_READ_SUCCESS,
        payload: musicList,
      });
    } catch (error) {
      dispatch({
        type: ActionTypes.MUSIC_DATA_FAIL,
        payload: "Read music request fail",
      });
    }
  };
};

export const readLikeMusicList = () => {
  return async (dispatch, getState) => {
    dispatch({ type: ActionTypes.LIKE_MUSIC_REQUEST });
    try {
      let accounts = getState().metamask.accounts;
      const url = `http://localhost:5000/music/likes/${accounts[0]}`;
      const musicList = (await axios.get(url)).data;
      dispatch({
        type: ActionTypes.LIKE_MUSIC_SUCCESS,
        payload: musicList,
      });
    } catch (error) {
      dispatch({
        type: ActionTypes.LIKE_MUSIC_FAIL,
        payload: "Read music request fail",
      });
    }
  };
};

/**** Update ****/
export const updateMusicList = (input) => {
  return async (dispatch, getState) => {
    dispatch({ type: ActionTypes.MUSIC_DATA_REQUEST });
    try {
      const url = "http://localhost:5000/music/";
      const musicList = (await axios.patch(url, input)).data;
      dispatch({
        type: ActionTypes.MUSIC_UPDATE_SUCCESS,
        payload: musicList,
      });
    } catch (error) {
      dispatch({
        type: ActionTypes.MUSIC_DATA_FAIL,
        payload: "Read music list request fail",
      });
    }
  };
};
/**** Other music ****/
/* 좋아요 눌렀을 때 동작 */
export const toggleLikeMusic = (music) => {
	return async (dispatch, getState) => {
		dispatch({ type: ActionTypes.LIKE_MUSIC_REQUEST });
		try {
      const user = getState().user;
      const likeMusic = getState().likeMusic;	
      const likeFilter =likeMusic.data.filter((song) => song.ipfs_hash.indexOf(music.ipfs_hash)> -1);	
			if (likeMusic && music.ipfs_hash) {
				// user 정보, 선택한 아티스트 이름이 있을 때만 실행
				if (0 >= likeFilter.length) {
					// 좋아요를 안눌렀으면 생성
					const url = `http://localhost:5000/music/likes`;
					await axios.post(url, {
						ipfs_hash: music.ipfs_hash,
						user_address: user.address,
					});
          dispatch({
            type:ActionTypes.LIKE_MUSIC_SUCCESS,
            payload:[...likeMusic.data,music],
          })
				} else {
					// 좋아요를 눌렀으면 다시 삭제
					const url = `http://localhost:5000/music/likes/${music.ipfs_hash}`;
					await axios.delete(url,  {data:{user_address: user.address}} );

          const newMySonglist = likeMusic.data.filter((song)=>{
            return song.ipfs_hash.indexOf(music.ipfs_hash)<0;
          }) 
					dispatch({
						type: ActionTypes.LIKE_MUSIC_SUCCESS,
						payload:[...newMySonglist],
					});
				}
			} else {
				// user 정보, 선택한 아티스트 이름 중 하나라도 없으면 실패
				dispatch({
					type: ActionTypes.LIKE_MUSIC_FAIL,
					payload: "Cannot find user info or selected artist info",
				});
			}
		} catch (err) {
			dispatch({
				type: ActionTypes.LIKE_MUSIC_FAIL,
				payload: "Like music request fail",
			});
		}
	};
};
/**** Delete ****/
export const deleteMusic = (input) => {
  return async (dispatch, getState) => {
    dispatch({ type: ActionTypes.MUSIC_DATA_REQUEST });
    try {
      const url = "http://localhost:5000/music/";
      await axios.delete(url, input);
      dispatch({
        type: ActionTypes.MUSIC_DELETE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ActionTypes.MUSIC_DATA_FAIL,
        payload: "Read music list request fail",
      });
    }
  };
};

/**** Seleted Music ****/
export const selectedMusic = (music) => {
  return {
    type: ActionTypes.SELECTED_MUSIC,
    payload: music,
  };
};

export const removeSelectedMusic = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_MUSIC,
  };
};
