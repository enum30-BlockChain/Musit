import React, { useState } from "react";
import "./ListenerType.css";
const ListenerType = ({ id, name, changeHandler, checkedInputs }) => {
  return (
    <div className="music-type-container">
      <div className="music-type-name">{name}</div>
      <div>
        <input
          type="checkbox"
          name="musicType"
          value={id - 1}
          onChange={(e) => {
            changeHandler(e.currentTarget.checked, name);
          }}
          checked={checkedInputs.includes(name) ? true : false}
        />
      </div>
    </div>
  );
};

export default ListenerType;
