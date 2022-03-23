import React, { useEffect, useState } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

const MyPlayList = () => {
  const [address, ,] = useOutletContext();
  const [likesong, setLikesong] = useState("");

  useEffect(() => {
    const url = "http://localhost:5000/artists/list";
    const response = axios.get(url);
    console.log(response.data);
    // setLikesong(response.data);
  }, []);

  return <div>MyPlayList</div>;
};

export default MyPlayList;
