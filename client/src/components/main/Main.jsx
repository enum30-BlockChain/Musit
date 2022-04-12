//CSS
import "./Main.css";
//REACT FUCNTION , REDUX , ETC
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

//top
import { Searchbar } from "./searchbar/Searchbar";
//bottom
import { Dashboard } from "./dashboard/Dashboard";
import { Playbar } from "./playbar/Playbar";
// import RegisterUser from "./register/RegisterUser";

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

//Main-nav Store
import { Store } from "./store/Store";

//Main-nav Artist
import { Artist } from "./artist/Artist";

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
      {/* <Artistfavorite /> */}
      <div className="main-content">
        <Routes>
          <Route path="/">
            <Route index element={<Dashboard />} />
            <Route
              path="mypage"
              element={
                // user.nickname && user.address !== undefined ? (
                <Mypage path="userinformation" />
                // ) : (
                //   <RegisterUser />
                // )
              }
            >
              <Route path="userinformation" element={<Userinformation />} />
              <Route path="musicfavorite" element={<Musicfavorite />} />
              <Route path="artistfavorite" element={<Artistfavorite />} />
              <Route path="playlist" element={<Playlist />} />
              <Route path="subscription" element={<Subscription />} />
              <Route path="history" element={<History />} />
              <Route path="collection" element={<Collection />} />
              {/* <Route path="playlist" element={<PlayList />} /> */}
              {/* <Route path="favorite" element={<Favorite />} /> */}
              <Route path="artistsubmit" element={<Artistsubmit />} />
            </Route>
            <Route
              path="artist"
              element={
                artist.artist_name !== undefined ? <Artist /> : <Artistsubmit />
              }
            ></Route>
            <Route path="store/*" element={<Store />} />
          </Route>
        </Routes>
      </div>
      {user.loading === true ? <></> : <Playbar />}
    </section>
  );
};
