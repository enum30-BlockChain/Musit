import "./App.css";
import { Navbar } from "./components/navbar/Navbar";
import Back from "./components/landingpage/back/Back";
import React, { useEffect } from "react";
import { Main } from "./components/main/Main";
import { useDispatch, useSelector } from "react-redux";
import {
  readArtistList,
  readArtistData,
  readLikeArtistList,
} from "./redux/actions/artistActions";
import { readMetamaskData } from "./redux/actions/metamaskActions";
import { getRecentMusic, readMusicList, readLikeMusicList } from "./redux/actions/musicActions";
import { readUserData } from "./redux/actions/userActions";
import Metamask from "./web3/Metamask";

const App = () => {
  const dispatch = useDispatch();
  const musicList = useSelector((state) => state.musicList).data;
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const init = async () => {
      await dispatch(readMetamaskData());
      await dispatch(readArtistList());
      await dispatch(readArtistData());
      await dispatch(readMusicList());
      await dispatch(readLikeMusicList());
      await dispatch(readLikeArtistList());
      await dispatch(readUserData());
      Metamask.walletListener();
    };
    init();
  }, []);

  useEffect(() => {
    if (user.recent_played) {
      const songTitle = user.recent_played.split("-").pop()
      console.log(songTitle)
      dispatch(getRecentMusic(songTitle))
    }
  }, [user.loading])

  return (
    <>
      <Back />
      <Navbar />
      <Main />
    </>
  );
};

export default App;
