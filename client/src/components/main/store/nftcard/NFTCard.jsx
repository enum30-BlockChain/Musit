import React from 'react'
import { useNavigate } from 'react-router';
import "./NFTCard.css";

const NFTCard = ({data}) => {
	const navigate = useNavigate()
	const cardOnClick = () => {
		navigate(`/store/enroll/${data.tokenId}`);
	}
	
  return (
		<>
			<div className="item-card" onClick={cardOnClick}>
				<div className="img-box">
					<img src={data.img_file} />
				</div>
				<div className="content-wrap">
					<div className="color-box"></div>
					<div className="content-box">
						<div className="content">
							<h2>Title</h2>
							<h1>{data.title}</h1>
						</div>
						<div className="content">
							<h2>Artist</h2>
							<h1>{data.artist_name}</h1>
						</div>
					</div>
					<div className="audio-box">
						<audio
							src={`https://ipfs.infura.io/ipfs/${data.ipfs_hash}`}
							controls
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default NFTCard