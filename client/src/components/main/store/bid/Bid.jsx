import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectedMusitNFT } from "../../../../redux/actions/contractActions";
import Ethers from "../../../../web3/Ethers";
import Error from "../../../Error";

import "./Bid.css";

const Bid = () => {
	let { tokenId } = useParams();
	const dispatch = useDispatch();
	const selectedNFT = useSelector((state) => state.selectedMusitNFT);

	useEffect(async () => {
		if (selectedNFT.itemId === undefined) {
			const item = await Ethers.getMarketItem(tokenId)
			await dispatch(selectedMusitNFT(item))
		}
	}, []);

	return selectedNFT && selectedNFT.loading ? (
		<LoadingContent />
	) : !selectedNFT || selectedNFT.error || selectedNFT === undefined ? (
		<ErrorContent />
	) : (
		<>
			<SuccessContent />
		</>
	);
};

/* 페이지 로딩 Success 화면 */
const SuccessContent = () => {
	const selectedNFT = useSelector((state) => state.selectedMusitNFT);

	// NFT 판매 등록
	const buyOnClick = async (e) => {
		e.preventDefault();
		await Ethers.purchaseNFT(selectedNFT.itemId)
	}

	return (
		<section className="bid-container">
			{/* 이미지 박스 */}
			<div className="image-box">
				<img src={selectedNFT.img_file} alt="" />
			</div>

			{/*** 왼쪽 컨테이너 ***/}
			<section className="left-container">
				<div className="title-box">
					<h2>Title</h2>
					<h1>{selectedNFT.title}</h1>
				</div>
				<div className="artist-name-box">
					<h2>Artist Name</h2>
					<h1>{selectedNFT.artist_name}</h1>
				</div>

				<div className="audio-box">
					<audio
						src={`https://ipfs.infura.io/ipfs/${selectedNFT.ipfs_hash}`}
						controls
					></audio>
				</div>
			</section>

			{/*** 오른쪽 컨테이너 ***/}
			<section className="right-container">
				{/* 상세정보 컨테이너 */}
				{!selectedNFT.sold ? <>
					<section className="info-container">
					<h1 className="title">
						BUY NFT
					</h1>
					<div className="genre-box">
						<h2>
							<i className="uil uil-music"></i> Genre
						</h2>
						<h1>{selectedNFT.genre && selectedNFT.genre.join(", ")}</h1>
					</div>
					<div className="description-box">
						<h2><i className="uil uil-subject"></i> Description</h2>
						<p>{selectedNFT.description}</p>
					</div>
					<div className="sell-price-box">
						<h2>
							<i className="uil uil-bill"></i> Sell Price
						</h2>
						<h1>{selectedNFT.price}</h1>
					</div>
					<button disabled={selectedNFT.sold} onClick={buyOnClick} >Bid</button>
				</section>
				</> : <>
					<section className="not-available-container">
						<h1>
							This item is not available to bid!
						</h1>
					</section>
				</>}
				
			</section>
		</section>
	);
};

/* Loading 화면 */
const LoadingContent = () => {
	return (
		<section className="bid-container">
			{/* 이미지 박스 */}
			<div className="image-box">
				<Skeleton width={"100%"} height={"100%"} variant="circular" />
			</div>

			{/*** 왼쪽 컨테이너 ***/}
			<section className="left-container">
				<div className="title-box">
					<h2>Title</h2>
					<Skeleton width={"100%"} height={"100%"} variant="text" />
				</div>
				<div className="artist-name-box">
					<h2>Artist Name</h2>
					<Skeleton width={"100%"} height={"100%"} variant="text" />
				</div>
				<div>
					<Skeleton width={"100%"} height={"100%"} variant="text" />
				</div>
			</section>

			{/*** 오른쪽 컨테이너 ***/}
			<section className="right-container">
				{/* 상세정보 컨테이너 */}
				<section className="info-container">
					<div className="total-play-time-box">
						<h2>
							<i className="uil uil-clock"></i> Total Play Time
						</h2>
						<Skeleton width={"100%"} height={"100%"} variant="text" />
					</div>
					<div className="total-play-time-box">
						<h2>
							<i className="uil uil-thumbs-up"></i>Total Likes
						</h2>
						<Skeleton width={"100%"} height={"100%"} variant="text" />
					</div>
					<div className="genre-box">
						<h2>
							<i className="uil uil-music"></i> Genre
						</h2>
						<Skeleton width={"100%"} height={"100%"} variant="text" />
					</div>
					<div className="description-box">
						<h2>Description</h2>
						<Skeleton width={"100%"} height={"100%"} variant="text" />
					</div>
				</section>

				{/* 입력 컨테이너 */}
				<section className="input-container sell">
					<div className="btn-group">
						<button className="sell-btn" >
							Sell
						</button>
						<button className="auction-btn" >
							Auction
						</button>
					</div>
					<div className="input-form">
					</div>
				</section>
			</section>
		</section>
	);
};

/* Error 화면 */
const ErrorContent = () => {
	return <section className="auction-layout">
		<Error error={{name: "Bid Error", message: "Bid page loading fail"}}/>
	</section>;
};

export default Bid;
