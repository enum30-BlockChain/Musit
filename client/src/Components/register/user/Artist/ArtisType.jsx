import React from "react";

const ArtisType = ({ onChange }) => {
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
      </div>
    </>
  );
};

export default ArtisType;
