import React from "react";
import classes from "./Navbar.scss";
import { BiMenuAltRight } from "react-icons/bi";
// import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  return (
    <header className={classes.header}>
      <div className={classes.header__container}>
        <h2>navbar logo</h2>
      </div>
      <nav className={classes.header__content}>
        <ul>
          <li>
            <input
              type="text"
              placeholder={"Songs Search"}
              onkeypress="if( event.keyCode == 13 ){searchData();}"
            ></input>
            <button>Search</button>
          </li>
        </ul>
        <button>MetaMask</button>
      </nav>
      <div class={classes.header__content__toggle}>
        <BiMenuAltRight />
      </div>
    </header>
  );
};

export default Navbar;
