import React, { useEffect, useState } from 'react'
import Ethers from '../../../../web3/Ethers';
import Nothing from '../../../landingpage/pages/Nothing';
import CardSkeleton from '../cards/CardSkeleton';
import MyBidsCard from '../cards/MyBidsCard';

const fakeFetch = (delay = 500) =>
  new Promise((res) => setTimeout(res, delay));

const MyBids = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(async () => {
    setData(await Ethers.getMyBids())
    await fakeFetch()
    setLoading(false)
  }, []);
  if (loading) return <CardSkeleton />;
	else
		return (
			<section className="mybids-box">
			{data.length > 0 ? (
				data.map((nft, index) => (
					<MyBidsCard data={nft} key={`mybids-${nft.itemId}-${index}`} />
				))
			) : (
				<Nothing />
			)}
		</section>
		);
};

export default MyBids