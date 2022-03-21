import React from "react";

const LikeCard = ({ id, name, likes }) => {
  return (
    <>
      <div name="ArtistLikeList" value={id}>
        <p name="likes" value={id}>
          {name}, {likes}
        </p>
      </div>
    </>
  );
};

export default LikeCard;
