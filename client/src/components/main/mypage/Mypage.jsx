import "./Mypage.css";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import Userinformation from "./userinformation/Userinformation";
export const Mypage = () => {
  const artist = useSelector((state) => state.artist);

  return (
    <div className="mypage">
      <nav className="user-nav">
        <ul className="nav-links">
          <li>
            <Link to="/mypage/favoritemusic">
              <i className="uil uil-favorite"></i>
              <span className="link-name"> Favorite Music</span>
            </Link>
          </li>
          <li>
            <Link to="/mypage/favoritartist">
              <i className="uil uil-favorite"></i>
              <span className="link-name"> Favorite Artist</span>
            </Link>
          </li>
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
          {artist.artist_name === null ? (
            <li>
              <Link to="/mypage/artistsubmit">
                <i className="uil uil-music"></i>
                <span className="link-name"> Artist Register</span>
              </Link>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </nav>
      <section className="details">
        <div className="detail1">
          <Userinformation />
        </div>
        <div className="detail2">
          <Outlet />
        </div>
      </section>
    </div>
  );
};
