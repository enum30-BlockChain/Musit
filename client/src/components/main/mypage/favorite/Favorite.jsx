import "./Favorite.css";
import React, { useEffect, useState } from "react";
import StickyHeadTable from "../../../mui/StickyHeadTable";

import axios from "axios";

export const Favorite = ({ address }) => {
  const [userdata, setUserdata] = useState("");
  const [findMusic, setFindMusic] = useState("");

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

  useEffect(() => {
    userdetail();
    musicfavorite();
  }, []);

  return (
    <>
      <div className="favorite">
        <div className="musicfavorite">
          <h2>Music Favorite</h2>
          <StickyHeadTable
            sx={{ width: "50%" }}
            userdata={userdata}
            findMusic={findMusic}
          />
        </div>
        <div className="artistfavorite">
          <h2>Artist Favorite</h2>
          <StickyHeadTable sx={{ width: "50%" }} />
        </div>
      </div>
    </>
  );
};
