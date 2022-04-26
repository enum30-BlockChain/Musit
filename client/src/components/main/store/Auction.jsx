import React from 'react'
import { useSelector } from 'react-redux';
import Nothing from '../../landingpage/pages/Nothing';
import AuctionCard from './nftcard/AuctionCard';

const Auction = () => {
  const auction = useSelector((state) => state.auction.data);

  return (
    <section className="auction-box">
      {auction.length > 0 &&
        auction.map((nft, index) => (
          <AuctionCard data={nft} key={`auction-${nft.itemId}-${index}`} />
        ))}
      {auction.length == 0 && <><Nothing /></>}
    </section>
  );
};

export default Auction