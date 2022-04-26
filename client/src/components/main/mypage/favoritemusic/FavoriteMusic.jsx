import React, { useState } from "react";
import { useSelector } from "react-redux";
import LikeCardSkeleton from "./LikeCardSkeleton";
import MusicCard from "./MusicCard";
import "../favoritemusic/css/FavoriteMusic.css";
import ArtistModel from "./ArtistModel";

const FavoriteMusic = () => {
  const [artistModal, setArtistModal] = useState("");
  const [musicmodal, setmusicmodal] = useState("");

  const likeMusic = useSelector((state) => state.likeMusic);

  return (
    <>
      <div className="musiccard" style={{ overflow: "hidden" }}>
        <div
          className="item-card-container"
          style={{ overflow: "auto", maxHeight: "700px" }}
        >
          {likeMusic.loading
            ? [1, 2, 3, 4, 5, 6, 7, 8].map((like, i) => {
                return (
                  <LikeCardSkeleton
                    key={i}
                    like={like}
                    setmusicmodal={setmusicmodal}
                  />
                );
              })
            : likeMusic.data !== null &&
              likeMusic.data.map((data, index) => {
                return (
                  <MusicCard
                    data={data}
                    setmusicmodal={setmusicmodal}
                    key={index}
                  />
                );
              })}
        </div>
      </div>
      {musicmodal && (
        <ArtistModel
          sx={{ display: "block" }}
          musicmodal={musicmodal}
          setmusicmodal={setmusicmodal}
        />
      )}
    </>
  );
};

export default FavoriteMusic;
