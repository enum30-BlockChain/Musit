import React from "react";
import "./LisenerType.css";
const LisenerType = ({ id, name, setSelected }) => {
  const handleOnclick = (e) => {
    setSelected(e.target.value);
  };

  return (
    <div className="music-type-container">
      <div className="music-type-name">{name}</div>
      <div>
        <input
          type="radio"
          name="musicType"
          value={id - 1}
          onClick={handleOnclick}
        />
      </div>
    </div>
  );
};

export default LisenerType;
