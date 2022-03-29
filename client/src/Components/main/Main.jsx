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
import { Playlist } from "./mypage/playlist/Playlist";
import { Collection } from "./mypage/collection/Collection";
import { History } from "./mypage/history/History";
import Register from "./register/Register";
import Listener from "./register/user/listener/Listener";

import axios from "axios";

export const Main = () => {
  const [address, setAddress] = useState("");
  async function init() {
    await Metamask.getAccounts(setAddress);
    await Metamask.walletListener(setAddress);
  }
  //나의 지금 로그인상태 확인
  async function loginCheck() {
    const url = "http://localhost:5000/users/signin";
    const response = await axios.post(url, { address });
    setLoginState(response.data);
  }

  useEffect(() => {
    init();
    loginCheck();
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
  }, [address]);
  /////////////////////////////////////////////////////

  const [loginState, setLoginState] = useState("");

  console.log(loginState);

  return (
    <section className="main">
      <Searchbar address={address} />
      <div className="main-content">
        <Routes>
          <Route path="/">
            <Route index element={<Dashboard />} />
            {address === loginState.address ? (
              <Route path="mypage" element={<Mypage address={address} />}>
                <Route
                  path="favorite"
                  element={<Favorite address={address} />}
                />
                <Route
                  path="playlist"
                  element={<Playlist address={address} />}
                />
                <Route
                  path="collection"
                  element={<Collection address={address} />}
                />
                <Route path="history" element={<History address={address} />} />
              </Route>
            ) : (
              <Route path="register" element={<Register />}>
                <Route
                  path="listener"
                  element={<Listener address={address} />}
                />
                <Route path="artists" element={<Artist address={address} />} />
              </Route>
            )}
            <Route path="music" element={<Music />} />
            <Route path="store" element={<Store />} />
            <Route path="auction" element={<Auction />} />
            <Route path="artist" element={<Artist />} />
          </Route>
        </Routes>
      </div>
      <Playbar />
    </section>
  );
};
