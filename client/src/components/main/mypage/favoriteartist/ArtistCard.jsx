import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LikeCardSkeleton from "./LikeCardSkeleton";
import ArtistModel from "./ArtistModel";
import LikeCard from "./newCard/LikeCard";
import "./css/FavoriteAritst.css";

export default function ArtistCard() {
  const [artistModal, setArtistModal] = useState("");
  const likeArtist = useSelector((state) => state.likeArtist);
  const likeArtistDetail = useSelector((state) => state.likeArtistDetail);

  return (
    <>
      <div className="likecard">
        <div
          className="item-card-container"
          style={{ justifyContent: "center" }}
        >
          {likeArtist.loading
            ? [1, 2, 3, 4].map((like, i) => {
                return <LikeCardSkeleton key={i} like={like} />;
              })
            : likeArtist.data !== null &&
              likeArtist.data.map((data, index) => {
                return (
                  <LikeCard
                    data={data}
                    key={index}
                    setArtistModal={setArtistModal}
                    artistModal={artistModal}
                  />
                );
              })}
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
