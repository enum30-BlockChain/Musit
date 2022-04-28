import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import Ethers from "../../../../../web3/Ethers";
import "./Contentbox.css";

export const Contentbox = () => {
  const [auctionIncome, setAuctionIncome] = useState(0);
  const [marketplaceIncome, setMarketplaceIncome] = useState(0);
  const artist = useSelector((state) => state.artist);
  let totalMusicLikes = 0;
  let totalMusicPlayTime = 0;
  artist.Music.forEach((music) => (totalMusicLikes += music.MusicLikes.length));
  artist.Music.forEach((music) => {
    totalMusicPlayTime += music.play_count * music.play_time;
  });

  useEffect(async () => {
    setAuctionIncome(await Ethers.getAuctionIncome())
    setMarketplaceIncome(await Ethers.getMarketplaceIncome())
  }, []);

  return (
    <div className="contentbox">
      <div className="boxes">
        <div className="box box1">
          <i className="uil uil-thumbs-up"></i>
          <span className="text">Total Music Likes</span>
          <span className="number">{totalMusicLikes && totalMusicLikes}</span>
        </div>
        <div className="box box1">
          <i className="uil uil-heart"></i>
          <span className="text">Total Artist Likes</span>
          <span className="number">{artist && artist.ArtistLikes.length}</span>
        </div>
      </div>

      <div className="boxes">
        <div className="box box1">
          <i className="uil uil-hourglass"></i>
          <span className="text">Total Music Played Time</span>
          {totalMusicPlayTime === 0 ? (
            <span className="number">0</span>
          ) : (
            <span className="number">
              {Math.floor(totalMusicPlayTime / 60 / 60)}h{" "}
              {Math.floor((totalMusicPlayTime / 60) % 60)}m{" "}
              {totalMusicPlayTime % 60}s
            </span>
          )}
        </div>
        <div className="box box1">
          <i className="uil uil-file-upload"></i>
          <span className="text">Music Upload count</span>
          <span className="number">{artist && artist.Music.length}</span>
        </div>
      </div>
      <div className="boxes">
        <div className="box box1">
          <i className="uil uil-bill"></i>
          <span className="text"> Marketplace Income</span>
          <span className="number">{marketplaceIncome} ETH</span>
        </div>
        <div className="box box1">
          <i className="uil uil-arrow-growth"></i>
          <span className="text"> Auction Income</span>
          <span className="number">{auctionIncome} ETH</span>
        </div>
      </div>
    </div>
  );
};
