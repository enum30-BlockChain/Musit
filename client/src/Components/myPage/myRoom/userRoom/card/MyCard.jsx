import React from "react";

const MyCard = ({ id, name }) => {
  return (
    <>
      <div>
        <div name="artistname" value={id}>
          {name}
          <input type="checkbox"></input>
        </div>
      </div>
    </>
  );
};

export default MyCard;
