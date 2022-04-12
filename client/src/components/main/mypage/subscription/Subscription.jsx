import "./Subscription.css";
import React from "react";
import Button from "@mui/material/Button";

export const Subscription = () => {
  return (
    <>
      <h2 className="sub">Subscription Options</h2>

      <div className="sub-box">
        <div className="sub-card">
          <h3 className="sub-index">1 Month Supscription</h3>
          0.1 ethereum
          <Button>BUY</Button>
        </div>
        <div className="sub-card">
          <h3 className="sub-index">3 Months Supscription</h3>
          0.3 ethereum
          <Button>BUY</Button>
        </div>
        <div className="sub-card">
          <h3 className="sub-index">6 Months Supscription</h3>
          0.6 ethereum
          <Button>BUY</Button>
        </div>
      </div>
    </>
  );
};
