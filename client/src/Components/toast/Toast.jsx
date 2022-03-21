import React from "react";
import "./toast.css";

const Toast = () => {
  return (
    <div className="toast-container">
      <div className="toast-content">
        <i className="fas fa-solid fa-check check"></i>
        <div className="toast-message">
          <div className="text text-1">Success</div>
          <div className="text text-2">Your Changes has been saved!</div>
        </div>
      </div>
      <i className="fa-solid fa-xmark close"></i>
      <div className="progress"></div>
    </div>
  );
};

export default Toast;
