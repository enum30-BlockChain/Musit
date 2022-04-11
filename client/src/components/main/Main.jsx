//CSS
import "./Main.css";

import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import Userinformation from "./mypage/userinformation/Userinformation";
import { Subscription } from "./mypage/subscription/Subscription";
import { History } from "./mypage/history/History";
import { Mypage } from "./mypage/Mypage";
import { Collection } from "./mypage/collection/Collection";
import { Favorite } from "./mypage/favorite/Favorite";

import { Dashboard } from "./dashboard/Dashboard";
import { Searchbar } from "./searchbar/Searchbar";
import RegisterUser from "./register/listener/RegisterUser";
import Artistsubmit from "./mypage/artistsubmit/Artistsubmit";
import { Artist } from "./artist/Artist";
import RegisterArtist from "./register/artists/RegisterArtist";
// import { Playbar } from "./playbar/Playbar";

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

  console.log(artist);

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
                user.nickname && user.address !== undefined ? (
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
              <Route path="favorite" element={<Favorite />} />
              <Route path="artistsubmit" element={<Artistsubmit />} />
            </Route>
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
              {/* <Route path="list" element={<ArtistsList address={address} />} /> */}
              {/* <Route
                path="album"
                element={<Album address={address} artist={artist} />}
              /> */}
            </Route>
          </Route>
        </Routes>
        {/* {user.loading === true ? <></> : <Playbar />} */}
      </div>
    </section>
  );
};
