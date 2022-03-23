import React from "react";
import { Link } from "react-router-dom";
import "./Hoveringcard.scss";

function Hoveringcard() {
  return (
    <div id="app" class="container">
      <Link to="/Register">
        <div class="imgplace">
          <h1 slot="header" class="hovering-card">
            {" "}
            Auction{" "}
          </h1>
          <p slot="content"> Join the Enum3 x Musit auction</p>
        </div>
      </Link>
      <Link to="/Register">
        <div class="imgplace">
          <h1 slot="header" class="hovering-card">
            Store
          </h1>
          <p slot="content"> Join the Enum3 x Musit Store</p>
        </div>
      </Link>
      <Link to="/Register">
        <div class="imgplace">
          <h1 slot="header" class="hovering-card">
            {" "}
            Songs{" "}
          </h1>
          <p slot="content"> Join the Enum3 x Musit Songs</p>
        </div>
      </Link>
      <Link to="/MyPageLayout">
        <div class="imgplace">
          <h1 slot="header"> My room </h1>
          <p slot="content"> Join the Enum3 x Musit My room</p>
        </div>
      </Link>
    </div>
  );
}

export default Hoveringcard;
