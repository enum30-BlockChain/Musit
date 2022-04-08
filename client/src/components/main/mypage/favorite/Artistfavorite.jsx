import "./Favorite.css";
import React, { useEffect, useState } from "react";
import StickyHeadTableArtist from "../favorite/favoritelist/StickyHeadTableArtist";

// import axios from "axios";

export const Artistfavorite = ({ address }) => {
  return (
    <>
      <div className="favorite">
        <div className="artistfavorite">
          <h2>My Favorite Artist</h2>
          <StickyHeadTableArtist sx={{ width: "50%" }} address={address} />
        </div>
      </div>
    </>
  );
};
