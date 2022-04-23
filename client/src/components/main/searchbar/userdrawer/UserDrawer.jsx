import "./UserDrawer.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Userinformation from "./../../mypage/userinformation/Userinformation";
import Artistinformation from "./../../artist//artistinfo/Artistinfo";

const UserDrawer = () => {
  const artist = useSelector((state) => state.artist);
  //--------------------------penal tab js--------------------------
  function openPage(pageName, color) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "block";
  }

  useEffect(() => {
    openPage("Userinfo-drawer");
  }, []);

  const cannotopen = () => {
    alert("You are not a Artist yet. Please be our Artist!");
  };

  return (
    <>
      <div className="info-btn">
        <button
          id="defaultOpen"
          className="tablink-1"
          onClick={() => openPage("Userinfo-drawer", this, "red")}
        >
          User Infomation
        </button>
        <button
          className="tablink-2"
          onClick={() => {
            artist.artist_name !== null
              ? openPage("Artist-drawer", this, "green")
              : cannotopen();
          }}
        >
          Artist Infomation
        </button>
      </div>

      <div id="Userinfo-drawer" className="tabcontent">
        <Userinformation />
      </div>

      <div id="Artist-drawer" className="tabcontent">
        <Artistinformation />
      </div>
    </>
  );
};

export default UserDrawer;
