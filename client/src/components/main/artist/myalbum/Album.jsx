import "./css/Album.css";
import React, { useEffect, useState } from "react";
import AlbumList from "./albumlist/AlbumList";
import { useSelector } from "react-redux";

const Album = ({ address }) => {
  const [nickname, setNickname] = useState("");
  const artist = useSelector((state) => state.artist);

  useEffect(() => {
    setNickname(artist.artist_name);
  }, []);

  return (
    <>
      <div className="Album">
        <div className="list">
          <h2>Album List</h2>
          <AlbumList
            sx={{ width: "50%" }}
            address={address}
            nickname={nickname}
          />
        </div>
      </div>
    </>
  );
};

export default Album;
