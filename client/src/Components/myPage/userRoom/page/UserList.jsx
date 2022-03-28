import React, { useEffect, useState } from "react";
import axios from "axios";
import ArtistCard from "../card/ArtistCard";
import SongCard from "../card/SongCard";
import LikeCard from "../card/LikeCard";
import { useOutletContext } from "react-router-dom";

const UserList = () => {
  const [artistList, setAtistList] = useState([]);
  const [song, setSong] = useState([]);
  const [select, setSelect] = useState("");
  const [likelist, setLikelist] = useState([""]);
  const [address] = useOutletContext();

  //아티스트조회 함수 이벤트 핸들러
  const LoginOnClick = async () => {
    const url = "http://localhost:5000/artists/list";
    const response = await axios.get(url);
    setAtistList(response.data);
  };

  //내가 좋아하는 아티스트를 불러오는 핸들러
  const LikeListOnClick = () => {
    const url = "http://localhost:5000/artists/likes/list";
    const response = axios.post(url, { address }).then((res) => {
      setLikelist(res.data);
    });
  };

  //내가 좋아하는 아티스트를 눌렀을때 개수를 올려주는 함수
  return (
    <div>
      <div>
        {song.map((music, index) => (
          <SongCard id={index} key={index} name={music} />
        ))}
      </div>
      <div>
        {likelist.map((LikeList, index) => (
          <LikeCard
            id={index}
            key={index}
            name={LikeList.artist_artist_name}
            likes={LikeList.likes}
            address={address}
          />
        ))}
      </div>
      <button onClick={LikeListOnClick}>ArtistLikeList</button>

      <button onClick={LoginOnClick}>ArtistList</button>
      <div>
        Artist List
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
