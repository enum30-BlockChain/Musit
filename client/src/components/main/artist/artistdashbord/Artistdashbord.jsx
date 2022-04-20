import React from "react";
import { Activity } from "./dashbordcontent/Activity";
import { Contentbox } from "./dashbordcontent/Content";
import "./Artistdashbord.css";

export const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="overview">
        <Contentbox />
        <Activity />
      </div>
    </div>
  );
};
