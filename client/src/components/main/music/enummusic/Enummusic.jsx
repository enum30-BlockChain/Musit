import React, { useState } from "react";
import ScrollEvent from "./scrollEvent/ScrollEvent";
import "./Enummusic.css";

export default function Enummusic() {
  return (
    <>
      <div className="enumusiclist">
        <div className="eummusiclist-description">
          <span className="enumusiclist-title">Num</span>
          <span className="enumusiclist-title">Music Title</span>
          <span className="enumusiclist-title">Artist Name</span>
          <span className="enumusiclist-title">Description</span>
          <span className="enumusiclist-title">Like</span>
          <span className="enumusiclist-title">Play Count</span>
          <span className="enumusiclist-title">Duration</span>
        </div>
        <ScrollEvent />
      </div>
    </>
  );
}
