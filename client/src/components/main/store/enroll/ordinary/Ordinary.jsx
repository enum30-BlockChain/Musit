import { Button, Input, Skeleton, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { readMusicData } from "../../../../../redux/actions/musicActions";
import { mintingMusitNFT } from "../../../../../redux/actions/musitNFTActions";
import Ethers from "../../../../../web3/Ethers";

import "./Ordinary.css";

const Ordinary = () => {
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
		<section className="ordinary-layout">
			<div className="content-box ordinary-img-box">
        <h2>Album Cover Image</h2>
				<Skeleton width={400} height={400} sx={{marginTop:"20px"}} variant="circular" />
			</div>

			<div className="ordinary-content-container">
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
		<section className="ordinary-container">
			<div className="image-box">
				<img src={musicData.img_file} alt="" />
			</div>
			<div className="left-box">
				<div className="title-box">
					<h2>Title</h2>
					<h1>{musicData.title}</h1>
				</div>

				<div className="genre-box">
					<h2>Genre</h2>
					<h1>{musicData.genre}</h1>
				</div>

				<div className="audio-box">
					<audio src={`https://ipfs.infura.io/ipfs/${ipfs_hash}`} controls></audio>
				</div>
			</div>
			<div className="right-box">

			</div>
		</section>
	);
};

export default Ordinary;
