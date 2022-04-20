import React from "react";
// import { Activity } from "./dashbordcontent/Activity";
import { Contentbox } from "./dashbordcontent/Contentbox";
import "./Artistdashbord.css";

import Artistinfo from "../../artist/artistinfo/Artistinfo";

export const Artistdashbord = () => {
  return (
    <div className="dashboard">
      <div className="title">
        <i className="uil uil-create-dashboard"></i>
        <span className="text">Artist Dashboard</span>
      </div>
      <div className="dashboard-layout">
        <div className="informatino-artist">
          <Artistinfo />
        </div>
        <div className="overview">
          <Contentbox />
          {/* <Activity /> */}
        </div>
      </div>
    </div>
  );
};
