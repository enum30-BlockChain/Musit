import "./Main.css";
import Metamask from "../../web3/Metamask";
import React, { useEffect, useState } from "react";
import { Searchbar } from "./searchbar/Searchbar";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./dashboard/Dashboard";
import { Mypage } from "./mypage/Mypage";
import { Music } from "./music/Music";
import { Store } from "./store/Store";
import { Auctionupload } from "./auction/Auctionupload";
import { Artist } from "./artist/Artist";
import { Playbar } from "./playbar/Playbar";
import { Favorite } from "./mypage/favorite/Favorite";
import { Subscription } from "./mypage/subscription/Subscription";
import { Playlist } from "./mypage/playlist/Playlist";
import { Collection } from "./mypage/collection/Collection";
import { History } from "./mypage/history/History";
import RegisterUser from "./register/user/listener/RegisterUser";
import RegisterArtist from "./register/user/artists/RegisterArtist";
import { ArtistsList } from "./artist/favorite/ArtistsList";
import LandingMainPage from "../landingpage/LandingMainPage";
import Search from "./serach/Search";

import axios from "axios";
import { Create } from "./create/Create";
import Mynfts from "./store/mynfts/Mynfts";

import { fetchUserData, testFunc } from "../../redux/user/userAction";
import { fetchUserListData } from "../../redux/userList/userListAction";
import { fetchMusicListData } from "../../redux/musicList/musicListAction";
import { fetchLikeListData } from "../../redux/likeList/likeListAction";
import { useDispatch, useSelector } from "react-redux";
import { fetchArtistData } from "../../redux/artist/artistAction";
import { fetchMetamaskAddress } from "../../redux/metamask/metamaskAction";

export const Main = () => {
  const [loginState, setLoginState] = useState({ address: "" });
  // const [likeList, setLikeList] = useState("");

  const user = useSelector((state) => state.user);
  const artist = useSelector((state) => state.artist);
  const metamask = useSelector((state) => state.metamask);
  const dispatch = useDispatch(); //redux 초기값 넣어주자

  
  useEffect(() => {
    async function init() {
      dispatch(fetchMetamaskAddress())
      getLikeList(metamask.address);
      console.log(metamask.address)
      fetchUserData(metamask.address);
      dispatch(fetchArtistData(metamask.address));
      getMusicList();
      getUser();
      sidebarToggle();
      dispatch(fetchUserData(metamask.address));
    }
    init();
  }, [dispatch]);

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

  const getMusicList = async () => {
    //노래 전체목록
    await axios
      .get("http://localhost:5000/files")
      .then((res) => {
        dispatch(fetchMusicListData(res.data));
      })
      .catch((err) => alert("노래목록을 불러오지못했습니다.", err));
  };

  const getUser = async () => {
    //유저 전체목록
    await axios
      .get("http://localhost:5000/users")
      .then((res) => {
        dispatch(fetchUserListData(res.data));
      })
      .catch((err) => alert("errrrrrrr.", err));
  };

  const getLikeList = async (address) => {
    //내가 좋아요누른 노래
    await axios
      .post("http://localhost:5000/music/likes/like", { address })
      .then((res) => {
        dispatch(fetchLikeListData(res.data));
      })
      .catch((err) => alert("errrrrrrr.", err));
  };

  return (
    <section className="main">
      <Searchbar address={metamask.address} />
      <div className="main-content">
        <Routes>
          <Route path="/">
            <Route index element={<Dashboard />} />
            <Route
              path="mypage"
              element={
                user.nickname !== undefined && metamask.address !== null? (
                  <Mypage address={metamask.address} />
                ) : (
                  <RegisterUser address={metamask.address} />
                )
              }
            >
              <Route path="favorite" element={<Favorite address={metamask.address} />} />
              <Route path="playlist" element={<Playlist address={metamask.address} />} />
              <Route
                path="collection"
                element={<Collection address={metamask.address} />}
              />
              <Route path="history" element={<History address={metamask.address} />} />
              <Route
                path="subscription"
                element={<Subscription address={metamask.address} />}
              />
            </Route>
            <Route
              path="landingpage"
              element={<LandingMainPage address={metamask.address} />}
            />
            <Route path="music" element={<Music address={metamask.address} />} />
            <Route path="store" element={<Store address={metamask.address} />}>
              <Route path="mynfts" element={<Mynfts />} />
            </Route>
            {/* <Route path="auction" element={<Auction />} /> */}
            <Route path="auctionupload" element={<Auctionupload />} />
            <Route
              path="artist"
              element={
                artist.artist_name !== undefined ? (
                  <Artist address={metamask.address} />
                ) : (
                  <RegisterArtist address={metamask.address} />
                )
              }
            >
              <Route path="list" element={<ArtistsList address={metamask.address} />} />
            </Route>

            <Route path="search" element={<Search address={metamask.address} />} />
            <Route path="cteate" element={<Create address={metamask.address} />} />
          </Route>
          <Route path="cteate" element={<Create address={metamask.address} />} />
        </Routes>
      </div>
      <Playbar address={metamask.address} />
    </section>
  );
};
