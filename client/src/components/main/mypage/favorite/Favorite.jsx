import "./Favorite.css";
import React, { useEffect, useState } from "react";
import StickyHeadTable from "../favorite/favoritelist/StickyHeadTable";
import StickyHeadTableArtist from "../favorite/favoritelist/StickyHeadTableArtist";

import axios from "axios";

export const Favorite = ({ address }) => {
  const [findMusic, setFindMusic] = useState("");
  const [findartist, setFindartist] = useState("");

  async function musicfavorite() {
    const url = "http://localhost:5000/music/likes/like";
    const response = await axios.post(url, { address });
    setFindMusic(response.data);
  }

  useEffect(() => {
    musicfavorite();
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
          <StickyHeadTableArtist sx={{ width: "50%" }} />
        </div>
      </div>
    </>
  );
};
