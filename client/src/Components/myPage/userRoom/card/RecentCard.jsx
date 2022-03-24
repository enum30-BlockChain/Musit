import React, { useState } from "react";
import axios from "axios";

const RecentCard = ({ song, address }) => {
  const [search, setSearch] = useState("");

  const SearchOnClick = async () => {
    console.log(song);
    const url = "http://localhost:5000/files/myplay";
    const content = { song, address };
    const response = await axios
      .post(url, content)
      .then((res) => {
        console.log(res.data);
        setSearch(res.data);
      })
      .catch((err) => alert("노래목록을 불러오지못했습니다.", err));
  };

  return (
    <>
      <button onClick={SearchOnClick}>내곡보기</button>

      <div>
        <p>title: {search.title}</p>
        <p>Genre: {search.Genre}</p>
        <p>play_count: {search.play_count}</p>
        <p>play_time: {search.play_time}</p>
        <img src={search.img_file} style={{ width: "100px" }} />
      </div>
    </>
  );
};

export default RecentCard;
