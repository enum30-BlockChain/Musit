import React, { useState } from "react";
import axios from "axios";
import ArtistCard from "../card/ArtistCard";
import SongCard from "../card/SongCard";
import LikeCard from "../card/LikeCard";

const UserList = ({ address }) => {
  const [artistList, setAtistList] = useState([]);
  const [song, setSong] = useState([
    "사랑노래",
    "사랑아",
    "사랑비",
    "사랑",
    "사랑애",
  ]);
  const [select, setSelect] = useState("");
  const [likelist, setLikelist] = useState([""]);

  //아티스트조회 함수 이벤트 핸들러
  const LoginOnClick = async () => {
    const url = "http://localhost:5000/artists/artistList";
    const response = await axios.get(url);
    setAtistList(response.data);
  };

  //내가 좋아하는 아티스트를 불러오는 핸들러
  const LikeListOnClick = () => {
    const url = "http://localhost:5000/artistlikes/list";
    const response = axios.post(url, { address }).then((res) => {
      console.log(res.data);
      setLikelist(res.data);
    });
  };

  //내가 좋아하는 아티스트를 눌렀을때 개수를 올려주는 함수
  return (
    <div>
      <div>
        Song List :
        {song.map((music, index) => (
          <SongCard id={index} key={index} name={music} />
        ))}
      </div>
      <div>
        LikeList :
        {likelist.map((LikeList, index) => (
          <LikeCard
            id={index}
            key={index}
            name={LikeList.artist_artist_name}
            likes={LikeList.likes}
          />
        ))}
      </div>
      <button onClick={LikeListOnClick}>LikeList</button>

      <button onClick={LoginOnClick}>List</button>
      <div>
        Artist List :
        {artistList.map((list, index) => (
          <ArtistCard
            id={index}
            key={index}
            name={list.artist_name}
            setSelect={setSelect}
            select={select}
            artistList={artistList}
            address={address}
          />
        ))}
      </div>
    </div>
  );
};

export default UserList;
