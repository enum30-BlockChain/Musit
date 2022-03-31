import axios from "axios";
import React, { useState, useEffect } from "react";
import MusicCard from "./MusicCard.jsx";
// recent played/ my favorit / ranking  list

export const Music = (props) => {
  const [songList, setSongList] = useState("");
  const [likeList, setLikeList] = useState("");
  const [userList, setUserList] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    setSongList(props.songList);
    setLikeList(props.likeList);
    setUserList(props.userList);
    setAddress(props.address);
  }, [props]);
  return (
    <>
      
        {songList &&
          songList.map((song, i) => {
            const findLike = song.MusicLikes.find(
              (like) => like.user_address === address
            );
            return (
              <>
                <MusicCard
                  id={i}
                  key={i}
                  title={song.title}
                  artistName={song.artist_name}
                  img={song.img_file}
                  duration={song.play_time}
                  like={song.MusicLikes.length}
                  count={song.play_count}
                  audio={song.ipfs_hash}
                  genre={song.Genre}
                  address={address}
                  artistAddress={song.Artist.user_address}
                  checkBox={findLike}
                  userList={userList}
                />
              </>
            );
          })}
      
    </>
  );
};
