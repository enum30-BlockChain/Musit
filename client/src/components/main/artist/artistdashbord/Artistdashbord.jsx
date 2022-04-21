import React from "react";
import { Contentbox } from "./dashbordcontent/Contentbox";
import "./Artistdashbord.css";

import Artistinfo from "../../artist/artistinfo/Artistinfo";

export const Artistdashbord = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-layout">
        <div className="informatino-artist">
          <Artistinfo />
        </div>
        <div className="overview">
          <Contentbox />
        </div>
      </div>
    </div>
  );
};
