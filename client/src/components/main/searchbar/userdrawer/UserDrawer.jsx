import React from "react";
import "./UserDrawer.css";
import Userinfomation from "../../mypage/userinformation/Userinformation";
import Artistinfo from "../../artist/artistinfo/Artistinfo";
const UserDrawer = () => {
  return (
    <section className="user-drawer">
      <ul className="user-drawer-nav">
        <li className="user-drawer-active">
          <a href="#1a" data-toggle="tab">
            User Infomation
          </a>
        </li>
        <li className="user-drawer-active">
          <a href="#2a" data-toggle="tab">
            Artist Infomation
          </a>
        </li>
      </ul>
      {/* <div className="totaluserinfo">
        <div className="userinfo-toggle">
          <Userinfomation />
        </div>
        <div className="artistinfo-toggle">
          <Artistinfo />
        </div>
      </div> */}
    </section>
  );
};

export default UserDrawer;
