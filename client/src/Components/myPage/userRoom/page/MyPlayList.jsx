import React, { useEffect, useState } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import "./MyPlayList.css";
import PlayCard from "../card/PlayCard";
const MyPlayList = () => {
  const [likesong, setLikesong] = useState([]);
  const [select, setSelect] = useState([]);
  const [address] = useOutletContext();

  const SelectOnclick = () => {
    const url = "http://localhost:5000/music/likes/like";
    const response = axios.post(url, { address }).then((res) => {
      console.log(res.data);
      setLikesong(res.data);
    });
  };

  return (
    <>
      <button onClick={SelectOnclick}>MyPlayList</button>
      <div className="my-playlist">
        <div>
          <li>순번</li>
          <li>제목</li>
          <li>가수명</li>
          <li>장르명</li>
        </div>
        {likesong.map((Song, index) => (
          <PlayCard
            id={index}
            key={index}
            name={Song.artist_name}
            genre={Song.Genre}
            title={Song.title}
            ipfs={Song.ipfs_hash}
            setSelect={setSelect}
            select={select}
          />
        ))}
      </div>
    </>
  );
};

export default MyPlayList;
