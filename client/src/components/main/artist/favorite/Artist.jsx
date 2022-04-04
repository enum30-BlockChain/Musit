import "./ArtistsList.css";
import React from "react";
import StickyHeadTableArtist from "../../mypage/favorite/favoritelist/StickyHeadTableArtist";

import ArtistList from "./artistlist/ArtistList";

export const Artist = ({ address }) => {
  //내가 좋아하는 아티스트를 불러오는 핸들러
  return (
    <>
      <div className="favorite">
        <div className="artistfavorite">
          <h2>Artist List</h2>
          <ArtistList sx={{ width: "50%" }} address={address} />
        </div>
        <div className="artistfavorite">
          <h2>Artist Favorite</h2>
          <StickyHeadTableArtist sx={{ width: "50%" }} />
        </div>
      </div>
    </>
  );
};
