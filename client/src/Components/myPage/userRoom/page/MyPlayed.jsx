import React, { useState } from "react";
import MyCard from "../card/MyCard";

const MyPlayed = () => {
  const [mymusic, setMymusic] = useState([]);
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
