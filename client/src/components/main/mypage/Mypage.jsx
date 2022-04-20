import "./Mypage.css";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

export const Mypage = () => {
  const artist = useSelector((state) => state.artist);

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

  return (
    <div className="mypage">
      <nav className="top-nav">
        <ul className="nav-links">
          <li>
            <Link to="/mypage">
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
        </ul>
      </nav>
      <section className="details">
        <Outlet />
      </section>
    </div>
  );
};
