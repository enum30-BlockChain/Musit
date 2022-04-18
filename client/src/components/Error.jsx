import "./Error.css";
import React from "react";

export default function Error(props) {
  const moveToLandingpage = () => {
    window.location.href = "/landingpage";
  };

  return (
    <>
      <p className="glitch">{props.error.status} Error Page</p>

      <h1>Your Error is {props.error.name}</h1>
      <p>{props.error.message}</p>

      <button onClick={moveToLandingpage}>Move to Landingpage</button>
      <br></br>
      <button onClick={(e) => history.go(-1)}>Move to previous page</button>
    </>
  );
}
