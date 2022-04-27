import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { readOnAuctionNFTList } from '../../../redux/actions/contractActions';
import Nothing from '../../landingpage/pages/Nothing';
import AuctionCard from './cards/AuctionCard';
import CardSkeleton from './cards/CardSkeleton';


const Auction = () => {
	const [loading, setLoading] = useState(false);

  const auction = useSelector((state) => state.auction.data);
  const dispatch = useDispatch();

  useEffect(async () => {
    setLoading(true)
    await dispatch(readOnAuctionNFTList());
    setLoading(false)
  }, []);

  if (loading) return (
		<>
			<CardSkeleton />
		</>
	)
  return (
		<section className="auction-box">
			{auction.length > 0 ? (
				auction.map((nft, index) => (
					<AuctionCard data={nft} key={`auction-${nft.itemId}-${index}`} />
				))
			) : (
				<Nothing />
			)}
		</section>
	);
};

export default Auction