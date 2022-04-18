import React, { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MusicCard from "./MusicCard";
import { readMusicList } from "../../../redux/actions/musicActions";
import Media from "./media/Media.jsx";
import MusicPlayerSlider from "../serach/MusicPlayerSlider";
import Genre from "./genre/Genre.jsx";
import MediaSkeleton from "./media/MediaSkeleton";
import MainCard from "./main/MainCard";
import Enum30music from "./enummusic/Enummusic";
import "./Music.css";
import ScrollEvent from"./scrollEvent/ScrollEvent"

const Music = () => {
  const [musicmodal, setmusicmodal] = useState("");
  const musicList = useSelector((state) => state.musicList);
  const likeMusic = useSelector((state) => state.likeMusic);
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      await dispatch(readMusicList());
    };
    init();
  }, []);
  return (
    <>
      <Routes>
        <Route path="" element={<MusicMain />} />
        <Route
          path="/genre"
          element={
            likeMusic.loading ? (
              <MediaSkeleton />
            ) : (
              <Genre setmusicmodal={setmusicmodal} />
            )
          }
        />
        <Route path="/enum30music" element={<Enum30music />}></Route>
        <Route
          path="/ranking"
          element={
            musicList.loading ? (
              <MediaSkeleton />
            ) : (
              <Media setmusicmodal={setmusicmodal} />
            )
          }
        />
      </Routes>

      {/* 뮤직플레이어 모달창 */}
      {musicmodal && (
        <MusicPlayerSlider
          sx={{ display: "block" }}
          musicmodal={musicmodal}
          setmusicmodal={setmusicmodal}
        />
      )}
    </>
  );
};

function MusicMain() {
  const musicList = useSelector((state) => state.musicList).data;
  const user = useSelector((state) => state.user);

  const result = [...musicList].sort((a,b)=>a.title < b.title? -1 :a.title>b.title?1:0)
  return (
    <div className="musicmain-wrap">
      <nav
        style={{ top: "60px", width: "85%", margin: "auto", position: "fixed" }}
        className="top-nav"
      >
        <ul className="nav-links">
          <li>
            <Link to="/music/enum30music">
              <i className="uil uil-favorite"></i>
              <span className="link-name"> Enum30 x Music</span>
            </Link>
          </li>
          <li>
            <Link to="/music/ranking">
              <i className="uil uil-favorite"></i>
              <span className="link-name"> Ranking</span>
            </Link>
          </li>
          <li>
            <Link to="/music/genre">
              <i className="uil uil-play"></i>
              <span className="link-name"> Recommend</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div style={{marginTop:"50px"}} className="music-cards-container">
        <ScrollEvent />
        {result.length > 0 &&
          result.map((music, i) => {
            return (
              <>
                {/* <MainCard
                  id={i}
                  key={i}
                  music={music}
                  address={user.address}
                /> */}
                {/* <MusicCard
                id={i}
                key={i}
                music={music}
                address={user.address}
                checkBox={findLike}
              /> */}
              </>
            );
          })}
      </div>
    </div>
  );
}

export default Music;
