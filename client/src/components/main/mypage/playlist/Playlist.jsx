import "./Playlist.css";
import React, { useEffect, useState } from "react";
import StickyHeadTable from "../favorite/favoritelist/StickyHeadTable";

import axios from "axios";

export const Playlist = ({ address }) => {
  const [findMusic, setFindMusic] = useState("");
  const [findartist, setFindartist] = useState("");

  async function musicfavorite() {
    const url = "http://localhost:5000/music/likes/like";
    const response = await axios.post(url, { address });
    setFindMusic(response.data);
  }

  async function favoriteartist() {
    const url = "http://localhost:5000/artists/likes/list";
    const response = await axios.post(url, { address });
    setFindartist(response.data);
  }

  useEffect(() => {
    musicfavorite();
    favoriteartist();
  }, []);

  return (
    <>
      <div className="playlist">
        <h2>My Play List</h2>
        <StickyHeadTable
          sx={{ width: "50%" }}
          findMusic={findMusic}
          findartist={findartist}
        />
      </div>
    </>
  );
};
