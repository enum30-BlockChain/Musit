import React, { useEffect, useState } from "react";
import axios from "axios";
import ArtistCard from "../card/ArtistCard";
import SongCard from "../card/SongCard";

const UserList = ({ address }) => {
  useEffect(() => {
    const url = "http://localhost:5000/artistlikes/list";
    const response = axios.get(url).then((res) => {
      console.log(res.data);
    });
  }, []);

  const [artistList, setAtistList] = useState([]);
  const [count, setCount] = useState([]);
  const [song, setSong] = useState([
    "사랑노래",
    "사랑아",
    "사랑비",
    "사랑",
    "사랑애",
  ]);
  const [likes, setlikes] = useState(0);
  const [select, setSelect] = useState("");

  const LoginOnClick = async () => {
    const url = "http://localhost:5000/artists/artistList";
    const response = await axios.get(url);
    console.log(response.data);
    setAtistList(response.data);
  };
  const LikeOnClick = async () => {
    if (artistList[select] !== 0) {
      const likeSelect = artistList[select].artist_name;
      const selectArtistLikes = artistList[select].likes;
      alert("가수" + likeSelect + "좋아합니다.");
      const url = "http://localhost:5000/artistlikes/like";
      const response = await axios.post(url, { address, likeSelect });
      console.log(response.data.likes);
    }
  };

  return (
    <div>
      <div>
        Song List :
        {song.map((music, index) => (
          <SongCard id={index} key={index} name={music} />
        ))}
      </div>
      <button onClick={LoginOnClick}>UserList</button>
      <div>
        Artist List :
        {artistList.map((list, index) => (
          <ArtistCard
            id={index}
            key={index}
            name={list.artist_name}
            setSelect={setSelect}
            select={select}
          />
        ))}
        <button onClick={LikeOnClick}>좋아요</button>
      </div>
    </div>
  );
};

export default UserList;
