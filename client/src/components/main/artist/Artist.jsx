import "./Artist.css";
import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Artistinfo from "./artistinfo/Artistinfo";
import axios from "axios";
import { updateArtistData } from "../../../redux/actions/artistActions";

export const Artist = () => {
  useEffect(() => {
    topNavToggle();
  }, []);

  const topNavToggle = () => {
    const links = document.querySelectorAll(".top-nav .nav-links li");
    links.forEach((link) => {
      link.addEventListener("click", () => {
        links.forEach((link) => {
          link.classList.remove("active");
        });
        link.classList.add("active");
      });
    });
  };

  function navlinkOnClick(e) {
    console.log(e.target);
  }

  return (
    <>
      <div className="artistpage">
        <nav className="top-nav">
          <ul className="nav-links" onClick={navlinkOnClick}>
            <li>
              <Link to="/artist/artistdashbord">
                <i className="uil uil-favorite"></i>
                <span className="link-name">Artist Dashboard</span>
              </Link>
            </li>

            <li>
              <Link to="/artist/myupload">
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
        <section className="artist-details">
          <div className="artist-detail1">
            <Artistinfo />
          </div>
          <div className="artist-detail2">
            <Outlet />
          </div>
        </section>
      </div>
    </>
  );
};
