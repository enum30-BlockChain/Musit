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
import Listener from "./register/user/listener/Listener";
import Artists from "./register/user/artists/Artists";

import axios from "axios";
import Search from "./serach/Search";
import { Create } from "./create/Create";
import Mynfts from "./store/mynfts/Mynfts";
import { fetchUserData, testFunc } from "../../redux/user/userAction";
import { useDispatch, useSelector } from "react-redux";



export const Main = () => {
  const [address, setAddress] = useState("");
  const [loginState, setLoginState] = useState({ address: "" });
  const [songList, setSongList] = useState("");
  const [likeList, setLikeList] = useState("");
  const [userList, setUserList] = useState("");
  const [artistState, setArtistState] = useState({ address: "" });

  const user = useSelector((state) => state.user)
  const dispatch = useDispatch();                               //redux 초기값 넣어주자
  


  async function init() {
    const response = await Metamask.getAccounts(setAddress);
    const address = response.data[0]
    await Metamask.walletListener(setAddress);
    fetchUserData(address)
    //나의 지금 로그인상태 확인
    loginCheck(address);
    getSongList();
    getUser();
    getLikeList(address);
    artistsCheck(address);
    sidebarToggle();
  }

  useEffect(() => {
    init();
    console.log(user)
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

  const getSongList = async () => {   //노래 전체목록
    await axios
      .get("http://localhost:5000/files")
      .then((res) => {
        setSongList(res.data);
      })
      .catch((err) => alert("노래목록을 불러오지못했습니다.", err));
  };

  const getUser = async ()=>{       //유저 전체목록
    await axios
      .get("http://localhost:5000/users")
      .then((res) => {
        setUserList(res.data);
      })
      .catch((err) => alert("errrrrrrr.", err));
  };

  const getLikeList = async (address)=>{  //내가 좋아요누른 노래
    await axios
      .post("http://localhost:5000/music/likes/like",{address})
      .then((res) => {
        setLikeList(res.data)
      })
      .catch((err) => alert("errrrrrrr.", err));
  };
  
  return (
    <section className="main">
      <Searchbar address={address} />
      <div className="main-content">
      <button onClick={() => dispatch(testFunc(address))}>test</button>
        <Routes>
          <Route path="/">
            <Route index element={<Dashboard />} />

            <Route
              path="mypage"
              element={
                loginState ? (
                  <Mypage address={address} />
                ) : (
                  <Listener address={address} />
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
                  address={address}
                />
              }
            />
            <Route path="store" element={<Store address={address}/>} >
              <Route path="mynfts" element={<Mynfts />}/>
            </Route>
            {/* <Route path="auction" element={<Auction />} /> */}
            <Route path="auctionupload" element={<Auctionupload />} />
            <Route
              path="artist"
              element={artistState ? <Artist /> : <Artists address={address} />}
            />
            <Route
              path="search"
              element={
                <Search
                  address={address}
                />
              }
            />
            <Route path="cteate" element={<Create address={address} />} />
          </Route>
        </Routes>
      </div>
      <Playbar likeList={likeList} address={address} userList={userList} />
    </section>
  );
};
