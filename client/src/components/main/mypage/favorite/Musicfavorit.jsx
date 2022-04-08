import "./Favorite.css";
import React, { useEffect, useState } from "react";
import StickyHeadTableMusic from "./favoritelist/StickyHeadTableMusic";

export const Musicfavorite = ({ address }) => {
  return (
    <>
      <div className="favorite">
        <div className="musicfavorite">
          <h2>Music Favorite Music</h2>
          <StickyHeadTableMusic sx={{ width: "50%" }} address={address} />
        </div>
      </div>
    </>
  );
};
