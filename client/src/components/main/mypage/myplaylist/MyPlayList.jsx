import "./MyPlayList.css";
import React from "react";
import MyplayCard from "./MyPlayCard";

const MyPlayList = () => {
  return (
    <div className="favorite">
      <div className="myplaylist">
        <h2>My Play List</h2>
        <MyplayCard sx={{ width: "100%" }} />
      </div>
    </div>
  );
};

export default MyPlayList;
