import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { readMyNFTList } from "../../../../redux/actions/contractActions";
import "./MyNFTList.css";
import NFTCard from "./nftcard/NFTCard";
import NFTCardSkeleton from "./nftcard/NFTCardSkeleton";

export default function MyNFTList() {
  const ownedMusitNFTList = useSelector((state) => state.ownedMusitNFT);
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
          {ownedMusitNFTList.loading ? (
            <>
              <NFTCardSkeleton />
            </>
          ) : (
            <>
              {ownedMusitNFTList.data !== null &&
                ownedMusitNFTList.data.map((data, index) => (
                  <NFTCard data={data} key={index} />
                ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
