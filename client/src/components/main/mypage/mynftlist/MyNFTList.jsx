import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { readMyNFTList } from "../../../../redux/actions/musitNFTActions";
import "./MyNFTList.css";
import NFTCard from "./nftcard/NFTCard";
import NFTCardSkeleton from "./nftcard/NFTCardSkeleton";

export default function MyNFTList() {
  const musitNFT = useSelector((state) => state.musitNFT);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    loadMyNFTs();
  }, [user.loading]);

  async function loadMyNFTs() {
    if (!user.loading && !user.error) {
      await dispatch(readMyNFTList());
    }
  }

  return (
    <>
      <div className="mynftlist">
        <div className="item-card-container">
          {musitNFT.loading ? (
            <>
              <NFTCardSkeleton />
              <NFTCardSkeleton />
              <NFTCardSkeleton />
              <NFTCardSkeleton />
              <NFTCardSkeleton />
              <NFTCardSkeleton />
            </>
          ) : (
            <>
              {musitNFT.myNFTList !== null &&
                musitNFT.myNFTList.map((data, index) => (
                  <NFTCard data={data} key={index} />
                ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
