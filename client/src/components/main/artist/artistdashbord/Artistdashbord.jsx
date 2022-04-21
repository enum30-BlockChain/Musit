import React from "react";
import { Contentbox } from "./dashbordcontent/Contentbox";
import Artistinfodashboard from "./dashbordcontent/Artistinfodashboard";

export const Artistdashbord = () => {
  return (
    <div className="dashboard">
      <Artistinfodashboard />
      <Contentbox />
    </div>
  );
};
