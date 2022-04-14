import React, { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MusicCard from "./MusicCard";
import { readMusicList } from "../../../redux/actions/musicActions";
import Media from "./media/Media.jsx";
import MusicPlayerSlider from "../serach/MusicPlayerSlider";
import Genre from "./genre/Genre.jsx";
import MediaSkeleton from "./media/MediaSkeleton";

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
        <Route
          path=""
          element={<MusicMain />}
        />
        <Route
          path="/genre"
          element={
             likeMusic.loading
            ? <MediaSkeleton />
            : <Genre setmusicmodal={setmusicmodal} />
        }
        />
        <Route
          path="/ranking"
          element={
            musicList.loading
            ?<MediaSkeleton />
            :<Media setmusicmodal={setmusicmodal} />
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


 function 
 MusicMain() {
  const musicList = useSelector((state) => state.musicList).data;
  const user = useSelector((state) => state.user);
  return (
    <div>
      <nav className="user-nav">
        <ul className="nav-links">
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
    </div>
  );
}


export default Music;