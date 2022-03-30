import React, { useEffect, useState } from "react";
import { Searchbar } from "./searchbar/Searchbar";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./dashboard/Dashboard";
import "./Main.css";
import { Mypage } from "./mypage/Mypage";
import { Music } from "./music/Music";
import { Store } from "./store/Store";
import { Auction } from "./auction/Auction";
import { Artist } from "./artist/Artist";
import Metamask from "../../web3/Metamask";
import { Playbar } from "./playbar/Playbar";
import { Favorite } from "./mypage/favorite/Favorite";
import { Subscription } from "./mypage/subscription/Subscription";
import { Playlist } from "./mypage/playlist/Playlist";
import { Collection } from "./mypage/collection/Collection";
import { History } from "./mypage/history/History";
import RegisterUser from "./register/user/listener/RegisterUser";
import RegisterArtist from "./register/user/artists/RegisterArtist";

import axios from "axios";
import { Create } from "./create/Create";

export const Main = () => {
  const [address, setAddress] = useState("");
  const [loginState, setLoginState] = useState();
  const [songList, setSongList] = useState("");
  const [likeList, setLikeList] = useState("");
  const [userList, setUserList] = useState("");
  const [artistState, setArtistState] = useState({ address: "" });

  async function init() {
    const reponse = await Metamask.getAccounts(setAddress);
    await Metamask.walletListener(setAddress);
    //나의 지금 로그인상태 확인
    loginCheck(reponse.data[0]);
    getSongList();
    getUser();
    getLikeList();
    artistsCheck(reponse.data[0]);
    sidebarToggle();
  }

  useEffect(() => {
    init();
  }, []);

  const artistsCheck = async (address) => {
    const url = "http://localhost:5000/artists/signin";
    const response = await axios.post(url, { address });
    return setArtistState(response.data);
  };
  const loginCheck = async (address) => {
    const url = "http://localhost:5000/users/signin";
    const response = await axios.post(url, { address });
    return setLoginState(response.data);
  };

  const sidebarToggle = () => {
    const sidebarToggle = document.querySelector(".sidebar-toggle");
    const sidebar = document.querySelector("nav");

    let getMenuStatus = localStorage.getItem("menu_status");
    if (getMenuStatus && getMenuStatus === "close") {
      sidebar.classList.toggle("close");
    }

    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("close");
      if (sidebar.classList.contains("close")) {
        localStorage.setItem("menu_status", "close");
      } else {
        localStorage.setItem("menu_status", "open");
      }
    });
  };

  const getSongList = async () => {
    await axios
      .get("http://localhost:5000/files")
      .then((res) => {
        setSongList(res.data);
      })
      .catch((err) => alert("노래목록을 불러오지못했습니다.", err));
  };

  const getUser = async () => {
    await axios
      .get("http://localhost:5000/users")
      .then((res) => {
        setUserList(res.data);
      })
      .catch((err) => alert("errrrrrrr.", err));
  };

  const getLikeList = async () => {
    await axios
      .post("http://localhost:5000/music/likes/like", { address })
      .then((res) => {
        setLikeList(res.data);
      })
      .catch((err) => alert("errrrrrrr.", err));
  };

  return (
    <section className="main">
      <Searchbar address={address} />
      <div className="main-content">
        <Routes>
          <Route path="/">
            <Route index element={<Dashboard />} />

            <Route
              path="mypage"
              element={
                loginState ? (
                  <Mypage address={address} />
                ) : (
                  <RegisterUser address={address} />
                )
              }
            >
              <Route path="favorite" element={<Favorite address={address} />} />
              <Route path="playlist" element={<Playlist address={address} />} />
              <Route
                path="collection"
                element={<Collection address={address} />}
              />
              <Route path="history" element={<History address={address} />} />
              <Route
                path="subscription"
                element={<Subscription address={address} />}
              />
            </Route>

            <Route
              path="music"
              element={
                <Music
                  songList={songList}
                  likeList={likeList}
                  userList={userList}
                />
              }
            />
            <Route path="store" element={<Store />} />
            <Route path="auction" element={<Auction />} />
            <Route
              path="artist"
              element={
                artistState ? (
                  <Artist
                    address={address}
                    artistState={artistState}
                    loginState={loginState}
                  />
                ) : (
                  <RegisterArtist address={address} />
                )
              }
            />
            <Route path="cteate" element={<Create address={address} />} />
          </Route>
        </Routes>
      </div>
      <Playbar songList={likeList} address={address} userList={userList} />
    </section>
  );
};
