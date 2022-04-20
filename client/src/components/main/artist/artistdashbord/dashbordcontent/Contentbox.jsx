import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Contentbox.css";

export const Contentbox = () => {
  const artist = useSelector((state) => state.artist);
  let totalMusicLikes = 0
  let totalMusicPlayTime = 0
  artist.Music.forEach(music=> totalMusicLikes += music.MusicLikes.length);
  artist.Music.forEach((music)=> {  totalMusicPlayTime += music.play_count * music.play_time  });
  console.log(artist)
  return (
    <div className="contentbox">
      <div className="boxes">
        <div className="box box1">
          {/* 아티스트가 받은 음악 좋아요 갯수 */}
          <i className="uil uil-thumbs-up"></i>
          <span className="text">Total Music Likes</span>
          <span className="number">{totalMusicLikes && totalMusicLikes}</span>
        </div>
        <div className="box box1">
          {/* 아티스트가 받은 좋아요 갯수 */}
          <i className="uil uil-heart"></i>
          <span className="text">Total Artist Likes</span>
          <span className="number">{artist && artist.ArtistLikes.length}</span>
        </div>
        <div className="box box1">
          {/* 아티스트 수입  */}
          <i className="uil uil-bill"></i>
          <span className="text">Income</span>
          <span className="number">3023</span>
        </div>
      </div>
      <div className="boxes">
        <div className="box box1">
          {/* 음악 재생한 시간  */}
          <i className="uil uil-hourglass"></i>
          <span className="text">Total Music Played Time</span>
          {totalMusicPlayTime===0
          ?<span className="number">0</span>
          :<span className="number">{Math.floor(totalMusicPlayTime/ 60/60)}h {Math.floor(totalMusicPlayTime/60 % 60)}m {totalMusicPlayTime % 60}s</span>}
        </div>
        <div className="box box1">
          {/* 내가  재생한 ㅇ */}
          <i className="uil uil-headphones-alt"></i>
          <span className="text">Total Music Likes</span>
          <span className="number">10</span>
        </div>
        <div className="box box1">
          {/* 내가 업로드한 파일 갯수 */}
          <i className="uil uil-file-upload"></i>
          <span className="text">Music Upload count</span>
          <span className="number">{artist && artist.Music.length}</span>
        </div>
      </div>
    </div>
  );
};
