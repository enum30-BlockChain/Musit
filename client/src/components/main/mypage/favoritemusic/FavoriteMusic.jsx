import React, { useState } from "react";
import { useSelector } from "react-redux";
import SongCardSkeleton from "../../serach/music/SongCardSkeleton";
import MusicCard from "./MusicCard";
import "../favoritemusic/css/FavoriteMusic.css";
import ArtistModel from "./ArtistModel";

const FavoriteMusic = () => {
  const [artistModal, setArtistModal] = useState("");
  const [musicmodal, setmusicmodal] = useState("");

  const likeMusic = useSelector((state) => state.likeMusic).data;

  return (
    <>
      <div className="musiccard">
        <div className="item-card-container">
          {likeMusic.loading ? (
            <>
              <SongCardSkeleton />
              <SongCardSkeleton />
              <SongCardSkeleton />
              <SongCardSkeleton />
              <SongCardSkeleton />
              <SongCardSkeleton />
            </>
          ) : (
            <>
              {likeMusic !== null &&
                likeMusic.map((data, index) => (
                  <MusicCard
                    data={data}
                    setmusicmodal={setmusicmodal}
                    key={index}
                  />
                ))}
            </>
          )}
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
