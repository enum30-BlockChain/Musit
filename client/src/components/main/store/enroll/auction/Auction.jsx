import { Button, Skeleton } from "@mui/material";
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
	const dispatch = useDispatch();

  const enrollAuctionOnClick = async () => {
    
  }

	return (
		<section className="auction-layout">
			<div className="content-box auction-img-box">
				<h2>Album Cover Image</h2>
				<img src={musicData.img_file} />
			</div>

			<div className="auction-content-container">
				<div className="content-box title-box">
					<h2 className="title">Title</h2>
					<p className="content">{musicData.title}</p>
				</div>
				<div className="content-box audio-box">
					<h2 className="title">Audio</h2>
					<audio src={`https://ipfs.infura.io/ipfs/${ipfs_hash}`} controls />
				</div>
				<div className="content-box description-box">
					<h2 className="title">Description</h2>
					<p className="content">{musicData.description}</p>
					<div className="auction-btn">
						<Button
              onClick={enrollAuctionOnClick}
							sx={{
                color: "var(--black-light-color)",
								backgroundColor: "var(--box1-color)",
								":hover": {
									background: "var(--primary-color)",
									color: "var(--text-color)",
								},
							}}
						>
							Auction
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Auction;
