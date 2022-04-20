import React from "react";
import { Activity } from "./dashbordcontent/Activity";
import { Contentbox } from "./dashbordcontent/Contentbox";
import "./Artistdashbord.css";

export const Artistdashbord = () => {
  return (
    <div className="dashboard">
      <div className="overview">
        <Contentbox />
        {/* <Activity /> */}
      </div>
    </div>
  );
};
