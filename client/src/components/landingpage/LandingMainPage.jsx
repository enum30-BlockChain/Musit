import "./LandigMainPage.css";
import React from "react";
// import Button from "@mui/material/Button";
// import Metamask from "./../../web3/Metamask";

export default function LandingMainPage({ address }) {
  // const connectOnclick = () => {
  //   Metamask.connectWallet();
  // };

  // const sliceAddress =
  //   address &&
  //   address.substr(0, 5) + "..." + address.substr(address.length - 4, 4);

  return (
    <>
      <div className="landing-layout">
        <div className="landing-main">
          <div className="landing-text">We are</div>
          <ul className="landing-text-change"></ul>
          <li>
            <span>NFT</span>
          </li>
          <li>
            <span>Music</span>
          </li>
          <li>
            <span>BlockChain Revolution</span>
          </li>
          <li>
            <span>ENUM30 X MUSIT</span>
          </li>
        </div>
      </div>
    </>
  );
}
