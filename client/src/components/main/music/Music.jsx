import React, { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MusicCard from "./MusicCard";
// import MusicCard from "./MusicCard.jsx";
// import Media from "./media/Media.jsx";
// import MusicPlayerSlider from "../serach/MusicPlayerSlider";
// import Genre from "./genre/Genre.jsx";

export const Music = () => {
  const [musicmodal, setmusicmodal] = useState("");
  const musicList = useSelector((state) => state.musicList).data;
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const init = async () => {
      await dispatch(readMusicList());
    };
    init();
  }, [])
  return (
    <>
      {/* <Routes>
        <Route
          path="/genre"
          element={<Genre setmusicmodal={setmusicmodal} />}
        />
        <Route
          path="/ranking"
          element={<Media setmusicmodal={setmusicmodal} />}
        />
      </Routes> */}

      {/* {musicmodal && (
        <MusicPlayerSlider
          sx={{ display: "block" }}
          address={props.address}
          musicmodal={musicmodal}
          setmusicmodal={setmusicmodal}
        />
      )} */}

      {musicList.length > 0 &&
        musicList.map((music, i) => {
          const findLike = music.MusicLikes.find(
            (like) => like.user_address === user.address
          );
          return (
            <>
              <MusicCard
                id={i}
                key={i}
                music={music}
                address={user.address}
                checkBox={findLike}
              />
            </>
          );
        })}
    </>
  );
};
