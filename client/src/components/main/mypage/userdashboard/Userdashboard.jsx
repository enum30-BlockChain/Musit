import React from "react";
import Userinformation from "../userinformation/Userinformation";
import Usercontent from "./usercontent/Usercontent";

const Userdashbord = () => {
  return (
    <>
      <div className="dashboard">
        <div className="dashboard-layout">
          <div className="info-details">
            <Userinformation />
          </div>
          <div className="overvie">
            <Usercontent />
          </div>
        </div>
      </div>
    </>
  );
};

export default Userdashbord;
