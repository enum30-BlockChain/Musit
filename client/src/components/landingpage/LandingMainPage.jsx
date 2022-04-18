import "./LandigMainPage.css";
import React from "react";
import Glitch from "./glitch/Glitch";
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
        <Glitch />
      </div>
    </>
  );
}
