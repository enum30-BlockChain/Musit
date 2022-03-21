import React from "react";

const ArtistCard = ({ id, name, setSelect, select }) => {
  const LikeOnClick = (e) => {
    setSelect(e.target.value);
    console.log(e.target.value);
  };
  return (
    <>
      <div>
        <div name="artistname" value={id}>
          {name}
          <div>
            <input
              type="checkbox"
              name="likes"
              value={id}
              onClick={LikeOnClick}
            ></input>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtistCard;
