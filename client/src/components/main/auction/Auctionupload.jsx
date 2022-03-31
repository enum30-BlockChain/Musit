import "./Auctionupload.css";
import React, { useState } from "react";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
// import { TextField } from "@mui/material";

export const Auctionupload = () => {
  //앨범커버 이미지 가져오기

  //달력 일정
  const [auctionStartDate, setAuctionStsrtDate] = useState();

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
          <div className="auction-inputbox">
            <h2>Price</h2>
            <input type="text" placeholder="Amount"></input>
            <h2>Duration</h2>
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label={"Acution Duration"}
                value={auctionStartDate}
                onChange={(newValue) => {
                  setAuctionStsrtDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider> */}

            <></>
          </div>
        </div>
      </div>
    </>
  );
};
