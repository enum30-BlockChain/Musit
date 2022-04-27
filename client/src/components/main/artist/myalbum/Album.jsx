import "./css/Album.css";
import React, { useEffect, useState } from "react";
import AlbumList from "./albumlist/AlbumList";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { readArtistData } from "../../../../redux/actions/artistActions";
import Nothing from "../../../landingpage/pages/Nothing";
const Album = () => {
  const artist = useSelector((state) => state.artist);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(readArtistData());
  }, []);
  return (
    <>
      <div className="Album">
        <div className="list">
          <div className="title">
            <i className="uil uil-compact-disc"></i>
            <span className="text"> Album List</span>
          </div>
          {artist.loading ? (
            <CircularProgress />
          ) : artist.Music == "" ? (
            <>
              <Nothing></Nothing>
            </>
          ) : (
            <AlbumList sx={{ width: "50%" }} />
          )}
        </div>
      </div>
    </>
  );
};

export default Album;
