import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { readOnMarketNFTList } from '../../../redux/actions/contractActions';
import Nothing from '../../landingpage/pages/Nothing';
import CardSkeleton from './cards/CardSkeleton';
import SellCard from './cards/SellCard';

const Ordinary = () => {
	const [loading, setLoading] = useState(true);

  const market = useSelector((state) => state.market.data);
  const dispatch = useDispatch();
  
  useEffect(async () => {
    await dispatch(readOnMarketNFTList());
    setLoading(false)
  }, []);

  if (loading) return (
		<>
			<CardSkeleton />
		</>
	)
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