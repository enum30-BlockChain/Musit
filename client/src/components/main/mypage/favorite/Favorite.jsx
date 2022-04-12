import "./Favorite.css";
import React from "react";
import StickyHeadTableMusic from "./favoritelist/StickyHeadTableMusic";

export const Favorite = ({}) => {
  return (
    <>
      <div className="favorite">
        <div className="musicfavorite">
          <h2>Music Favorite</h2>
          <StickyHeadTableMusic sx={{ width: "50%" }} />
        </div>
        <div className="artistfavorite">
          <h2>Artist Favorite</h2>
        </div>
      </div>
    </>
  );
};
