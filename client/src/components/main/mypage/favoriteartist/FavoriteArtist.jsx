import React from "react";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import ArtistCard from "./ArtistCard";

const FavoriteArtist = () => {
  const likeArtist = useSelector((state) => state.likeArtist);

  return (
    <div className="favorite">
      <div className="artistfavorite">
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
