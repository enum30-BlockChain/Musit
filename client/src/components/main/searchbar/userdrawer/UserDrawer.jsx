import React from "react";
import "./UserDrawer.css";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// import Userinfomation from "../../mypage/userinformation/Userinformation";
// import Artistinfo from "../../artist/artistinfo/Artistinfo";

const UserDrawer = () => {
  return (
    <>
      <AppBar>
        <Tabs>
          <Tab label="1" />
          <Tab label="2" />
          <Tab label="3" />
        </Tabs>
      </AppBar>
    </>
  );
};

export default UserDrawer;
