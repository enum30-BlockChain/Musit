import React, { useEffect, useState } from "react";
import axios from "axios";

const MyArtist = ({ address }) => {
  const [nickname, setNickname] = useState("");
  const [totallike, setTotalLike] = useState("");
  const [music, setMusic] = useState("");

  useEffect(() => {
    const init = async () => {
      const url = "http://localhost:5000/artists/signin";
      const response = await axios.post(url, { address });
      setNickname(response.data.artist_name);
    };
    init();
    return () => {};
  }, [address]);

  const TotalLikeOnClick = () => {
    const url = "http://localhost:5000/artists/like";
    const response = axios.post(url, { address }).then((res) => {
      console.log(res.data);
      setTotalLike(res.data);
    });
  };

  const SearchMusicOnClick = () => {
    const url = "http://localhost:5000/artists/music";
    const response = axios.post(url, { address, nickname }).then((res) => {
      setMusic(res.data);
    });
  };
  console.log(music);
  return (
    <>
      <div>나의 주소는 : {address}</div>
      <div>나의 닉네임 : {nickname}</div>
      <div>
        <button onClick={TotalLikeOnClick}>총 좋아요</button>
        <div>{totallike.length}</div>
      </div>
      <div>
        <button onClick={SearchMusicOnClick}>등록한음원조회</button>
      </div>
      <div>가수이름 : {music.artist_name}</div>
      <div>음악제목 : {music.title}</div>
      <div>플레이 수 : {music.play_count}</div>
      <div>음악 총 길이 : {music.play_time}</div>

      <div>곡별 재생시간</div>
      <div>총 재생시간</div>
      <div>청취 곡수</div>
      <div>Recently played</div>
      <div>My favorite</div>
      <div>나의 재생목록</div>
    </>
  );
};

export default MyArtist;
