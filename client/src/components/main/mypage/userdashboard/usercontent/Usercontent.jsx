import React from "react";
import { useSelector } from "react-redux";
const Usercontent = () => {
  const likeMusic = useSelector((state) => state.likeMusic.data);
  const likeArtist = useSelector((state) => state.likeArtist.data);

  return (
    <>
      <div className="contentbox">
        <div className="boxes">
          <div className="box box1">
            <i className="uil uil-thumbs-up"></i>
            <span className="text">Total Music Likes</span>
            <span className="number">{likeMusic && likeMusic.length}</span>
          </div>
          <div className="box box1">
            <i className="uil uil-heart"></i>
            <span className="text">Total Artist Likes</span>
            <span className="number">{likeArtist && likeArtist.length}</span>
          </div>
        </div>

        <div className="boxes">
          <div className="box box1">
            <i className="uil uil-bill"></i>
            <span className="text">Income</span>
            <span className="number">3023</span>
          </div>
          <div className="box box1">
            <i className="uil uil-hourglass"></i>
            <span className="text">Total Music Played Time</span>
            <span className="number">10</span>
          </div>
        </div>

        <div className="boxes">
          <div className="box box1">
            <i className="uil uil-headphones-alt"></i>
            <span className="text">Total Music Likes</span>
            <span className="number">10</span>
          </div>
          <div className="box box1">
            <i className="uil uil-file-upload"></i>
            <span className="text">Music Upload count</span>
            <span className="number">1</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Usercontent;
