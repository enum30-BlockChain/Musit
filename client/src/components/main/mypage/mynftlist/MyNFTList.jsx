import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { readMyNFTList } from "../../../../redux/actions/musitNFTActions";
import Ethers from "../../../../web3/Ethers";
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

  async function mintingOnClick() {
    const result = await Ethers.minting(
      "https://gateway.pinata.cloud/ipfs/QmZiFY6mvGyDvBqxHojHmiU1r8HCdh7QHZeEvYTpsWzqYT"
    );

    if (result.confirmations) loadMyNFTs();
  }

  return (
    <>
      <h1>My NFT LIST</h1>
      <div className="mynftlist">
        {/* <button onClick={mintingOnClick}> Minting </button> */}
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
