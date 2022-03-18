import React, { useState } from "react";
import RecentCard from "../card/RecentCard";
const RecentPlayed = () => {
  const [recent, setRecent] = useState([
    "사랑비",
    "사랑아",
    "사랑꾼",
    "사랑나비",
    "사랑저격",
  ]);
  return (
    <>
      <div>
        {recent.map((remusic, index) => (
          <RecentCard id={index} key={index} name={remusic} />
        ))}
      </div>
    </>
  );
};

export default RecentPlayed;
