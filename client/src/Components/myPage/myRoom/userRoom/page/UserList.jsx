import React, { useState } from "react";
import axios from "axios";
import ArtistCard from "../card/ArtistCard";
import SongCard from "../card/SongCard";

const UserList = ({ address }) => {
  const [artistList, setAtistList] = useState([]);
  const [song, setSong] = useState([
    "사랑노래",
    "사랑아",
    "사랑비",
    "사랑",
    "사랑애",
  ]);

  const LoginOnClick = async () => {
    const url = "http://localhost:5000/artists/artistList";
    const response = await axios.get(url);
    setAtistList(response.data);
  };
  console.log(artistList);
  return (
    <div>
      <button onClick={LoginOnClick}>UserList</button>
      <div>
        Song List :
        {song.map((music, index) => (
          <SongCard id={index} key={index} name={music} />
        ))}
      </div>
      <div>
        Artist List :
        {artistList.map((list, index) => (
          <ArtistCard id={index} key={index} name={list.artist_name} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
