import React from "react";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";

export default function Userinformation({}) {
  const user = useSelector((state) => state.user);
  const metamask = useSelector((state) => state.metamask);

  const sliceAddress =
    metamask.accounts[0] &&
    metamask.accounts[0].substr(0, 5) +
      metamask.accounts[0].substr(metamask.accounts[0].length - 4, 4) +
      "...";

  return (
    <div className="userinfo-layout">
      <div className="userinfo-card">
        <div className="title">
          <i className="uil uil-create-dashboard"></i>
          <span className="text"> Dashboard</span>
        </div>
        <div className="userinfo-image">
          <Avatar
            className="userinfo-image"
            alt="Remy Sharp"
            src={user.img}
            sx={{ width: 260, height: 260 }}
          />
        </div>
        <div className="userinfo-info">
          <h2 className="nickname">Nickname</h2>

          <p>{user.nickname}</p>
          <h2 className="address">Address</h2>

          <span>{sliceAddress}</span>
          <h2 className="subscription">Subscription</h2>
          <span>{user.subscription}월이용권 </span>

          <div>
            <h2 className="Nation">Nation</h2>
            <p>국가 : {user.nation}</p>
          </div>

          <h2 className="userinfo-Genre">Genre</h2>

          <span>{user.genre}</span>

          <div className="setting-btn"></div>
        </div>
      </div>
    </div>
  );
}
