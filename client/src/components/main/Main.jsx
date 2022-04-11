// //CSS
// import "./Main.css";

// //REACT FUCNTION , REDUX , ETC
// import React, { useEffect, useState } from "react";
// import { Searchbar } from "./searchbar/Searchbar";
// import { Route, Routes } from "react-router-dom";

// //Navbar
// import { Mypage } from "./mypage/Mypage";
// import { Music } from "./music/Music";
// import { Store } from "./store/Store";
// import { Auctionupload } from "./auction/Auctionupload";
// import { Artist } from "./artist/Artist";
// import { Dashboard } from "./dashboard/Dashboard";

// //Mypage
// import Userinformation from "./mypage/userinformation/Userinformation";
// import { Favorite } from "./mypage/favorite/Favorite";
// import { Subscription } from "./mypage/subscription/Subscription";
// import { Playlist } from "./mypage/playlist/Playlist";
// import { Collection } from "./mypage/collection/Collection";
// import { History } from "./mypage/history/History";
// import RegisterUser from "./register/user/listener/RegisterUser";
// import RegisterArtist from "./register/user/artists/RegisterArtist";
// import { ArtistsList } from "./artist/favorite/ArtistsList";
// import { Create } from "./create/Create";
// import Search from "./serach/Search";
// import Mynfts from "./store/mynfts/Mynfts";
// import Artistsubmit from "./mypage/artistsubmit/Artistsubmit";
// import Album from "./artist/myalbum/Album";

// //상단 하단 고정
// import { Playbar } from "./playbar/Playbar";

// import LandingMainPage from "../landingpage/LandingMainPage";

// export const Main = () => {
//   const sidebarToggle = () => {
//     const sidebarToggle = document.querySelector(".sidebar-toggle");
//     const sidebar = document.querySelector("nav");

//     let getMenuStatus = localStorage.getItem("menu_status");
//     if (getMenuStatus && getMenuStatus === "close") {
//       sidebar.classList.toggle("close");
//     }

//     sidebarToggle.addEventListener("click", () => {
//       sidebar.classList.toggle("close");
//       if (sidebar.classList.contains("close")) {
//         localStorage.setItem("menu_status", "close");
//       } else {
//         localStorage.setItem("menu_status", "open");
//       }
//     });
//   };

//   ////////////////////////////////////////////////////////////////////////////

//   return (
//     <section className="main">
//       {/* <Searchbar address={address} /> */}
//       <div className="main-content">
//         <Routes>
//           <Route path="/">
//             <Route index element={<Dashboard />} />
//             <Route
//               path="mypage"
//               element={
//                 user.nickname && user.address !== undefined ? (
//                   <Mypage path="userinformation" address={address} />
//                 ) : (
//                   <RegisterUser address={address} />
//                 )
//               }
//             >
//               <Route
//                 path="userinformation"
//                 element={<Userinformation address={address} />}
//               />
//               <Route path="favorite" element={<Favorite address={address} />} />

//               <Route path="playlist" element={<Playlist address={address} />} />

//               <Route
//                 path="collection"
//                 element={<Collection address={address} />}
//               />
//               <Route path="history" element={<History address={address} />} />
//               <Route
//                 path="subscription"
//                 element={<Subscription address={address} />}
//               />
//               <Route
//                 path="artistsubmit"
//                 element={<Artistsubmit address={address} />}
//               />
//             </Route>
//             <Route
//               path="landingpage"
//               element={<LandingMainPage address={address} />}
//             />
//             <Route path="music/*" element={<Music address={address} />} />

//             <Route path="store" element={<Store address={address} />}>
//               <Route path="mynfts" element={<Mynfts />} />
//             </Route>
//             {/* <Route path="auction" element={<Auction />} /> */}
//             <Route path="auctionupload" element={<Auctionupload />} />
//             <Route
//               path="artist"
//               element={
//                 artist.artist_name !== undefined ? (
//                   <Artist address={address} />
//                 ) : (
//                   <RegisterArtist address={address} />
//                 )
//               }
//             >
//               <Route path="list" element={<ArtistsList address={address} />} />
//               <Route
//                 path="album"
//                 element={<Album address={address} artist={artist} />}
//               />
//             </Route>

//             <Route path="search" element={<Search address={address} />} />
//             <Route path="cteate" element={<Create address={address} />} />
//           </Route>
//         </Routes>
//       </div>
//       {/* <Playbar address={address} /> */}
//       {address === undefined ? <></> : <Playbar address={address} />}
//     </section>
//   );
// };
