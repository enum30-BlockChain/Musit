import "./FavoriteArtist.css";
import React from "react";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import ArtistCard from "./ArtistCard";
import { height } from "@mui/system";

const FavoriteArtist = () => {
  const likeArtist = useSelector((state) => state.likeArtist);

  return (
    <div className="favorite">
      <div className="artistfavorite">
        <h2>Artist Favorite</h2>
        {likeArtist.loading ? (
          <CircularProgress />
        ) : (
          <ArtistCard sx={{ width: "100%", height: "100%" }} />
        )}
      </div>
    </div>
  );
};

export default FavoriteArtist;
