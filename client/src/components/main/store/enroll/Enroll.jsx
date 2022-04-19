import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { readMusicData } from "../../../../redux/actions/musicActions";
import { readMyNFTList } from "../../../../redux/actions/musitNFTActions";
import Ethers from "../../../../web3/Ethers";

import "./Enroll.css";

const Enroll = () => {
	let { tokenId } = useParams();
	const dispatch = useDispatch();
	const userData = useSelector((state) => state.user);
	const musicData = useSelector((state) => state.music);
	const musitNFT = useSelector((state) => state.musitNFT);
	const [nftData, setNftData] = useState({});
	
	useEffect(async () => {
		if(userData.address) {
			await dispatch(readMyNFTList())
		}
	}, [userData.loading]);

	useEffect(async () => {
		if(musitNFT.myNFTList.length > 0) {
			const thisNFT = await musitNFT.myNFTList.filter(
				(nft) => parseInt(nft.tokenId) === parseInt(tokenId)
			)[0];
			setNftData(thisNFT)
			await dispatch(readMusicData(thisNFT.ipfs_hash));
		}
	}, [musitNFT.loading]);

	return musicData.loading || musitNFT.loading || musicData.ipfs_hash === null? (
		<LoadingContent />
	) : musitNFT.error ? (
		<ErrorContent />
	) : (
		<>
			<SuccessContent nftData={nftData} />
		</>
	);
};

/* 페이지 로딩 Success 화면 */
const SuccessContent = ({nftData}) => {
	let { tokenId } = useParams();
	const musicData = useSelector((state) => state.music);
	const [isOnMarket, setIsOnMarket] = useState(true);

	useEffect(async () => {
		console.log(await Ethers.isOnMarket(tokenId));
		setIsOnMarket(await Ethers.isOnMarket(tokenId))
	},[nftData])

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
				<img src={nftData.img_file} alt="" />
			</div>

			{/*** 왼쪽 컨테이너 ***/}
			<section className="left-container">
				<div className="title-box">
					<h2>Title</h2>
					<h1>{nftData.title}</h1>
				</div>
				<div className="artist-name-box">
					<h2>Artist Name</h2>
					<h1>{nftData.artist_name}</h1>
				</div>

				<div className="audio-box">
					<audio
						src={`https://ipfs.infura.io/ipfs/${nftData.ipfs_hash}`}
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
						<h1>{nftData.genre.join(", ")}</h1>
					</div>
					<div className="description-box">
						<h2>Description</h2>
						<p>{nftData.description}</p>
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
						{isOnMarket ? (
							<>
								<div className="not-available-box">
									<h2>
										<i className="uil uil-exclamation-triangle"></i> Not
										available
									</h2>
									<p>This item is already on the market.</p>
									<p>You cannot enroll items on the market.</p>
								</div>
							</>
						) : (
							<>
								{/* 일반 판매 */}
								<OrdinaryForm isOnMarket={isOnMarket} />
								{/* 경매 */}
								<AuctionForm isOnMarket={isOnMarket} />
							</>
						)}
					</div>
				</section>
			</section>
		</section>
	);
};


/* 일반 판매 */
const OrdinaryForm = ({isOnMarket}) => {
	let { tokenId } = useParams();
	const [sellPrice, setSellPrice] = useState("0.0001");

	// Marketplace 컨트랙트에 내 NFT를 접근 권한 허용하기
	const setPermissionOnClick = async () => {
		await Ethers.approveMyNFT("marketplace", tokenId)
	}

	// 판매 가격 입력
	const sellPriceOnChange = (e) => {
		setSellPrice(e.target.value)
	}

	// NFT 판매 등록
	const submitOnClick = async () => {
		await Ethers.enrollMarketplace(tokenId, sellPrice)
	}

	return (
		<div className="ordinary-form">
			<div className="notice-box">
				<h2>
					<i className="uil uil-exclamation-triangle"></i> Must Read
				</h2>
				<p>
					Before you enroll nft to marketplace, you have to give us the
					permission to access your items.
				</p>
				<p>
					Please click below button to give us permission first and then input
					sell price
				</p>
			</div>
			<div className="permission-box">
				<h2>Permission</h2>
				<button onClick={setPermissionOnClick}>Give Permission</button>
			</div>
			<div className="price-box">
				<h2>Sell-Price</h2>
				<p>Please ETH price to sell. </p>
				<p>(The smallest unit is 0.0001 ETH.)</p>
				<input
					type="number"
					defaultValue={0.0001}
					min={0.0001}
					step={0.0001}
					onChange={sellPriceOnChange}
					required
				/>
				<button onClick={submitOnClick}>submit</button>
			</div>
		</div>
	);
};


/* 경매 */
const AuctionForm = () => {
	let { tokenId } = useParams();

	// 현재 시간 형식 변경 => input date form에 입력할 포맷으로 변경
	const getNowDateTime = () => {
		const now = Date.now();
		const today = (new Date(now))
		const time = (new Date(now).toTimeString().slice(0,5))
		let year = today.getFullYear();
		let month = ("0" + (today.getMonth() + 1)).slice(-2);
		let date = today.getDate();
		const result = `${year}-${month}-${date}T${time}`
		return result;
	}
	
	// 입력할 최대 시간 형식 변경 => 현재 시간으로 부터 7일
	const getMaxDateTime = () => {
		const now = Date.now();
		const today = (new Date(now))
		const time = (new Date(now).toTimeString().slice(0,5))
		let year = today.getFullYear();
		let month = ("0" + (today.getMonth() + 1)).slice(-2);
		let date = today.getDate() + 7;
		const result = `${year}-${month}-${date}T${time}`
		return result;
	}

	// Auction 컨트랙트에 내 NFT를 접근 권한 허용하기
	const setPermissionOnClick = async () => {
		await Ethers.approveMyNFT("auction", tokenId)
	}

	return (
		<div className="auction-form">
			<div className="notice-box">
				<h2>
					<i className="uil uil-exclamation-triangle"></i> Must Read
				</h2>
				<p>
					Before you enroll nft to auction market, you have to give us the
					permission to access your items.
				</p>
				<p>
					Please click below button to give us permission first and then input
					sell price
				</p>
			</div>
			<div className="permission-box">
				<h2>Permission</h2>
				<button onClick={setPermissionOnClick}>Give Permission</button>
			</div>
			<div className="price-box">
				<h2>Start-Price</h2>
				<p>Please ETH price to sell. </p>
				<p>(The smallest unit is 0.0001 ETH.)</p>
				<input type="number" defaultValue={0.0001} min={0.0001} step={0.0001} />
				<h2>End-date</h2>
				<input
					id="datetime-local"
					type="datetime-local"
					min={getNowDateTime()}
					max={getMaxDateTime()}
					defaultValue={getNowDateTime()}
					onChange={(e) => console.log((new Date(e.target.value)).getTime())}
				/>
				<button>submit</button>
			</div>
		</div>
	);
};

/* Loading 화면 */
const LoadingContent = () => {
	return (
		<section className="enroll-container">
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
	return <section className="auction-layout">ERROR</section>;
};

export default Enroll;
