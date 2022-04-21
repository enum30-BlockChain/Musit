import React from "react";
import Userinfodashborad from "./userinfodashborad/Userinfodashborad";
import Usercontent from "./usercontent/Usercontent";

const Userdashbord = () => {
  return (
    <>
      <div className="dashboard">
        <Userinfodashborad />
        <Usercontent />
      </div>
    </>
  );
};

export default Userdashbord;
