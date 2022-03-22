import React, { useState } from "react";
import RecentCard from "../card/RecentCard";
const RecentPlayed = () => {
  const [recent, setRecent] = useState([]);
  return (
    <>
      <div>
        <li>최근재생항목</li>
        {recent.map((remusic, index) => (
          <RecentCard id={index} key={index} name={remusic} />
        ))}
      </div>
    </>
  );
};

export default RecentPlayed;
