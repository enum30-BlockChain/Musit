import axios from "axios";
import React, { useState, useEffect } from "react";
import MusicCard from "./MusicCard.jsx";
// recent played/ my favorit / ranking  list
import {  useSelector } from "react-redux";

export const Music = (props) => {
  const [address, setAddress] = useState("");
  
  const musicList = useSelector((state) => state.musicList.musicList)

  useEffect(() => {
    setAddress(props.address);
  }, [props]);
  return (
    <>
      
        {musicList &&
          musicList.map((music, i) => {
            const findLike = music.MusicLikes.find(
              (like) => like.user_address === address
            );
            return (
              <>
                <MusicCard
                  id={i}
                  key={i}
                  music={music}
                  title={music.title}
                  artist_name={music.artist_name}
                  img_file={music.img_file}
                  MusicLikes={music.MusicLikes.length}
                  play_count={music.play_count}
                  ipfs_hash={music.ipfs_hash}
                  Genre={music.Genre}
                  address={address}
                  artistAddress={music.Artist.user_address}
                  checkBox={findLike}
                />
              </>
            );
          })}
      
    </>
  );
};
