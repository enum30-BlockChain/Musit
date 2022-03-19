import React from "react";

const ArtistCard = ({ id, name, likes, setlikes, setSelect }) => {
  const OnClickCheck = (e) => {
    setSelect(e.target.value);
    // console.log(e.target.value);
    // alert("가수" + name + "좋아합니다.");
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
              onClick={OnClickCheck}
            ></input>
          </div>
          {likes}
        </div>
      </div>
    </>
  );
};

export default ArtistCard;
