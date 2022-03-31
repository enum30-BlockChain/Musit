import "./Auctionupload.css";
import React from "react";

export const Auctionupload = () => {
  //앨범커버 이미지 가져오기

  return (
    <>
      <div className="auction-layout">
        <h1> Put your work up for MuEnun auction </h1>
        <div className="auction-box">
          <h1>Album Cover</h1>
          <div className="auction-imgbox">
            <img
              src="https://cdn.univ20.com/wp-content/uploads/2018/10/ea6345acc53bb8cbac3564f661ae9dd4.png"
              alt="auction-cover"
              id="auction-albumcover"
            />
          </div>
          <div className="auction-inputbox"></div>
        </div>
      </div>
    </>
  );
};
