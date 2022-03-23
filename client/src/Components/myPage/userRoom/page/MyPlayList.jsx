import React, { useEffect, useState } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

const MyPlayList = () => {
  const [likesong, setLikesong] = useState("");
  const [select, setSelect] = useState("");
  const [address] = useOutletContext();

  useEffect(() => {
    const url = "http://localhost:5000/music/likes/like";
    const response = axios.post(url, { address }).then((res) => {
      setLikesong(res.data);
    });
  }, []);
  console.log(likesong);
  const LikeOnClick = () => {
    const url = "http://localhost:5000/music/likes/likesong";
    const response = axios.post(url, { likesong }).then((res) => {});
  };
  return (
    <>
      <div>
        <button onClick={LikeOnClick}>MyPlayList</button>
      </div>
    </>
  );
};

export default MyPlayList;
