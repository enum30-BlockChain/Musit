import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserListData } from "../../redux/userList/userListAction";

export const Navbar = () => {
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
  }, []);
  const user = useSelector((state) => state.user);
  console.log(user);

  return (
    <nav className="side-nav">
      <Link to={"/landingpage"}>
        <div className="logo-name-container">
          <div className="logo-image">
            <img src="/images/ENUM30.png" alt="logo" />
          </div>
          <span className="logo-name nav-links">ENUM30 X MUSIT</span>
        </div>
      </Link>

      <div className="menu-items">
        {user == user ? (
          <ul className="nav-links">
            <li>
              <Link to="/mypage">
                <i className="uil uil-create-dashboard"></i>
                <span className="link-name">MYPAGE</span>
              </Link>
            </li>
            <li>
              <Link to="/music">
                <i className="uil uil-music"></i>
                <span className="link-name">MUSIC</span>
              </Link>
            </li>
            <li>
              <Link to="/store">
                <i className="uil uil-store"></i>
                <span className="link-name">STORE</span>
              </Link>
            </li>
            <li>
              <Link to="/artist">
                <i className="uil uil-palette"></i>
                <span className="link-name">ARTIST</span>
              </Link>
            </li>
            <li>
              <Link to="/cteate">
                <i className="uil uil-upload"></i>
                <span className="link-name">CREATE</span>
              </Link>
            </li>
            <li>
              <Link to="/auctionupload">
                <i className="uil uil-arrow-growth"></i>
                <span className="link-name">AUCTION</span>
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="nav-links">
            <li>
              <Link to="/mypage">
                <i className="uil uil-create-dashboard"></i>
                <span className="link-name">MYPAGE</span>
              </Link>
            </li>
            <li>
              <Link to="/music">
                <i className="uil uil-music"></i>
                <span className="link-name">MUSIC</span>
              </Link>
            </li>
            <li>
              <Link to="/store">
                <i className="uil uil-store"></i>
                <span className="link-name">STORE</span>
              </Link>
            </li>
          </ul>
        )}

        <ul className="logout-mode">
          <li>
            <Link to="#">
              <i className="uil uil-signout"></i>
              <span className="link-name">Logout</span>
            </Link>
          </li>

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
  );
};
