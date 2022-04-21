import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import "./SellCard.css";

const SellCard = ({data}) => {
	const navigate = useNavigate()
	const cardOnClick = () => {
		// navigate(`/store/enroll/${data.tokenId}`);
	}

	useEffect(() => {
		console.log(data)
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
								<h2>Price</h2>
								<h1>{data.price} ETH</h1>
							</div>
							<div></div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default SellCard