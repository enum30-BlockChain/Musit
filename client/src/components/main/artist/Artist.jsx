import "./Artist.css";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import Artistinfo from "./artistinfo/Artistinfo";

export const Artist = () => {
  function navlinkOnClick(e) {
    console.log(e.target);
  }

  return (
    <>
      <nav className="artist-nav">
        <ul className="nav-links" onClick={navlinkOnClick}>
          <li>
            <Link to="/artist/list">
              <i className="uil uil-favorite"></i>
              <span className="link-name">Artists</span>
            </Link>
          </li>
          <li>
            <Link to="/artist/album">
              <i className="uil uil-favorite"></i>
              <span className="link-name">album</span>
            </Link>
          </li>
        </ul>
      </nav>
      <Artistinfo />
      <div className="detail">
        <Outlet />
      </div>
    </>
  );
};
