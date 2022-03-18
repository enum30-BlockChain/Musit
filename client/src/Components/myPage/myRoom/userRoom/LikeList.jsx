import React, { useState } from "react";
import axios from "axios";

const LikeList = ({ address }) => {
  const [atistList, setAtistList] = useState("");

  console.log(address);

  const LoginOnClick = async () => {
    const url = "http://localhost:5000/artists/likeList";
    const response = await axios.post(url, { address });
    console.log(response.data);
    setAtistList({ atistList: response.data.artist_name });
  };
  return (
    <div>
      <button onClick={LoginOnClick}>LikeList</button>
      <div>Song List : </div>
      <div>Artist List : {atistList.atistList}</div>
    </div>
  );
};

export default LikeList;
