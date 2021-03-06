import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useSelector } from "react-redux";
// import { fetchUserListData } from "../../redux/userList/userListAction";

export const Navbar = () => {
  const artist = useSelector((state) => state.artist);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const body = document.querySelector("body");
    const modeToggle = document.querySelector(".mode-toggle");

    let getDarkMode = localStorage.getItem("dark_mode");
    if (getDarkMode && getDarkMode === "on") {
      body.classList.toggle("dark");
    }

    modeToggle.addEventListener("click", () => {
      body.classList.toggle("dark");
      if (body.classList.contains("dark")) {
        localStorage.setItem("dark_mode", "on");
      } else {
        localStorage.setItem("dark_mode", "off");
      }
    });
  }, []);
  useEffect(() => {
    const links = document.querySelectorAll(".side-nav .nav-links li");
    links.forEach((link) => {
      link.addEventListener("click", () => {
        // 이전에 active 된 메뉴 삭제
        links.forEach((link) => {
          link.classList.remove("active");
        });
        // 지금 클릭한 메뉴 active
        link.classList.add("active");
      });
    });
  }, [user.loading, artist.loading]);

  return (
    <>
      <nav className="side-nav">
        <Link to={"/"}>
          <div className="logo-name-container">
            <div className="logo-image">
              <h1 className="E">E</h1>
            </div>
            <span className="logo-name nav-links">NUM30 MUSIT</span>
          </div>
        </Link>

        <div className="menu-items">
          <ul className="nav-links">
            {user.nickname === null ? (
              <li>
                <Link to="/register">
                  <i className="uil uil-create-dashboard"></i>
                  <span className="link-name">REGISTER</span>
                </Link>
              </li>
            ) : artist.artist_name !== null ? (
              <>
                <li>
                  <Link to="/mypage">
                    <i className="uil uil-create-dashboard"></i>
                    <span className="link-name">MYPAGE</span>
                  </Link>
                </li>
                <li>
                  <Link to="/artist">
                    <i className="uil uil-palette"></i>
                    <span className="link-name">ARTIST</span>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/mypage">
                    <i className="uil uil-create-dashboard"></i>
                    <span className="link-name">MYPAGE</span>
                  </Link>
                </li>
                <li>
                  <Link to="/artistsubmit">
                    <i className="uil uil-user-plus"></i>
                    <span className="link-name"> Artist Register</span>
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link to="/music">
                <i className="uil uil-music"></i>
                <span className="link-name">MUSIC</span>
              </Link>
            </li>
            <li>
              <Link to="/store">
                <i className="uil uil-store"></i>
                <span className="link-name"> STORE</span>
              </Link>
            </li>
          </ul>
          <ul className="logout-mode">
            <li className="mode">
              <Link to="#">
                <i className="uil uil-moon"></i>
                <span className="link-name">Dark Mode</span>
              </Link>
              <div className="mode-toggle">
                <span className="switch"></span>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
