import "./Favorite.css";
import React, { useEffect, useState } from "react";
import StickyHeadTable from "../../../mui/StickyHeadTable";
import StickyHeadTableArtist from "../../../mui/StickyHeadTableArtist";

import axios from "axios";

export const Favorite = ({ address }) => {
  const [userdata, setUserdata] = useState("");
  const [findMusic, setFindMusic] = useState("");
  const [findartist, setFindartist] = useState("");

  async function userdetail() {
    const url = "http://localhost:5000/users/signin";
    const response = await axios.post(url, { address });
    setUserdata(response.data);
  }

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
    userdetail();
    musicfavorite();
    favoriteartist();
  }, []);

  return (
    <>
      <div className="favorite">
        <div className="musicfavorite">
          <h2>Music Favorite</h2>
          <StickyHeadTable
            sx={{ width: "50%" }}
            findMusic={findMusic}
            findartist={findartist}
          />
        </div>
        <div className="artistfavorite">
          <h2>Artist Favorite</h2>
          <StickyHeadTableArtist
            sx={{ width: "50%" }}
            findartist={findartist}
          />
        </div>
      </div>
    </>
  );
};
