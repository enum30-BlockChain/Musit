import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import "./css/TotalPlayList.css";

const TotalPlayList = () => {
  const [address] = useOutletContext();
  const [songList, setSongList] = useState([]);

  useEffect(() => {
    console.log(address);
  }, []);

  const getSongOnclick = async () => {
    const url = "http://localhost:5000/files";
    const response = await axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setSongList(res.data);
      })
      .catch((err) => alert("노래목록을 불러오지못했습니다.", err));
  };
  console.log(songList);

  return (
    <>
      <div>
        <button onClick={getSongOnclick}>조회하기</button>
        <p>지갑주소 : {address}</p>
        {songList.map((List, index) => {
          return (
            <>
              <div className="count-card">
                <p>{index}</p>
                <p>title : {List.title}</p>
                <p>Total Play Time : {List.play_time}</p>
                <p>Total Play Count : {List.play_count}</p>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default TotalPlayList;
