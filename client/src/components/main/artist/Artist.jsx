import "./Artist.css";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";

export const Artist = ({ address, artistState }) => {
  console.log(artistState);
  return (
    <>
      <div className="artistpage">
        <div className="artist-card"></div>
        <div className="artist-image">현재 이미지 불러오기</div>

        <nav className="artist-nav">
          <ul className="nav-links">
            <li>
              <Link to="/artist/favorite">
                <i className="uil uil-favorite"></i>
                <span className="link-name"> Favorite</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="detail">
          <Outlet />
        </div>
      </div>
    </>
  );
};
