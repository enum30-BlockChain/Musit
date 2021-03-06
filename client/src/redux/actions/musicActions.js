import { ActionTypes } from "../constants/actionTypes";
import axios from "axios";

/**** Create ****/
export const createMusicData = (imgFormData, audioFormData, input) => {
  return async (dispatch, getState) => {
    dispatch({ type: ActionTypes.MUSIC_DATA_REQUEST });
    try {
      const artistInfo = getState().myArtist;

      const imgUrl = (
        await axios.post("http://54.180.145.5/files/upload/img", imgFormData)
      ).data;

      const audioIpfsHash = (
        await axios.post(
          "http://54.180.145.5/files/upload/audio",
          audioFormData
        )
      ).data;

      const musicData = {
        ...input,
        img_file: imgUrl,
        ipfs_hash: audioIpfsHash,
      };
      const createData = await axios.post(
        "http://54.180.145.5/music/",
        musicData
      );
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
      const url = "http://54.180.145.5/music/";
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
      if (ipfs_hash) {
        const url = `http://54.180.145.5/music/${ipfs_hash}`;
        const musicList = (await axios.get(url)).data;
        dispatch({
          type: ActionTypes.MUSIC_READ_SUCCESS,
          payload: musicList,
        });
      } else {
        dispatch({
          type: ActionTypes.MUSIC_DATA_FAIL,
          payload: "No ipfs_hash found",
        });
      }
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
      const url = `http://54.180.145.5/music/likes/${accounts[0]}`;
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
export const updateMusicList = (input, hash) => {
  return async (dispatch, getState) => {
    dispatch({ type: ActionTypes.MUSIC_DATA_REQUEST });
    try {
      const url = `http://54.180.145.5/music/${hash}`;
      const musicList = (await axios.patch(url, input)).data;
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

/**** Other music ****/
/* ????????? ????????? ??? ?????? */
export const toggleLikeMusic = (music) => {
  return async (dispatch, getState) => {
    dispatch({ type: ActionTypes.LIKE_MUSIC_REQUEST });
    try {
      const user = getState().user;
      const likeMusic = getState().likeMusic;
      const likeFilter = likeMusic.data.filter(
        (song) => song.ipfs_hash.indexOf(music.ipfs_hash) > -1
      );
      if (likeMusic && music.ipfs_hash) {
        // user ??????, ????????? ???????????? ????????? ?????? ?????? ??????
        if (0 >= likeFilter.length) {
          // ???????????? ??????????????? ??????
          const url = `http://54.180.145.5/music/likes`;
          await axios.post(url, {
            ipfs_hash: music.ipfs_hash,
            user_address: user.address,
          });
          dispatch({
            type: ActionTypes.LIKE_MUSIC_SUCCESS,
            payload: [...likeMusic.data, music],
          });
        } else {
          // ???????????? ???????????? ?????? ??????
          const url = `http://54.180.145.5/music/likes/${music.ipfs_hash}`;
          await axios.delete(url, { data: { user_address: user.address } });

          const newMySonglist = likeMusic.data.filter((song) => {
            return song.ipfs_hash.indexOf(music.ipfs_hash) < 0;
          });
          dispatch({
            type: ActionTypes.LIKE_MUSIC_SUCCESS,
            payload: [...newMySonglist],
          });
        }
      } else {
        // user ??????, ????????? ???????????? ?????? ??? ???????????? ????????? ??????
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

/**** Recent Music ****/
export const setRecentMusic = (music) => {
  return {
    type: ActionTypes.RECENT_MUSIC,
    payload: music,
  };
};

export const removeRecentMusic = () => {
  return {
    type: ActionTypes.REMOVE_RECENT_MUSIC,
  };
};
