import "./Artist.css";
import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
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
              <Link to="/artist">
                <i className="uil uil-create-dashboard"></i>
                <span className="link-name"> Artist Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/artist/createmusic">
                <i className="uil uil-upload-alt"></i>
                <span className="link-name"> Create Music</span>
              </Link>
            </li>
            <li>
              <Link to="/artist/myupload">
                <i className="uil uil-compact-disc"></i>
                <span className="link-name"> My Album</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="artist-details">
          <Outlet />
        </div>
      </div>
    </>
  );
};
