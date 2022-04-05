import "./css/ArtistsList.css";
import React, { useEffect, useState } from "react";

import axios from "axios";
import ArtistListCard from "./artistlist/ArtistListCard";
import ArtistCard from "./artistlist/ArtistCard";
import { fetchArtistListData } from "../../../../redux/artistlist/artistListAction";
import { useDispatch, useSelector } from "react-redux";

export const ArtistsList = ({ address }) => {
  const [artistdetail, setArtistDetail] = useState("");

  const dispatch = useDispatch();
  const artistlist = useSelector((state) => state.artistlist);

  useEffect(() => {
    dispatch(fetchArtistListData());
  }, []);

  //내가 좋아하는 아티스트를 불러오는 핸들러

  return (
    <>
      <div className="favorite">
        <div className="artistfavorite">
          <h2>Artist List</h2>
          <ArtistListCard sx={{ width: "50%" }} address={address} />
        </div>
      </div>
    </>
  );
};
