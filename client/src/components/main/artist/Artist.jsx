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
      <div className="artistpage">
        <nav className="artist-nav">
          <ul className="nav-links" onClick={navlinkOnClick}>
            <li>
              <Link to="/artist/artistdashbord">
                <i className="uil uil-favorite"></i>
                <span className="link-name">Artist Dashboard</span>
              </Link>
            </li>

            <li>
              <Link to="/artist/createnft">
                <i className="uil uil-favorite"></i>
                <span className="link-name">Create NFT</span>
              </Link>
            </li>
            <li>
              <Link to="/artist/myalbum">
                <i className="uil uil-favorite"></i>
                <span className="link-name">My Album</span>
              </Link>
            </li>
            <li>
              <Link to="/artist/auctionupload">
                <i className="uil uil-favorite"></i>
                <span className="link-name">Auction Upload</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="artist-details">
          <div className="artist-detail1">
            <Artistinfo />
          </div>
          <div className="detail">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
