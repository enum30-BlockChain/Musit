import { ActionTypes } from "../constants/actionTypes";
import axios from "axios";

/**** Create ****/
export const createMusicData = (imgFormData, audioFormData, input) => {
  return async (dispatch, getState) => {
    dispatch({ type: ActionTypes.MUSIC_DATA_REQUEST });
    try {
      const artistInfo = getState().myArtist;

      const imgUrl = (
        await axios.post("http://localhost:5000/files/imgupload", imgFormData)
      ).data;
      console.log(imgUrl);
      console.log(audioFormData.get("audio"));

      const audioIpfsHash = (
        await axios.post(
          "http://localhost:5000/files/audioupload",
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

export const readLikeMusicList = (ipfs_hash) => {
  return async (dispatch, getState) => {
    dispatch({ type: ActionTypes.LIKE_MUSIC_REQUEST });
    try {
      const url = `http://localhost:5000/music/${ipfs_hash}`;
      const musicList = (await axios.get(url)).data;
      console.log(11111111111111111);
      console.log(musicList);
      console.log(11111111111111111);
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

/**** Delete ****/
export const deleteMusicList = (input) => {
  return async (dispatch, getState) => {
    dispatch({ type: ActionTypes.MUSIC_DATA_REQUEST });
    try {
      const url = "http://localhost:5000/music/";
      const musicList = (await axios.delete(url, input)).data;
      dispatch({
        type: ActionTypes.MUSIC_DELETE_SUCCESS,
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
