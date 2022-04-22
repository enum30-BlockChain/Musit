import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import "./AuctionCard.css";

const AuctionCard = ({data}) => {
	const navigate = useNavigate()
	const cardOnClick = () => {
		// navigate(`/store/enroll/${data.tokenId}`);
	}

	const calcDate = (date) => {
		return (new Date(date*1000)).toISOString().slice(0,10)
	}

	useEffect(() => {
		calcDate(data.endAt)
	}, []);
	
  return (
		<>
			<div className="item-card" onClick={cardOnClick}>
				<div className="img-box">
					<img src={data.img_file} />
				</div>
				<div className="content-wrap">
					<div className="color-box"></div>
					<div className="info-wrap">
						<div className="first-box">
							<div className="content">
								<h2>Title</h2>
								<h1>{data.title}</h1>
							</div>
							<div className="content">
								<h2>Artist</h2>
								<h1>{data.artist_name}</h1>
							</div>
						</div>
						<div className="second-box">
							<div className="price-box">
								<h2>Start Price</h2>
								<h1>{data.startPrice} ETH</h1>
							</div>
							<div className="price-box">
								<h2>Top Bid</h2>
								<h1>{data.topBid} ETH</h1>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default AuctionCard