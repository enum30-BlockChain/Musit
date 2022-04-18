import React from "react";
import MainCard from "../main/MainCard";
import ScrollEvent from "../scrollEvent/ScrollEvent";

export default function Enummusic() {
  return (
    <>
    <ScrollEvent />
      {/* <div style={{ marginTop: "50px" }} className="music-cards-container">
        {result.length > 0 &&
          result.map((music, i) => {
            const findLike = music.MusicLikes.find(
              (like) => like.user_address === user.address
            );
            return (
              <>
                <MainCard
                  id={i}
                  key={i}
                  music={music}
                  address={user.address}
                  checkBox={findLike}
                />
              </>
            );
          })}
      </div> */}
    </>
  );
}
