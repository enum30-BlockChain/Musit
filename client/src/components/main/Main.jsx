//CSS
import "./Main.css";
//REACT FUCNTION , REDUX , ETC
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Router, Routes } from "react-router-dom";

//top
import { Searchbar } from "./searchbar/Searchbar";
//bottom
import { Playbar } from "./playbar/Playbar";
import Userinformation from "./mypage/userinformation/Userinformation";

//Main-nav
import Artistsubmit from "./register/artistsubmit/Artistsubmit";
import RegisterUser from "./register/usersubmit/RegisterUser";
import Createmain from "./create/Createmain";
import LandingMainPage from "../landingpage/LandingMainPage";

//Main-nav Mypage
import { Mypage } from "./mypage/Mypage";
import Userdashboard from "./mypage/userdashboard/Userdashboard";
import { Playlist } from "./mypage/playlist/Playlist";
import { Subscription } from "./mypage/subscription/Subscription";
import { History } from "./mypage/history/History";
import { Collection } from "./mypage/collection/Collection";
import MyNFTList from "./mypage/mynftlist/MyNFTList";

// Main-nav music
import Music from "./music/Music";
import Enummusic from "./music/enummusic/Enummusic";
import Genre from "./music/genre/Genre";
import Media from "./music/media/Media";

import Search from "./serach/Search";

//Main-nav Store
import { Store } from "./store/Store";
import Buy from "./store/buy/Buy";
import Bid from "./store/bid/Bid";
import Auction from "./store/Auction";
import Ordinary from "./store/Ordinary";
import MyBids from "./store/mybids/MyBids";

//Main-nav Artist page
import { Artist } from "./artist/Artist";
import Artistinfo from "./artist/artistinfo/Artistinfo";
import { Artistdashbord } from "./artist/artistdashbord/Artistdashbord";
import Album from "./artist/myalbum/Album";

//Main-nav Create
import { Musicupload } from "./create/musicupload/Musicupload";

import FavoriteArtist from "./mypage/favoriteartist/FavoriteArtist";
import FavoriteMusic from "./mypage/favoritemusic/FavoriteMusic";
import MyPlayList from "./mypage/myplaylist/MyPlayList";
import Minting from "./minting/Minting";
import Enroll from "./store/enroll/Enroll";
import { CircularProgress } from "@mui/material";

import Error from "../Error";
import { Test } from "../Test";


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
            {/* Main navbar */}
            <Route index element={<LandingMainPage />} />
            <Route
              path="mypage"
              element={
                user.loading ? (
                  <CircularProgress />
                ) : (
                  <Mypage path="userinformation" />
                )
              }
            >
              <Route index element={<Userdashboard />} />
              <Route path="userinformation" element={<Userinformation />} />
              <Route path="playlist" element={<Playlist />} />
              <Route path="subscription" element={<Subscription />} />
              <Route path="mynftlist" element={<MyNFTList />} />
              <Route path="mynftlist/:tokenId" element={<Enroll />} />
              <Route path="history" element={<History />} />
              <Route path="collection" element={<Collection />} />
              <Route path="favoritartist" element={<FavoriteArtist />} />
              <Route path="favoritmusic" element={<FavoriteMusic />} />
              <Route path="myplaylist" element={<MyPlayList />} />
              <Route path="artistsubmit" element={<Artistsubmit />} />
            </Route>
            <Route path="register" element={<RegisterUser />} />

            {/* Artist */}
            <Route
              path="artist"
              element={
                artist.artist_name !== null ? <Artist path="artist" /> : <></>
              }
            >
              <Route path="createmusic" element={<Musicupload />} />
              <Route path="artistinfo" element={<Artistinfo />} />
              <Route index element={<Artistdashbord />} />
              <Route path="myupload" element={<Album />} />
            </Route>
            <Route path="artistsubmit" element={<Artistsubmit />} />

            {/* Create */}
            <Route path="create" element={<Createmain />}>
              <Route path="nft/:ipfs_hash" element={<Minting />} />
            </Route>

            {/* music */}
            <Route path="music" element={<Music />}>
              <Route index element={<Enummusic />} />
              <Route path="genre" element={<Genre />} />
              <Route path="ranking" element={<Media />} />
            </Route>

            {/* Store */}
            <Route path="store/*" element={<Store />}>
              <Route index element={<Ordinary />} />
              <Route path="auction" element={<Auction />} />
              <Route path="mybids" element={<MyBids />} />
            </Route>
            <Route path="enroll/:tokenId" element={<Enroll />} />
            <Route path="buy/:tokenId" element={<Buy />} />
            <Route path="bid/:itemId" element={<Bid />} />

            <Route path="search" element={<Search />} />
          </Route>
          <Route path="error" element={<Error />} />
          <Route path="test" element={<Test />} />
        </Routes>
      </div>
      {user.address && user.subsEndAt !== 0 && <Playbar />}
    </section>
  );
};
