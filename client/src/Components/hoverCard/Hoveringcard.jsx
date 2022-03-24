import React from "react";
import { Link } from "react-router-dom";
import "./Hoveringcard.scss";

function Hoveringcard() {
  return (
    <div id="app" className="container">
      <Link to="/Auction">
        <div className="imgplace">
          <h1 slot="header" className="hovering-card">
            Auction
          </h1>
          <p slot="content"> Join the Enum30 x Musit Auction</p>
        </div>
      </Link>
      <Link to="/Store">
        <div className="imgplace">
          <h1 slot="header" className="hovering-card">
            Store
          </h1>
          <p slot="content"> Join the Enum30 x Musit Store</p>
        </div>
      </Link>
      <Link to="/Songs">
        <div className="imgplace">
          <h1 slot="header" className="hovering-card">
            Songs
          </h1>
          <p slot="content"> Join the Enum30 x Musit Songs</p>
        </div>
      </Link>
      <Link to="/MyPageLayout">
        <div className="imgplace">
          <h1 slot="header"> My room </h1>
          <p slot="content"> Join the Enum30 x Musit My room</p>
        </div>
      </Link>
    </div>
  );
}

export default Hoveringcard;
