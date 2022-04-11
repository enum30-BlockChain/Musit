import "./css/ArtistsList.css";
import React from "react";

import ArtistListCard from "./artistlist/ArtistListCard";

export const ArtistsList = ({ address }) => {
  //내가 좋아하는 아티스트를 불러오는 핸들러

  return (
    <>
      <div className="favorite">
        <div className="artistfavorite">
          <h2>Artist List</h2>
          <ArtistListCard sx={{ width: "50%" }} address={address} />
        </div>
      </div>
    </>
  );
};
