import React, { useState } from "react";
import MyCard from "../card/MyCard";

const MyPlayed = () => {
  const [mymusic, setMymusic] = useState([
    "연애하자",
    "사랑하자",
    "연애는",
    "사랑나비",
    "사랑저격",
  ]);
  return (
    <>
      <div>
        <li>나의재생항목</li>
        {mymusic.map((music, index) => (
          <MyCard id={index} key={index} name={music} />
        ))}
      </div>
    </>
  );
};

export default MyPlayed;
