import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import Metamask from "../../web3/Matamask";
import axios from "axios";

export const Navbar = () => {
  const [address, setAddress] = useState("");
  const [nickname, setNickname] = useState("");
  useEffect(() => {
    const init = async () => {
      const accounts = await Metamask.getAccounts();
      setAddress(accounts[0]);
    };
    init();
    return () => {};
  }, []);

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

  return (
    <>
      <header class="main-header">
        <div class="logo">
          <Link to="/">
            <h3>Musit X Eunm30</h3>
          </Link>
        </div>
        <label for="menu-btn" class="menu-icon">
          <span class="meue-icon__line"></span>
        </label>
        <ul class="nav-links">
          <li class="nav-link">
            <li>
              <input
                type="text"
                placeholder={"Songs Search"}
                //엔터로 검색이 가능하게
                onkeypress="if( event.keyCode == 13 ){searchData();}"
              ></input>
              <button>Search</button>
            </li>
          </li>
          <Link to="/">
            <li class="nav-link">
              <a href="#">Main</a>
            </li>
          </Link>

          <li class="nav-link">
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
