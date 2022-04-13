//CSS
import "./Main.css";
//REACT FUCNTION , REDUX , ETC
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { Mypage } from "./mypage/Mypage";
import Userinformation from "./mypage/userinformation/Userinformation";
import { Subscription } from "./mypage/subscription/Subscription";
import { History } from "./mypage/history/History";
import { Collection } from "./mypage/collection/Collection";
import Artistsubmit from "./mypage/artistsubmit/Artistsubmit";

import { Dashboard } from "./dashboard/Dashboard";
import { Searchbar } from "./searchbar/Searchbar";
import { Artist } from "./artist/Artist";

import RegisterUser from "./register/RegisterUser";

import { Store } from "./store/Store";

import { Playbar } from "./playbar/Playbar";
import FavoriteArtist from "./mypage/favoriteartist/FavoriteArtist";
import FavoriteMusic from "./mypage/favoritemusic/FavoriteMusic";
import MyPlayList from "./mypage/myplaylist/MyPlayList";
import { ArtistsList } from "./artist/favorite/ArtistsList";
import Album from "./artist/myalbum/Album";

export const Main = () => {
  const user = useSelector((state) => state.user);
  const artist = useSelector((state) => state.artist);

  useEffect(() => {
    sidebarToggle();
  }, []);

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

  return (
    <section className="main">
      <Searchbar />
      <div className="main-content">
        <Routes>
          <Route path="/">
            <Route index element={<Dashboard />} />
            <Route
              path="mypage"
              element={
                user.nickname !== undefined ? (
                  <Mypage path="userinformation" />
                ) : (
                  <RegisterUser />
                )
              }
            >
              <Route path="userinformation" element={<Userinformation />} />
              <Route path="subscription" element={<Subscription />} />
              <Route path="history" element={<History />} />
              <Route path="collection" element={<Collection />} />
              <Route path="artistsubmit" element={<Artistsubmit />} />
              <Route path="favoritartist" element={<FavoriteArtist />} />
              <Route path="favoritemusic" element={<FavoriteMusic />} />
              <Route path="myplaylist" element={<MyPlayList />} />
            </Route>
            <Route
              path="artist"
              element={
                artist.artist_name !== undefined ? <Artist /> : <Artistsubmit />
              }
            >
              <Route path="list" element={<ArtistsList />} />
              <Route path="album" element={<Album />} />
            </Route>
            <Route path="store/*" element={<Store />} />
          </Route>
        </Routes>
      </div>
      {user.loading === true ? <></> : <Playbar />}
    </section>
  );
};
