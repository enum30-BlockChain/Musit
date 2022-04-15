import "./css/Album.css";
import React, { useEffect, useState } from "react";
import AlbumList from "./albumlist/AlbumList";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

const Album = () => {
  const artist = useSelector((state) => state.artist);

  return (
    <>
      <div className="Album">
        <div className="list">
          <h2>Album List</h2>
          {artist.loading ? (
            <CircularProgress />
          ) : (
            <AlbumList sx={{ width: "50%" }} />
          )}
        </div>
      </div>
    </>
  );
};

export default Album;
