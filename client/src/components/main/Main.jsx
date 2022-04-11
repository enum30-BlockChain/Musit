//CSS
import "./Main.css";

//REACT FUCNTION , REDUX , ETC
import React, { useEffect, useState } from "react";
import { Searchbar } from "./searchbar/Searchbar";
import { Route, Routes } from "react-router-dom";

//Navbar
import { Mypage } from "./mypage/Mypage";
import { Music } from "./music/Music";
import { Store } from "./store/Store";
import { Auctionupload } from "./auction/Auctionupload";
import { Artist } from "./artist/Artist";
import { Dashboard } from "./dashboard/Dashboard";

//Mypage
import Userinformation from "./mypage/userinformation/Userinformation";
import { Favorite } from "./mypage/favorite/Favorite";
import { Subscription } from "./mypage/subscription/";
import { Playlist } from "./mypage/playlist/Playlist";
import { Collection } from "./mypage/collection/Collection";
import { History } from "./mypage/history/History";
import RegisterUser from "./register/user/listener/RegisterUser";
import RegisterArtist from "./register/user/artists/RegisterArtist";
import { ArtistsList } from "./artist/favorite/ArtistsList";
import { Create } from "./create/Create";
import Search from "./serach/Search";
import Mynfts from "./store/mynfts/Mynfts";
import Artistsubmit from "./mypage/artistsubmit/Artistsubmit";
import Album from "./artist/myalbum/Album";

//상단 하단 고정
import { Playbar } from "./playbar/Playbar";

import LandingMainPage from "../landingpage/LandingMainPage";

export const Main = () => {
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

  ////////////////////////////////////////////////////////////////////////////

  return (
    <section className="main">
      {/* <Searchbar address={address} /> */}
      <div className="main-content">
        <Routes>
          <Route path="/">
            <Route index element={<Dashboard />} />
            <Route
              path="mypage"
              element={
                user.nickname && user.address !== undefined ? (
                  <Mypage path="userinformation" address={address} />
                ) : (
                  <RegisterUser address={address} />
                )
              }
            >
              <Route path="userinformation" element={<Userinformation />} />
              <Route path="favorite" element={<Favorite />} />

              <Route path="playlist" element={<Playlist />} />

              <Route path="collection" element={<Collection />} />
              <Route path="history" element={<History />} />
              <Route path="subscription" element={<Subscription />} />
              <Route path="artistsubmit" element={<Artistsubmit />} />
            </Route>
            <Route path="landingpage" element={<LandingMainPage />} />
            <Route path="music/*" element={<Music />} />

            <Route path="store" element={<Store />}>
              <Route path="mynfts" element={<Mynfts />} />
            </Route>
            {/* <Route path="auction" element={<Auction />} /> */}
            <Route path="auctionupload" element={<Auctionupload />} />
            <Route
              path="artist"
              element={
                artist.artist_name !== undefined ? (
                  <Artist />
                ) : (
                  <RegisterArtist />
                )
              }
            >
              <Route path="list" element={<ArtistsList />} />
              <Route path="album" element={<Album />} />
            </Route>

            <Route path="search" element={<Search />} />
            <Route path="cteate" element={<Create />} />
          </Route>
        </Routes>
      </div>
      {/* <Playbar /> */}
      {address === undefined ? <></> : <Playbar />}
    </section>
  );
};
