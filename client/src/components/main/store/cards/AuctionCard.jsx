import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { selectedMusitNFT } from '../../../../redux/actions/contractActions';
import "./AuctionCard.css";

const AuctionCard = ({data}) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const cardOnClick = async () => {
		navigate(`/bid/${data.itemId}`);
		await dispatch(selectedMusitNFT(data))
	}
	
	const isEnd = () => {
		const distance = data.endAt * 1000 - Date.now()
		return !(distance > 0)
	}

	useEffect(() => {
		
	}, []);
	
  return (
		<>
			<div className="item-card" onClick={cardOnClick}>
				<div className="img-box">
					<img src={data.img_file} />
				</div>
				<div className="content-wrap">
					<div className={`color-box ${isEnd() && "end"}`}>
						{isEnd() && <div className='end-mark'>End</div>}
					</div>
					<div className="info-wrap">
						<div className="first-box">
						<div className="price-box">
								<h2>Top Bid</h2>
								<h1>{data.topBid} ETH</h1>
							</div>
							<div className="tokenid-box">
								<h2>Token Id</h2>
								<h1>{data.tokenId}</h1>
							</div>
							
						</div>
						<div className="second-box">
							<div className="content">
								<h2>Title</h2>
								<h1>{data.title}</h1>
							</div>
							<div className="content">
								<h2>Artist</h2>
								<h1>{data.artist_name}</h1>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default AuctionCard