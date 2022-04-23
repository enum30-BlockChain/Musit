import "./UserDrawer.css";
import React, { useEffect, useState } from "react";
import Userinformation from "./../../mypage/userinformation/Userinformation";
import Artistinformation from "./../../artist//artistinfo/Artistinfo";

const UserDrawer = () => {
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
    openPage("News");
  }, []);

  // // Get the element with id="defaultOpen" and click on it
  // const click = document.getElementById("defaultOpen");
  // console.log(click);

  return (
    <>
      <div className="info-btn">
        <button
          id="defaultOpen"
          className="tablink-1"
          onClick={() => openPage("Home", this, "red")}
        >
          User Infomation
        </button>
        <button
          className="tablink-2"
          onClick={() => openPage("News", this, "green")}
        >
          Artist Infomation
        </button>
      </div>

      <div id="Home" className="tabcontent">
        <Userinformation />
      </div>

      <div id="News" className="tabcontent">
        <Artistinformation />
      </div>
    </>
  );
};

export default UserDrawer;
