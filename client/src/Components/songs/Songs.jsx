import React, { component } from "react";
import "./Songs.scss";
import bts from "./music/bts.mp3";
// import { Helmet } from "react-helmet";

export const Songs = () => {
  let musicContainer,
    playBtn,
    prevBtn,
    nextBtn,
    audio,
    progress,
    progressContainer,
    title,
    cover,
    currTime,
    durTime;

  React.useEffect(() => {
    musicContainer = document.querySelector(".music-container");
    playBtn = document.querySelector("#play");
    prevBtn = document.querySelector("#prev");
    nextBtn = document.querySelector("#next");

    audio = document.querySelector("#audio");
    progress = document.getElementById("progress");
    progressContainer = document.getElementById("progress-container");
    title = document.getElementById("title");
    cover = document.getElementById("cover");
    currTime = document.querySelector("#currTime");
    durTime = document.querySelector("#durTime");
  });
  function playOnClikc() {
    musicContainer.classList.add("play");
    playBtn.querySelector("i.fas").classList.remove("fa-play");
    playBtn.querySelector("i.fas").classList.add("fa-pause");

    console.log(1);
  }

  return (
    <>
      {/* <Helmet>
        <title>My Title</title>
        <meta name="description" content="Helmet application" />
      </Helmet> */}
      <h1>Music Player</h1>

      <div className="music-container">
        <div className="music-info">
          <h4 id="title">my music</h4>
          <div className="progress-container">
            <div className="progress"></div>
          </div>
        </div>

        <audio src={bts} controls />

        <div className="img-container">
          <img
            src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=1260/uploads/users/114/posts/34296/final_image/Final-image.jpg"
            alt="music-cover"
            id="cover"
          />
        </div>
        <div className="navigation">
          <button id="prev" className="action-btn">
            <i className="fas fa-backward"></i>
          </button>
          <button
            id="play"
            className="action-btn action-btn-big"
            onClick={playOnClikc}
          >
            <i className="fas fa-play"></i>
          </button>
          <button id="next" className="action-btn">
            <i className="fas fa-forward"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default Songs;
