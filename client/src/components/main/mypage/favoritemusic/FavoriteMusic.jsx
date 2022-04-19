import React from "react";
import MusicCard from "./MusicCard";
import "./FavoriteMusic.css";

const FavoriteMusic = () => {
  return (
    <div className="favorite">
      <div className="musicfavorite">
        <MusicCard sx={{ width: "100%" }} />
      </div>
    </div>
  );
};

export default FavoriteMusic;
