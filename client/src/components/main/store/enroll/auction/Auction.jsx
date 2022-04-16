import { Button, Input, Skeleton, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { readMusicData } from "../../../../../redux/actions/musicActions";
import { mintingMusitNFT } from "../../../../../redux/actions/musitNFTActions";
import Ethers from "../../../../../web3/Ethers";

import "./Auction.css";

const Auction = () => {
	let { ipfs_hash } = useParams();
	const dispatch = useDispatch();
	const musicData = useSelector((state) => state.music);

	useEffect(async () => {
		await dispatch(readMusicData(ipfs_hash));
	}, []);
  


  
	return musicData.loading || !musicData.ipfs_hash ? (
		<LoadingContent/>
	) : musicData.error ? (
		<ErrorContent/>
	) : (
    <>
      <SuccessContent musicData={musicData} ipfs_hash={ipfs_hash} />
    </>
	);
};

const LoadingContent = () => {
  return (
		<section className="auction-layout">
			<div className="content-box auction-img-box">
        <h2>Album Cover Image</h2>
				<Skeleton width={400} height={400} sx={{marginTop:"20px"}} variant="circular" />
			</div>

			<div className="auction-content-container">
				<div className="content-box title-box">
					<h2 className="title">Title</h2>
          <Skeleton width={400} height={50} variant="text" />
				</div>
				<div className="content-box audio-box">
					<h2 className="title">Audio</h2>
          <Skeleton width={400} height={50} variant="text" />
				</div>
				<div className="content-box description-box">
					<h2 className="title">Description</h2>
          <Skeleton width={400} height={200} variant="text" />
				</div>
			</div>
		</section>
	);
}

const ErrorContent = () => {
  return (
		<section className="auction-layout">
			ERROR
		</section>
	);
}

const SuccessContent = ({musicData, ipfs_hash}) => {
  const artistData = useSelector((state) => state.artist);
  const mintingData = useSelector((state) => state.musitNFTMinting);
	const dispatch = useDispatch();

  const enrollSellOnClick = async () => {
    
  }

	return (
		<section className="auction-layout">
			<div className="content-box auction-img-box">
				<img src={musicData.img_file} />
				<div className="title-box">
					<div className="title">{musicData.title}</div>
					<div className="artist-name">{musicData.artist_name}</div>
				</div>
				<audio src={`https://ipfs.infura.io/ipfs/${ipfs_hash}`} controls />
			</div>
			<div className="auction-content-container">
				<div className="content-box price-box">
					<h2 className="title">Selling Price</h2>
					<div className="input-box">
						<TextField
							label="ETH"
							type="number"
							inputProps={{defaultValue:0.0001, min: 0.0001, step: 0.0001}}
						/>
					</div>
				</div>
				<div className="content-box description-box">
					<h2 className="title">Description</h2>
					<p className="content">{musicData.description}</p>
				</div>

				<div className="content-box auction-btn">
					<Button
						onClick={enrollSellOnClick}
						sx={{
							color: "var(--black-light-color)",
							backgroundColor: "var(--box1-color)",
							":hover": {
								background: "var(--primary-color)",
								color: "var(--text-color)",
							},
						}}
					>
						Sell
					</Button>
				</div>
			</div>
		</section>
	);
};

export default Auction;
