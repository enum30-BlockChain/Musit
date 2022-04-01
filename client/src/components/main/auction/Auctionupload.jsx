import "./Auctionupload.css";
import React, { useState } from "react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { TextField, Input } from "@mui/material";

export const Auctionupload = () => {
  //앨범커버 이미지 가져오기

  //달력 일정
  const [auctionStartDate, setAuctionStsrtDate] = useState();

  return (
    <>
      <h1 className="auction-title">
        Put your work up for Musit X Enum30 Auction
      </h1>
      <div className="auction-layout">
        <div className="auction-imgbox">
          <h1>Album Cover</h1>
          <img
            src="https://cdn.univ20.com/wp-content/uploads/2018/10/ea6345acc53bb8cbac3564f661ae9dd4.png"
            alt="auction-cover"
            id="auction-albumcover"
          />
        </div>
        <div className="auction-box">
          <h2>Price Start</h2>
          <Input type="text" placeholder="Amount" sx={{ width: 400 }}></Input>
          <h2>Duration</h2>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label={"Acution Duration"}
              value={auctionStartDate}
              onChange={(newValue) => {
                setAuctionStsrtDate(newValue);
              }}
              renderInput={(params) => (
                <TextField sx={{ width: 400 }} {...params} />
              )}
            />
          </LocalizationProvider>
        </div>
        <Button>Put up d</Button>
      </div>
    </>
  );
};
