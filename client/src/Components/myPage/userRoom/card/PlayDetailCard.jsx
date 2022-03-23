import React from "react";

const PlayDetailCard = ({ id, name, genre, title, img }) => {
  return (
    <>
      <div className="Play-DetailCard">
        <div className="Detail-contants">
          <p>{name}</p>
          <p>{genre}</p>
          <p>{title}</p>
          <img src={img} style={{ width: "100px" }} />
        </div>
      </div>
    </>
  );
};

export default PlayDetailCard;
