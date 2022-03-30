import "./Favorite.css";
import React from "react";
import StickyHeadTable from "../../../mui/StickyHeadTable";

export const Favorite = () => {
  const hi = "hi";
  return (
    <>
      <div className="favorite">
        <div className="musicfavorite">
          <h2>Music Favorite</h2>
          <StickyHeadTable sx={{ width: "50%" }} />
        </div>
        <div className="artistfavorite">
          <h2>Artist Favorite</h2>
          <StickyHeadTable sx={{ width: "50%" }} />
        </div>
      </div>
    </>
  );
};
