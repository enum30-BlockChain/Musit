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
import { readMusicList, readLikeMusicList } from "./redux/actions/musicActions";
import { readUserData } from "./redux/actions/userActions";
import Metamask from "./web3/Metamask";

const App = () => {
  const dispatch = useDispatch();
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

  return (
    <>
      <Back />
      <Navbar />
      <Main />
    </>
  );
};

export default App;
