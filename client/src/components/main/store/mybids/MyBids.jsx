import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Ethers from '../../../../web3/Ethers';
import Nothing from '../../../landingpage/pages/Nothing';
import SimpleBackdrop from '../../../SimpleBackdrop';
import MyBidsCard from '../cards/MyBidsCard';

const fakeFetch = (delay = 500) =>
  new Promise((res) => setTimeout(res, delay));

const MyBids = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(async () => {
    setData(await Ethers.getMyBids())
		console.log(await Ethers.getMyBids());
    await fakeFetch()
    setLoading(false)
  }, []);
  if (loading) return <SimpleBackdrop />;
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