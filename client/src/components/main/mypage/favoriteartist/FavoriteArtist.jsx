import React from "react";
import { useSelector } from "react-redux";
import Nothing from "../../../landingpage/pages/Nothing";
import ArtistCard from "./ArtistCard";

const FavoriteArtist = () => {
  const likeArtist = useSelector((state) => state.likeArtist);
  return (
    <div
      className="favorite"
      style={{ overflow: "hidden", justifyContent: "center" }}
    >
      <div
        className="artistfavorite"
        style={{
          overflow: "auto",
          maxHeight: "700px",
        }}
      >
        {likeArtist.data == "" ? (
          <>
            <Nothing />
          </>
        ) : (
          <ArtistCard sx={{ width: "100%" }} />
        )}
      </div>
    </div>
  );
};

export default FavoriteArtist;
