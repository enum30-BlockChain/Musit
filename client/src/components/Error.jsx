import "./Error.css";
import React from "react";

export default function Error({ error }) {
  const moveToLandingpage = () => {
    window.location.href = "/landingpage";
  };
  console.log(error);

  return (
    <>
      <div className="error-layout">
        <p className="error-title">Oops!</p>

        <p className="error-name">{error.number}</p>
        <p className="error-message">{error.message}</p>

        <div className="error-btn-style">
          <label className="error-btn" htmlfor="movetolanding">
            Move to Landingpage
          </label>
          <button
            style={{ display: "none" }}
            id="movetolanding"
            onClick={moveToLandingpage}
          ></button>
        </div>
      </div>
    </>
  );
}
