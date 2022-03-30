import "./Playlist.css";
import React from "react";
import StickyHeadTable from "../../../mui/StickyHeadTable";

export const Playlist = () => {
  return (
    <>
      <div className="playilist">
        <h2>My Play List</h2>
        <StickyHeadTable />
      </div>
    </>
  );
};
