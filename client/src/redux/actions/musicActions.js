import { ActionTypes } from "../constants/actionTypes";
import axios from "axios";

export const createMusicData = (imgFormData, audioFormData) => {
  return async (dispatch, getState) => {
    dispatch({ type: ActionTypes.MUSIC_LIST_REQUEST });
		try {
      const artistInfo = getState().myArtist;
      const img_file = (await axios
      .post("http://localhost:5000/files/imgupload",imgFormData)).data;
      console.log(img_file);
      console.log(audioFormData);

      
      // const musicData = {
      //   artist_name : artistInfo.artist_name,
      //   img_file: img_file,

      // }
			// const createData = 
			// 	await axios.post("http://localhost:5000/music/", musicData)
      // console.log(createData);
			dispatch({
				type: ActionTypes.MUSIC_CREATE_SUCCESS,
        payload: createData,
			});
		} catch (error) {
			dispatch({
				type: ActionTypes.MUSIC_LIST_FAIL,
				payload: "Create user request fail",
			});
		}
	};
};

export const readMusicList = () => {
  return async (dispatch, getState) => {
    dispatch({type: ActionTypes.MUSIC_LIST_REQUEST});
    try {
      const url = "http://localhost:5000/music/";
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