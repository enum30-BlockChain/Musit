import "./Mypage.css";
import React from "react";
import { Link, Outlet } from "react-router-dom";

export const Mypage = () => {
  return (
    <div className="mypage">
      <nav className="user-nav">
        <ul className="nav-links">
          <li>
            <Link to="/mypage/userinformation">
              <i className="uil uil-user"></i>
              <span className="link-name"> User Information</span>
            </Link>
          </li>
          <li>
            <Link to="/mypage/favorite">
              <i className="uil uil-favorite"></i>
              <span className="link-name"> Favorite</span>
            </Link>
          </li>
          <li>
            <Link to="/mypage/playlist">
              <i className="uil uil-play"></i>
              <span className="link-name"> Playlist</span>
            </Link>
          </li>
          <li>
            <Link to="/mypage/collection">
              <i className="uil uil-layers"></i>
              <span className="link-name"> Collection</span>
            </Link>
          </li>
          <li>
            <Link to="/mypage/history">
              <i className="uil uil-history"></i>
              <span className="link-name"> History</span>
            </Link>
          </li>
          <li>
            <Link to="/mypage/subscription">
              <i className="uil uil-bitcoin-sign"></i>
              <span className="link-name"> Subscription</span>
            </Link>
          </li>
          <li>
            <Link to="/mypage/artistsubmit">
              <i className="uil uil-music"></i>
              <span className="link-name"> Arstis Submit</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="detail">
        <Outlet />
      </div>
    </div>
  );
};
