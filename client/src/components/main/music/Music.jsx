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
                  artist_name={song.artist_name}
                  img_file={song.img_file}
                  MusicLikes={song.MusicLikes.length}
                  play_count={song.play_count}
                  ipfs_hash={song.ipfs_hash}
                  Genre={song.Genre}
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
