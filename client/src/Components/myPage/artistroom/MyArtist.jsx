import React, { useEffect, useState } from "react";
import axios from "axios";

const MyArtist = ({ address }) => {
  const [nickname, setNickname] = useState("");
  const [totallike, setTotalLike] = useState("");
  const [music, setMusic] = useState("");
  const [song, setSong] = useState();

  //내가 바꾸고 싶은 닉네임 선택
  const [select, setSelect] = useState("");

  //내가 최근 재생했던 목록 선택
  const [search, setSearch] = useState("");

  //and 연산자를 사용하기위한 useState input을 숨기기위한 조건문
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const init = async () => {
      const url = "http://localhost:5000/artists/signin";
      const response = await axios.post(url, { address });
      setNickname(response.data.artist_name);
    };
    init();
    return () => {};
  }, [address]);

  const IdOnChange = (e) => {
    setSelect(e.target.value);
    console.log(e.target.value);
  };

  const NickNameOnClick = () => {
    const url = "http://localhost:5000/artists/change";
    const response = axios.post(url, { address, select }).then((res) => {
      console.log(res.data);
    });
  };

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

  const RecentedOnClick = () => {
    const url = "http://localhost:5000/artists/played";
    const response = axios.post(url, { address }).then((res) => {
      setSong(res.data);
    });
  };

  return (
    <>
      <div>나의 주소는 : {address}</div>
      <div>
        나의 닉네임 : {nickname}
        {/* 버튼 클릭 클릭시 setVisible로 state 변경*/}
        <button
          onClick={() => {
            NickNameOnClick();
            setVisible(!visible);
          }}
        >
          {/* visible 취소나 닉네임에 따라 true false */}
          {visible ? "변경완료" : "닉네임변경"}
        </button>
        {visible && (
          <div>
            <input type="text" onChange={IdOnChange}></input>
          </div>
        )}
      </div>
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
      <div>
        <button onClick={RecentedOnClick}>최근 재생목록</button>
      </div>
      <div>My favorite</div>
      <div>나의 재생목록</div>
    </>
  );
};

export default MyArtist;
