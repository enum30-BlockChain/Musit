import React from "react";
import "./UserDrawer.css";
import Userinfomation from "../../mypage/userinformation/Userinformation";
import Artistinfo from "../../artist/artistinfo/Artistinfo";
const UserDrawer = () => {
  // sdadflalksjfksf;
  return (
    <section className="user-drawer">
      <div className="totaluserinfo">
        <div className="userinfo-toggle">
          <Userinfomation />
        </div>
        <div className="artistinfo-toggle">
          <Artistinfo />
        </div>
      </div>
    </section>
  );
};

export default UserDrawer;
