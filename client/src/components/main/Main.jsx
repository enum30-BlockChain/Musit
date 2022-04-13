//CSS
import "./Main.css";
//REACT FUCNTION , REDUX , ETC
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Router, Routes } from "react-router-dom";

//top
import { Searchbar } from "./searchbar/Searchbar";
//bottom
import { Dashboard } from "./dashboard/Dashboard";
import { Playbar } from "./playbar/Playbar";
// import RegisterUser from "./register/RegisterUser";

//Main-nav
import Musiclist from "./musiclist/Musiclist";
import Auctionmarket from "./auctionmarket/Auctionmarket";
import Createmain from "./create/Createmain";

//Main-nav Mypage
import { Mypage } from "./mypage/Mypage";
import Userinformation from "./mypage/userinformation/Userinformation";
import { Musicfavorite } from "./mypage/musicfavorite/Musicfavorite";
import { Artistfavorite } from "./mypage/artistfavorite/Artistfavorite";
import { Playlist } from "./mypage/playlist/Playlist";
import { Subscription } from "./mypage/subscription/Subscription";
import { History } from "./mypage/history/History";
import { Collection } from "./mypage/collection/Collection";
// import { Favorite } from "./mypage/favorite/Favorite";
import Artistsubmit from "./mypage/artistsubmit/Artistsubmit";
import MyNFTList from "./mypage/mynftlist/MyNFTList";

//Main-nav Store
import { Store } from "./store/Store";
import { Music } from "./music/Music";
import Search from "./serach/Search";

//Main-nav Artist page
import Artistinfo from "./artist/artistinfo/Artistinfo";
import { Artist } from "./artist/Artist";
import Artistdashbord from "./artist/artistdashbord/Artistdashbord";
import Album from "./artist/myalbum/Album";
// import Createnft from "./artist/createnft/Createnft";
import Auctionupload from "./artist/auctionupload/Auctionupload";

//Main-nav Create
import { Musicupload } from "./create/musicupload/Musicupload";
import Musicuploadlist from "./create/musicuploadlist/Musicuploadlist";
import Nftupload from "./create/nftupload/Nftupload";
import Nftuploadlist from "./create/nftuploadlist/Nftuploadlist";

import RegisterUser from "./register/RegisterUser";

import FavoriteArtist from "./mypage/favoriteartist/FavoriteArtist";
import FavoriteMusic from "./mypage/favoritemusic/FavoriteMusic";
import MyPlayList from "./mypage/myplaylist/MyPlayList";
// import { ArtistsList } from "./artist/favorite/ArtistsList";

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
            <Route path="musiclist" element={<Musiclist />} />

            {/* <Route path="store/*" element={<Store />} /> */}
            <Route path="auctionmarket" element={<Auctionmarket />} />

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
              <Route path="musicfavorite" element={<Musicfavorite />} />
              <Route path="artistfavorite" element={<Artistfavorite />} />
              <Route path="playlist" element={<Playlist />} />
              <Route path="subscription" element={<Subscription />} />
              <Route path="mynftlist" element={<MyNFTList />} />
              <Route path="history" element={<History />} />
              <Route path="collection" element={<Collection />} />
              <Route path="artistsubmit" element={<Artistsubmit />} />
              <Route path="favoritartist" element={<FavoriteArtist />} />
              <Route path="favoritemusic" element={<FavoriteMusic />} />
              <Route path="myplaylist" element={<MyPlayList />} />
            </Route>

            {/* Artist */}
            <Route
              path="artist"
              element={
                artist.artist_name !== undefined ? (
                  <Artist path="artist" />
                ) : (
                  <Artistsubmit />
                )
              }
            >
              <Route path="artistinfo" element={<Artistinfo />} />
              <Route path="artistdashbord" element={<Artistdashbord />} />
              <Route path="myupload" element={<Album />} />
              {/* <Route path="createnft" element={<Createnft />} /> */}
            </Route>

            {/* Create */}
            <Route path="create" element={<Createmain />}>
              <Route path="musicupload" element={<Musicupload />} />
              <Route path="musicuploadlist" element={<Musicuploadlist />} />
              <Route path="nftuplaod" element={<Nftupload />} />
              <Route path="uploadnftlist" element={<Nftuploadlist />} />
            </Route>

            <Route path="store/*" element={<Store />} />
            <Route path="auctionupload" element={<Auctionupload />} />
            <Route path="search" element={<Search />} />
            <Route path="music/*" element={<Music />} />
          </Route>
        </Routes>
      </div>
      {user.loading === true ? <></> : <Playbar />}
    </section>
  );
};
