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

        <p className="error-name">{error.name}</p>
        <p className="error-message">{error.message}</p>

        <div className="error-btn-style" onClick={moveToLandingpage}>
          Move to Landingpage
        </div>
      </div>
    </>
  );
}
