import "./Favorite.css";
import React from "react";
import StickyHeadTableMusic from "./favoritelist/StickyHeadTableMusic";
import StickyHeadTableArtist from "./favoritelist/StickyHeadTableArtist";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

export const Favorite = ({}) => {
  const likeArtist = useSelector((state) => state.likeArtist);
  return (
    <>
      <div className="favorite">
        <div className="musicfavorite">
          <h2>Music Favorite</h2>
          <StickyHeadTableMusic sx={{ width: "50%" }} />
        </div>
        <div className="artistfavorite">
          <h2>Artist Favorite</h2>
          {likeArtist.loading ? (
            <CircularProgress />
          ) : (
            <StickyHeadTableArtist sx={{ width: "50%" }} />
          )}
        </div>
      </div>
    </>
  );
};
