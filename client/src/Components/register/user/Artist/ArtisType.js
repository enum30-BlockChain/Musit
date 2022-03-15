import React from "react";

const ArtisType = ({ onChange, submitOnClick }) => {
  return (
    <>
      <div className="artist-name">
        <input
          required
          label="Email"
          variant="standard"
          name="nickname"
          onChange={onChange}
        />
        <button onClick={submitOnClick}>중복확인</button>
      </div>
    </>
  );
};

export default ArtisType;
