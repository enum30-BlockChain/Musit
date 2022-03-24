import React from "react";
import "./Songs.scss";
import { Helmet } from "react-helmet";

export const Songs = () => {
  return (
    <>
      <Helmet>
        <script src=""></script>
      </Helmet>
      <h1>Music Player</h1>

      <div className="music-container play">
        <div className="music-info">
          <h4 id="title">my music</h4>
          <div className="progress-container">
            <div className="progress"></div>
          </div>
        </div>

        <audio src="/" id="audio"></audio>

        <div class="img-container">
          <img
            src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=1260/uploads/users/114/posts/34296/final_image/Final-image.jpg"
            alt="music-cover"
            id="cover"
          />
        </div>
        <div className="navigation">
          <button id="prev" class="action-btn">
            <i className="fas fa-backward"></i>
          </button>
          <button id="play" class="action-btn action-btn-big">
            <i className="fas fa-play"></i>
          </button>
          <button id="next" class="action-btn">
            <i className="fas fa-forward"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default Songs;
