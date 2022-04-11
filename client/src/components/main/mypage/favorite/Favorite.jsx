import "./Favorite.css";
import React, { useEffect, useState } from "react";
import StickyHeadTableMusic from "./favoritelist/StickyHeadTableMusic";
import StickyHeadTableArtist from "../favorite/favoritelist/StickyHeadTableArtist";

// import axios from "axios";

export const Favorite = ({ address }) => {
  return (
    <>
      <div className="favorite">
        <div className="musicfavorite">
          <h2>Music Favorite</h2>
          <StickyHeadTableMusic sx={{ width: "50%" }} address={address} />
        </div>
        <div className="artistfavorite">
          <h2>Artist Favorite</h2>
          <StickyHeadTableArtist sx={{ width: "50%" }} address={address} />
        </div>
      </div>
    </>
  );
};
