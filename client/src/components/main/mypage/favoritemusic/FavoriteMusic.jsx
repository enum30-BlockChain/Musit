import React, { useState } from "react";
import { useSelector } from "react-redux";
import SongCardSkeleton from "../../serach/music/SongCardSkeleton";
import ArtistModel from "./ArtistModel";
import MusicCard from "./MusicCard";
import MusicPlayerSlider from "./MusicPlayerSlider";
import "../favoritemusic/css/FavoriteMusic.css";

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
                    setArtistModal={setArtistModal}
                    key={index}
                  />
                ))}
            </>
          )}
        </div>
      </div>

      {artistModal && (
        <ArtistModel
          sx={{ display: "block" }}
          artistModal={artistModal}
          setArtistModal={setArtistModal}
          musicmodal={musicmodal}
          setmusicmodal={setmusicmodal}
        />
      )}

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

export default FavoriteMusic;
