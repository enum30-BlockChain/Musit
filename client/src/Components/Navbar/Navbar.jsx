import React, { useEffect, useStaste } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import Matamask from "./../../web3/matamask.ts";
import axios from "axios";

export const Navbar = () => {
  // const [address, setAddress] = useState("");
  // useEffect(() => {
  //   const init = async () => {
  //     const accounts = await Matamask.getAccounts();
  //     setAddress(accounts[0]);
  //   };
  //   init();
  //   return () => {};
  // }, []);

  // const Login = async () => {
  //   const url = "http://localhost:5000/users/signin";
  //   const response = await axios.post(url, { address });
  //   console.log(response.nickname);
  // };

  return (
    <header class="main-header">
      <div class="logo">
        <Link to="/App">
          <a>Musit X Eunm30</a>
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
        <li class="nav-link">
          <a href="#">menu</a>
        </li>
        <li class="nav-link">
          <button>Login</button>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
