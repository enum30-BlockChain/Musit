import React from "react";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import "./Userinfodashborad.css";
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
          <div>
            <Avatar
              className="userinfo-image"
              alt="Remy Sharp"
              src={user.img}
              sx={{ my: 1, width: 260, height: 260 }}
            />
          </div>
        </div>

        <div className="userinfo-info">
          <div className="nickname-box">
            <h2 className="nickname">Nickname</h2>
            <p>{user.nickname}</p>
          </div>

          <div className="address-box">
            <h2 className="address">Address</h2>
            <span>{sliceAddress}</span>
          </div>

          <div className="Nation-box">
            <h2 className="Nation">Nation</h2>
            <p>국가 : {user.nation}</p>
          </div>

          <div className="Genre-box">
            <h2 className="userinfo-Genre">Genre</h2>
            <span> {user.genre.join(", ")}</span>
          </div>

          <div className="setting-btn"></div>
        </div>
      </div>
    </div>
  );
}
