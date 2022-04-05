import axios from "axios";
import React, { useState, useEffect } from "react";
import MusicCard from "./MusicCard.jsx";
import Media from "./Media.jsx";
import {  useSelector } from "react-redux";
import MusicPlayerSlider from "../serach/MusicPlayerSlider";

export const Music = (props) => {
  const [address, setAddress] = useState("");
  const [musicmodal,setmusicmodal] = useState("");
  const musicList = useSelector((state) => state.musicList.musicList)

  useEffect(() => {
    setAddress(props.address);
  }, [props]);
  return (
    <>
      <Media setmusicmodal={setmusicmodal}/>
      {musicmodal && <MusicPlayerSlider  sx={{ display: 'block' }}address={props.address} musicmodal={musicmodal} setmusicmodal={setmusicmodal} />}
       
       
        {/* {musicList &&
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
                  address={address}
                  checkBox={findLike}
                />
              </>
            );
          })} */}
      
    </>
  );
};
