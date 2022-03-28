import "./Mypage.css";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";

export const Mypage = ({ address }) => {
  const [nickname, setNickname] = useState("");

  async function init() {
    const url = "http://localhost:5000/users/signin";
    const response = await axios.post(url, { address });
    setNickname(response.data.nickname);
  }

  //TODO: user info(address, nickname, myfavorite, ...),
  useEffect(() => {
    const links = document.querySelectorAll(".user-nav .nav-links li");
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
    init();
  }, [address]);

  function navlinkOnClick(e) {
    console.log(e.target);
  }

  return (
    <div className="mypage">
      <div className="user-card">
        <div className="user-image">
          <img src="/images/profile.jpg" alt="user profile" />
        </div>
        <div className="user-info">
          <h2 className="nickname">Nickname</h2>
          {nickname}
          <h2 className="address">Address</h2>
          <span>{address}</span>
          <h2 className="subscription">Subscription</h2>
          <span>월이용권 </span>
        </div>
        <i className="uil uil-setting"></i>
      </div>

      <nav className="user-nav">
        <ul className="nav-links" onClick={navlinkOnClick}>
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
        </ul>
      </nav>
      <div className="detail">
        <Outlet />
      </div>
    </div>
  );
};
