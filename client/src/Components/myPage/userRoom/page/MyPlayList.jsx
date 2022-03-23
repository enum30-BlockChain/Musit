import React, { useEffect, useState } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import "./MyPlayList.css";
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
      <div>
        <button onClick={SelectOnclick}>MyPlayList</button>
        {likesong.map((Song, index) => {
          return (
            <>
              <div className="my-playlist">
                <div>
                  <p>{Song.title}</p>
                </div>
                <div>
                  <p>{Song.artist_name}</p>
                </div>
                <div>
                  <p>{Song.Genre}</p>
                </div>
                <div>
                  <img src={Song.img_file} style={{ width: "100px" }} />
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default MyPlayList;
