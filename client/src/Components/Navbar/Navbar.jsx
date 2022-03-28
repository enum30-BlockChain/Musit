import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import Metamask from "../../web3/Metamask";

export const Navbar = ({ address, setAddress }) => {
  const [nickname, setNickname] = useState("");

  //toggle menu
  const [openmain, setOpenmain] = useState(false);

  const onClickmain = (e) => {
    setOpenmain((openmain) => !openmain);
  };

  const LoginOnClick = async () => {
    const url = "http://localhost:5000/users/signin";
    const response = await axios.post(url, { address });
    // console.log(response.data);
    setNickname({
      nickname: response.data.nickname,
    });
  };
  const connectOnClick = async () => {
    const { data } = await Metamask.connectWallet();
    setAddress(data[0]);
  };

  const Login = async () => {
    const url = "http://localhost:5000/users/signin";
    const response = await axios.post(url, { address });
    console.log(response.nickname);
  };

  const enterToSearch = (event) => {
    if (event.keyCode == 13) {
      // searchData();
    }
  };

  return (
    <>
      <header className="main-header">
        <div className="logo">
          <Link to="/">
            <h3>Musit X Eunm30</h3>
          </Link>
        </div>
        <label htmlFor="menu-btn" className="menu-icon">
          <span className="meue-icon__line"></span>
        </label>
        <ul className="nav-links">
          <li className="nav-link">
            <input
              type="text"
              placeholder={"Songs Search"}
              //엔터로 검색이 가능하게
              onKeyPress={enterToSearch}
            ></input>
            <button>Search</button>
          </li>
          <ul className="togglemainbtn">
            <li>
              <span onClick={() => onClickmain()}>MENU</span>
            </li>
            <ul className={openmain ? "show-menu" : "hide-menu"}>
              <li className="nav-link" onClick="hide-menu">
                <Link to="/">MAIN PAGE</Link>
              </li>
              <li className="nav-link" onClick="hide-menu">
                <Link to="/Auction">AUCTION</Link>
              </li>
              <li className="nav-link" onClick="hide-menu">
                <Link to="/Store">STORE</Link>
              </li>
              <li className="nav-link" onClick="hide-menu">
                <Link to="/Songs">SONGS</Link>
              </li>
              <li className="nav-link" onClick="hide-menu">
                <Link to="/Mypage">MY ROOM</Link>
              </li>
            </ul>
          </ul>
          <li className="nav-link">
            {address ? (
              <p>
                {address}
                {nickname}
                <button>logout</button>
              </p>
            ) : (
              <button onClick={connectOnClick}>Connect</button>
            )}
          </li>
        </ul>
      </header>
    </>
  );
};

export default Navbar;
