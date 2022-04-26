import React from "react";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import ArtistCard from "./ArtistCard";

const FavoriteArtist = () => {
  const likeArtist = useSelector((state) => state.likeArtist);

  return (
    <div className="favorite" style={{ overflow: "hidden" }}>
      <div
        className="artistfavorite"
        style={{ overflow: "auto", maxHeight: "700px" }}
      >
        {likeArtist.loading ? (
          <CircularProgress />
        ) : (
          <ArtistCard sx={{ width: "100%" }} />
        )}
      </div>
    </div>
  );
};

export default FavoriteArtist;
