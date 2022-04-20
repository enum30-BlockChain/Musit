import React from "react";
import "./Contentbox.css";

export const Contentbox = () => {
  return (
    <div className="contentbox">
      <div className="title">
        <i className="uil uil-create-dashboard"></i>
        <span className="text">Artist Dashboard</span>
      </div>
      <div className="boxes">
        <div className="box box1">
          <i className="uil uil-thumbs-up"></i>
          <span className="text">Total Music Likes</span>
          <span className="number">10</span>
        </div>
        <div className="box box1">
          <i className="uil uil-heart"></i>
          <span className="text">Total Artist Likes</span>
          <span className="number">10</span>
        </div>
        <div className="box box1">
          <i className="uil uil-bill"></i>
          <span className="text">Income</span>
          <span className="number">3023</span>
        </div>
      </div>
    </div>
  );
};
