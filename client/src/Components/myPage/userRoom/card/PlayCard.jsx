import React, { useState } from "react";
import axios from "axios";
import PlayDetailCard from "./PlayDetailCard";

const PlayCard = ({ id, name, genre, title, ipfs, select, setSelect }) => {
  const [detail, setDetail] = useState([]);

  const ArtistOnclick = (e) => {
    setSelect(e.target.name);
  };

  const DetailOnClick = () => {
    const url = "http://localhost:5000/music/likes/likedetail";
    const response = axios.post(url, { select }).then((res) => {
      console.log(res.data);
      setDetail(res.data);
    });
  };
  return (
    <>
      <div>
        <li>{id}</li>
        <li>
          <button name={ipfs} onClick={ArtistOnclick}>
            {title}
          </button>
        </li>
        <li>{name}</li>
        <li>{genre}</li>
        <button onClick={DetailOnClick}>상세보기</button>
      </div>
      {detail.map((DetailList, index) => (
        <PlayDetailCard
          id={index}
          key={index}
          name={DetailList.artist_name}
          genre={DetailList.Genre}
          title={DetailList.title}
          img={DetailList.img_file}
        />
      ))}
    </>
  );
};

export default PlayCard;
