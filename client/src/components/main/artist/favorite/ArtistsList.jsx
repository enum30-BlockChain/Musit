import "./css/ArtistsList.css";
import React, { useEffect, useState } from "react";

import axios from "axios";
import ArtistLikeListCard from "./artistlist/ArtistLikeListCard";
import ArtistListCard from "./artistlist/ArtistListCard";

export const ArtistsList = ({ address }) => {
  const [artistdetail, setArtistDetail] = useState("");
  const [artistList, setAtistList] = useState([]);

  async function artistlist() {
    const url = "http://localhost:5000/artists/list";
    const response = await axios.get(url);
    setAtistList(response.data);
  }

  async function favoritedetail() {
    const url = "http://localhost:5000/artists/likes/list/detail";
    const response = await axios.post(url, { address });
    setArtistDetail(response.data);
  }

  useEffect(() => {
    favoritedetail();
    artistlist();
  }, []);

  //내가 좋아하는 아티스트를 불러오는 핸들러
  return (
    <>
      <div className="favorite">
        <div className="artistfavorite">
          <h2>Artist List</h2>
          <ArtistListCard
            sx={{ width: "50%" }}
            artistList={artistList}
            address={address}
          />
        </div>
        <div className="artistfavorite">
          <h2>Artist Favorite</h2>
          <ArtistLikeListCard
            sx={{ width: "50%" }}
            artistdetail={artistdetail}
          />
        </div>
      </div>
    </>
  );
};
