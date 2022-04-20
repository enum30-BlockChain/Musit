import "./Error.css";
import React from "react";

export default function Error({ error }) {
  const moveToLandingpage = () => {
    window.location.href = "/";
  };
  console.log(error);

  return (
    <>
      <div className="error-layout">
        <div className="error-details">
          <p className="error-title">Oops!</p>

          <p className="error-name">{error.name}</p>
          <p className="error-message">{error.message}</p>
        </div>
        <div className="error-btn-style" onClick={moveToLandingpage}>
          Move to Mainpage
        </div>
      </div>
    </>
  );
}
