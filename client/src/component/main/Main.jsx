import "./Main.css";

import { React, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { readUserData } from "../../redux/actions/userActions";
import { readMetamaskData } from "../../redux/actions/metamaskAction";

import { Dashboard } from "./dashboard/Dashboard";
import { Mypage } from "./mypage/Mypage";

export const Main = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      await dispatch(readMetamaskData());
      await dispatch(readUserData());
    };
    init();
  }, []);

  return (
    <>
      <section className="main">
        {/* <Searchbar address={address} /> */}
        <div className="main-content">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route
              path="mypage"
              element={
                user.nickname !== undefined ? <Mypage /> : <RegisterUser />
              }
            ></Route>
          </Routes>
          {/* <Routes>
          <Route path="/">
            <Route
              path="mypage"
              element={
                user.nickname !== undefined ? (
                  <Mypage address={address} />
                ) : (
                  <RegisterUser address={address} />
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
              path="landingpage"
              element={<LandingMainPage address={address} />}
            />
            <Route path="music/*" element={<Music address={address} />} />

            <Route path="store" element={<Store address={address} />}>
              <Route path="mynfts" element={<Mynfts />} />
            </Route> */}

          {/* <Route path="auction" element={<Auction />} /> */}
          {/* <Route path="auctionupload" element={<Auctionupload />} />
            <Route
              path="artist"
              element={
                artist.artist_name !== undefined ? (
                  <Artist address={address} />
                ) : (
                  <RegisterArtist address={address} />
                )
              }
            >
              <Route path="list" element={<ArtistsList address={address} />} />
              <Route
                path="album"
                element={<Album address={address} artist={artist} />}
              />
            </Route>

            <Route path="search" element={<Search address={address} />} />
            <Route path="cteate" element={<Create address={address} />} />
          </Route>
        </Routes> */}
        </div>
        {/* <Playbar address={address} /> */}
      </section>
    </>
  );
};
