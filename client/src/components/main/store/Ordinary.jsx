import React from 'react'
import { useSelector } from 'react-redux';
import Nothing from '../../landingpage/pages/Nothing';
import SellCard from './nftcard/SellCard';

const Ordinary = () => {
  const market = useSelector((state) => state.market.data);
  return (
    <section className="ordinary-box">
      {market.length > 0 &&
        market.map((nft, index) => (
          <SellCard data={nft} key={`sell-${nft.itemId}-${index}`} />
        ))}
      {market.length == 0 && <><Nothing /></>}
    </section>
  );
};


export default Ordinary