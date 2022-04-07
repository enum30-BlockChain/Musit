import { ActionTypes } from "../constants/actionTypes";
import axios from "axios";

export const readMusicList = () => {
  return async (dispatch, getState) => {
    dispatch({type: ActionTypes.MUSIC_LIST_REQUEST});
    try {
      const url = "http://localhost:5000/music/list";
      const musicList = (await axios.get(url)).data;
      dispatch({
        type: ActionTypes.MUSIC_LIST_SUCCESS,
        payload: musicList
      });
    } 
    catch (error) {
      dispatch({
        type: ActionTypes.MUSIC_LIST_FAIL,
        payload: "Get music list request fail",
      });
    }
  };
};

export const selectedMusic = (music) => {
  return {
    type: ActionTypes.SELECTED_MUSIC,
    payload: music
  }
}

export const removeSelectedMusic = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_MUSIC,
  }
}