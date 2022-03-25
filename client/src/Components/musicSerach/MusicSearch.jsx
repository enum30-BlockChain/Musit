import axios from "axios";
import React, { useState, useEffect } from "react";
import Songs from "../songs/Songs";
import MusicCard from "./MusicCard";

function MusicSearch(props) {
  const [songList, setSongList] = useState("");
  const [likeList, setLikeList] = useState("");
  const [userList, setUserList] = useState("");

  const getSongList = async () => {
    await axios
      .get("http://localhost:5000/files")
      .then((res) => {
        setSongList(res.data);
      })
      .catch((err) => alert("노래목록을 불러오지못했습니다.", err));
  };

  const getUser = async ()=>{
    await axios
      .get("http://localhost:5000/users")
      .then((res) => {
        setUserList(res.data);
      })
      .catch((err) => alert("errrrrrrr.", err));
  }

  const getLikeList = async ()=>{
    await axios
      .post("http://localhost:5000/music/likes/like",{address:props.address})
      .then((res) => {
        setLikeList(res.data)
      })
      .catch((err) => alert("errrrrrrr.", err));
  }

  useEffect(() => {
    const init = async () => {
      await getSongList();
      await  getUser();
      await getLikeList()
    };
    init();
  }, [props.address]);
  return (
    <>
      <table style={{ margin: "auto" }}>
        <caption> 우왕 </caption>
        <thead>
          <tr>
            <th>순번 </th>
            <th>타이틀</th>
            <th>작곡가</th>
            <th>img</th>
            <th>auido</th>
            <th>play_count</th>
            <th>like</th>
            <th>genre</th>
            <th>수정</th>
          </tr>
        </thead>
        {songList &&
          songList.map((song, i) => {
            const findLike = song.MusicLikes.find(
              (like) => like.user_address === props.address
            );
            return (
              <MusicCard
                id={i}
                title={song.title}
                artistName={song.artist_name}
                img={song.img_file}
                duration={song.play_time}
                like={song.MusicLikes.length}
                count={song.play_count}
                audio={song.ipfs_hash}
                genre={song.Genre}
                address={props.address}
                artistAddress={song.Artist.user_address}
                checkBox={findLike}
                userList={userList}
              />
            );
          })}
      </table>
      <Songs songList={likeList} address={props.address} userList={userList}/>
    </>
  );
}
export default MusicSearch;
