import React from "react";
import "./Nothing.css";

const Nothing = (props) => {
  return (
    <>
      <div className="nothing">
        <span className="nothing-ex">!</span>
        <span className="nothing-message">There is no item</span>
        {props.message}
      </div>
    </>
  );
};

export default Nothing;
