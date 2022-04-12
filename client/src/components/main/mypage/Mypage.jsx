import "./Mypage.css";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import Userinformation from "./userinformation/Userinformation";
export const Mypage = () => {
  const artist = useSelector((state) => state.artist);

  console.log(artist);

  return (
    <div className="mypage">
      <nav className="user-nav">
        <ul className="nav-links">
          <li>
            <Link to="/mypage/musicfavorite">
              <i className="uil uil-favorite"></i>
              <span className="link-name"> Favorite Music</span>
            </Link>
          </li>
          <li>
            <Link to="/mypage/artistfavorite">
              <i className="uil uil-favorite"></i>
              <span className="link-name"> Favorite Artist</span>
            </Link>
          </li>
          {/* <li>
            <Link to="/mypage/playlist">
              <i className="uil uil-play"></i>
              <span className="link-name"> Playlist</span>
            </Link>
          </li> */}
          <li>
            <Link to="/mypage/subscription">
              <i className="uil uil-bitcoin-sign"></i>
              <span className="link-name"> Subscription</span>
            </Link>
          </li>
          <li>
            <Link to="/mypage/mynftlist">
              <i className="uil uil-bitcoin-sign"></i>
              <span className="link-name"> My nft list</span>
            </Link>
          </li>
          {artist.artist_name !== null ? (
            <li>
              <Link to="/mypage/artistsubmit">
                <i className="uil uil-music"></i>
                <span className="link-name"> Artist Submit</span>
              </Link>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </nav>
      <div className="details">
        <div className="detail1">
          <Userinformation />
        </div>
        <div className="detail2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
