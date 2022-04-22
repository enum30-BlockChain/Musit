import React, { useState } from "react";
import ScrollEvent from "./scrollEvent/ScrollEvent";
import "./Enummusic.css";

export default function Enummusic() {
  return (
    <>
      <div className="enumusiclist">
        <div className="eummusiclist-description">
          <span>Num</span>
          <span>Music Title</span>
          <span>Artist Name</span>
          <span>Description</span>
          <span>Like</span>
          <span>Play Count</span>
          <span>Duration</span>
        </div>
        <ScrollEvent />
      </div>
    </>
  );
}
