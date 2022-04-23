import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ArtistCardSkeleton from "../../serach/artist/ArtistCardSkeleton";
import "./css/FavoriteAritst.css";
import LikeCard from "./newCard/LikeCard";
import AlbumModel from "./AlbumModel";
import MusicPlayerSlider from "./MusicPlayerSlider";

export default function ArtistCard() {
  const [artistModal, setArtistModal] = useState("");
  const [musicmodal, setmusicmodal] = useState("");

  const likeArtist = useSelector((state) => state.likeArtist).data;

  return (
    <>
      <div className="likecard">
        <div className="item-card-container">
          {likeArtist.loading ? (
            <>
              <ArtistCardSkeleton />
              <ArtistCardSkeleton />
              <ArtistCardSkeleton />
              <ArtistCardSkeleton />
              <ArtistCardSkeleton />
              <ArtistCardSkeleton />
            </>
          ) : (
            <>
              {likeArtist !== null &&
                likeArtist.map((data, index) => (
                  <LikeCard
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
        <AlbumModel
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
}
