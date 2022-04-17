import { Button, Input, Skeleton, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { readMusicData } from "../../../../redux/actions/musicActions";
import { mintingMusitNFT } from "../../../../redux/actions/musitNFTActions";
import Ethers from "../../../../web3/Ethers";

import "./Enroll.css";

const Enroll = () => {
	let { ipfs_hash } = useParams();
	const dispatch = useDispatch();
	const musicData = useSelector((state) => state.music);

	useEffect(async () => {
		await dispatch(readMusicData(ipfs_hash));
	}, []);

	return musicData.loading || !musicData.ipfs_hash ? (
		<LoadingContent />
	) : musicData.error ? (
		<ErrorContent />
	) : (
		<>
			<SuccessContent musicData={musicData} ipfs_hash={ipfs_hash} />
		</>
	);
};

/* 페이지 로딩 Success 화면 */
const SuccessContent = ({ musicData, ipfs_hash }) => {
	const artistData = useSelector((state) => state.artist);
	const mintingData = useSelector((state) => state.musitNFTMinting);
	const dispatch = useDispatch();

	// Sell, Auction 입력창 변경
	const selectSellOnClick = () => {
		const inputContainer = document.querySelector(".input-container");
		inputContainer.classList.add("sell")
		inputContainer.classList.remove("auction")
	};
	const selectAuctionOnClick = () => {
		const inputContainer = document.querySelector(".input-container");
		
		inputContainer.classList.add("auction")
		inputContainer.classList.remove("sell")
	};

	return (
		<section className="enroll-container">
			{/* 이미지 박스 */}
			<div className="image-box">
				<img src={musicData.img_file} alt="" />
			</div>

			{/*** 왼쪽 컨테이너 ***/}
			<section className="left-container">
				<div className="title-box">
					<h2>Title</h2>
					<h1>{musicData.title}</h1>
				</div>
				<div className="artist-name-box">
					<h2>Artist Name</h2>
					<h1>{musicData.artist_name}</h1>
				</div>

				<div className="audio-box">
					<audio
						src={`https://ipfs.infura.io/ipfs/${ipfs_hash}`}
						controls
					></audio>
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
						<h1>
							{Math.floor((musicData.play_time * musicData.play_count) / 60)}{" "}
							minutes
						</h1>
					</div>
					<div className="total-play-time-box">
						<h2>
							<i className="uil uil-thumbs-up"></i>Total Likes
						</h2>
						<h1>{musicData.MusicLikes.length}</h1>
					</div>
					<div className="genre-box">
						<h2>
							<i className="uil uil-music"></i> Genre
						</h2>
						<h1>{musicData.genre.join(", ")}</h1>
					</div>
					<div className="description-box">
						<h2>Description</h2>
						<p>{musicData.description}</p>
					</div>
				</section>

				{/* 입력 컨테이너 */}
				<section className="input-container sell">
					<div className="btn-group">
						<button className="sell-btn" onClick={selectSellOnClick}>
							Sell
						</button>
						<button className="auction-btn" onClick={selectAuctionOnClick}>
							Auction
						</button>
					</div>
					<div className="input-form">
						{/* 일반 판매 */}
						<OrdinaryForm />
						{/* 경매 */}
						<AuctionForm />
					</div>
				</section>
			</section>
		</section>
	);
};

{
	/* 일반 판매 */
}
const OrdinaryForm = () => {
	return (
		<div className="ordinary-form">
			<div className="notice-box">
				<h2>
					<i className="uil uil-exclamation-triangle"></i> Must Read
				</h2>
				<p>
					Before you enroll nft to marketplace, you have to give us the athority
					of your items.
				</p>
				<p>
					Please click below button to give us approvals first and then input
					sell price
				</p>
			</div>
			<div className="approvals-box">
				<h2>Approval</h2>
				<button>Set approvals</button>
			</div>
			<div className="price-box">
				<h2>Sell-Price</h2>
				<p>Please ETH price to sell. </p>
				<p>(The smallest unit is 0.0001 ETH.)</p>
				<input type="number" defaultValue={0.0001} min={0.0001} step={0.0001} required/>
				<button>submit</button>
			</div>
		</div>
	);
};

{
	/* 경매 */
}
const AuctionForm = () => {
	return (
		<div className="auction-form">
			<div className="notice-box">
				<h2>
					<i className="uil uil-exclamation-triangle"></i> Must Read
				</h2>
				<p>
					Before you enroll nft to marketplace, you have to give us the athority
					of your items.
				</p>
				<p>
					Please click below button to give us approvals first and then input
					sell price
				</p>
			</div>
			<div className="approvals-box">
				<h2>Approval</h2>
				<button>Set approvals</button>
			</div>
			<div className="end-date-box">
				<h2>End-date</h2>
				<input type="date" required onChange={(e) => {console.log(e.target.value)}}/>
			</div>
			<div className="price-box">
				<h2>Start-Price</h2>
				<p>Please ETH price to sell. </p>
				<p>(The smallest unit is 0.0001 ETH.)</p>
				<input type="number" defaultValue={0.0001} min={0.0001} step={0.0001} />
				<button>submit</button>
			</div>
		</div>
	);
};

/* Loading 화면 */
const LoadingContent = () => {
	return (
		<section className="enroll-layout">
			<div className="content-box enroll-img-box">
				<h2>Album Cover Image</h2>
				<Skeleton
					width={400}
					height={400}
					sx={{ marginTop: "20px" }}
					variant="circular"
				/>
			</div>

			<div className="enroll-content-container">
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
};

/* Error 화면 */
const ErrorContent = () => {
	return <section className="auction-layout">ERROR</section>;
};

export default Enroll;
