import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ArtistCardSkeleton from "../../serach/artist/ArtistCardSkeleton";
import ArtistModel from "./ArtistModel";
import "./css/FavoriteAritst.css";
import LikeCard from "./newCard/LikeCard";

export default function ArtistCard() {
  const [artistModal, setArtistModal] = useState("");
  const [musicmodal, setmusicmodal] = useState("");
  const likeArtist = useSelector((state) => state.likeArtist).data;
  const likeArtistDetail = useSelector((state) => state.likeArtistDetail);

  return (
    <>
      <div className="likecard">
        <div
          className="item-card-container"
          style={{ justifyContent: "center" }}
        >
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
                    key={index}
                    setArtistModal={setArtistModal}
                    artistModal={artistModal}
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
          likeArtistDetail={likeArtistDetail}
          setArtistModal={setArtistModal}
        />
      )}
    </>
  );
}
