import "./css/Elbum.css";
import React, { useEffect, useState } from "react";
import ElbumList from "./elbumlist/ElbumList";
import { useSelector } from "react-redux";

const Elbum = ({ address }) => {
  const [nickname, setNickname] = useState("");
  const artist = useSelector((state) => state.artist);

  useEffect(() => {
    setNickname(artist.artist_name);
  }, []);

  return (
    <>
      <div className="Elbum">
        <div className="list">
          <h2>Elbum List</h2>
          <ElbumList
            sx={{ width: "50%" }}
            address={address}
            nickname={nickname}
          />
        </div>
      </div>
    </>
  );
};

export default Elbum;
