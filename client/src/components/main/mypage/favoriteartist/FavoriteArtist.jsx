import React from "react";
import { useSelector } from "react-redux";
import ArtistCard from "./ArtistCard";

const FavoriteArtist = () => {
  return (
    <div className="favorite" style={{ overflow: "hidden" }}>
      <div
        className="artistfavorite"
        style={{ overflow: "auto", maxHeight: "700px" }}
      >
        <ArtistCard sx={{ width: "100%" }} />
      </div>
    </div>
  );
};

export default FavoriteArtist;
