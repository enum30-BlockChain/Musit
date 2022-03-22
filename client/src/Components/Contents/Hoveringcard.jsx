import React from "react";
import { Link } from "react-router-dom";
// import "./Hoveringcard.scss";

function Hoveringcard() {
  return (
    <div id="app" class="container">
      <Link to="/Register">
        <card class="imgplace">
          <h1 slot="header" class="hovering-card">
            {" "}
            Auction{" "}
          </h1>
          <p slot="content"> Join the enum3xMusit auction</p>
        </card>
      </Link>
      <Link to="/Register">
        <card class="imgplace">
          <h1 slot="header" class="hovering-card">
            Store
          </h1>
          <p slot="content"> Join the enum3xMusit Store</p>
        </card>
      </Link>
      <Link to="/Register">
        <card class="imgplace">
          <h1 slot="header" class="hovering-card">
            {" "}
            Songs{" "}
          </h1>
          <p slot="content"> Join the enum3xMusit Songs</p>
        </card>
      </Link>
      <Link to="/Register">
        <card class="imgplace">
          <h1 slot="header"> My room </h1>
          <p slot="content"> Join the enum3xMusit My room</p>
        </card>
      </Link>
    </div>
  );
}

export default Hoveringcard;
