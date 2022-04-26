import { LinearProgress, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectedMusitNFT } from "../../../../redux/actions/contractActions";
import Ethers from "../../../../web3/Ethers";
import Error from "../../../Error";
import SimpleBackdrop from "../../../SimpleBackdrop";


import "./Bid.css";
const fakeFetch = (delay = 500) => new Promise((res) => setTimeout(res, delay));

const Bid = () => {
	let { tokenId } = useParams();
	const selectedNFT = useSelector((state) => state.selectedMusitNFT);
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	
	useEffect(async () => {
		if (selectedNFT.itemId === undefined) {
			const item = await Ethers.getAuctionItem(tokenId)
			await dispatch(selectedMusitNFT(item))
		}
		await fakeFetch()
		setLoading(false)
	}, [selectedNFT]);

	return loading ? (
		<LoadingContent />
	) : !selectedNFT ? (
		<ErrorContent />
	) : (
		<>
			<SuccessContent />
		</>
	);
};

/* 페이지 로딩 Success 화면 */
const SuccessContent = () => {
	const user = useSelector((state) => state.user);
	const selectedNFT = useSelector((state) => state.selectedMusitNFT);
	
	const [expired, setExpired] = useState(false);
	const [bidPrice, setBidPrice] = useState(selectedNFT.topBid);
	const [pendingBids, setPendingBids] = useState(0);
	const [bidPriceWithFee, setBidPriceWithFee] = useState(0);

	// NFT 판매 등록
	const bidOnClick = async (e) => {
		e.preventDefault();
		await Ethers.bid(selectedNFT.itemId, bidPrice)
	}

	// NFT 판매 등록
	const withdrawOnClick = async (e) => {
		e.preventDefault();
		await Ethers.purchaseNFT(selectedNFT.itemId)
	}

	// 주소 짧게 만들기
	const shortAddress = (topBidder) => {
		if(topBidder) {
			return `${topBidder.slice(0,5)}...${topBidder.slice(-4)}`
		} else {
			return "Cannot found"
		}
	}
	
	const twoDigit = (number) => {
		return ("0" + number).slice(-2)
	}

	useEffect(async () => {
		setBidPriceWithFee(await Ethers.bidPriceWithFee(selectedNFT.topBid))
		setPendingBids(await Ethers.getPendingBids(selectedNFT.itemId, user.address))
		const bidCountdown = document.getElementById("countdown");
		// 1초마다 카운트 다운
		const countDown = setInterval(() => {
			if (selectedNFT.endAt !== null) {
				const now = new Date().getTime();
				const distance = selectedNFT.endAt * 1000 - now;

				const days = Math.floor(distance / (1000 * 60 * 60 * 24));
				const hours = twoDigit(
					Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
				);
				const minutes = twoDigit(
					Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
				);
				const seconds = twoDigit(Math.floor((distance % (1000 * 60)) / 1000));

				bidCountdown.innerHTML =
					days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

				// 남은 시간이 0보다 작으면 종료
				if (distance < 0) {
					clearInterval(countDown);
					bidCountdown.innerHTML = "EXPIRED";
					bidCountdown.style.color = "red";
					document
						.querySelector(".bid-container .input-form")
						.classList.add("expired");
					setExpired(true);
				}
			} else {
				clearInterval(countDown);
				setExpired(true);
			}
		}, 1000);
		
		return () => {
			clearInterval(countDown);
		}
	}, [])

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
				{!selectedNFT.sold ? (
					<>
						<section className="info-container">
							<div className="genre-box">
								<h2>
									<i className="uil uil-music"></i> Genre
								</h2>
								<h1>{selectedNFT.genre && selectedNFT.genre.join(", ")}</h1>
							</div>
							<div className="description-box">
								<h2>
									<i className="uil uil-subject"></i> Description
								</h2>
								<p>{selectedNFT.description}</p>
							</div>
						</section>
						<section className="input-container">
							<form className="input-form">
								<h1 className="title">Be the top bidder!</h1>
								<div className="top-bidder-box">
									<h2>
										<i className="uil uil-game-structure"></i> Top Bidder
									</h2>
									<h1>{shortAddress(selectedNFT.topBidder)}</h1>
								</div>
								<div className="top-bid-box">
									<h2>
										<i className="uil uil-trophy"></i> Top Bid
									</h2>
									<h1>{selectedNFT.topBid}</h1>
								</div>
								<div className="countdown-box">
									<div className="title-box">
										<h2>
											<i className="uil uil-schedule"></i> End At
										</h2>
									</div>
									<h1 id="countdown"><LinearProgress color="inherit"/></h1>
								</div>
								<div className="price-box">
									<div className="title-box">
										<h2>Bid Price</h2> <h5>*</h5>
									</div>
									<input
										min={selectedNFT.topBid}
										defaultValue={selectedNFT.topBid}
										disabled={expired}
										step={0.0001}
										required
										type="number"
										onChange={async (e) => {
											setBidPrice(e.target.value)
											if (e.target.value > 0) {
												setBidPriceWithFee(await Ethers.bidPriceWithFee(e.target.value))
											} else {
												setBidPriceWithFee(0)
											}
										}}
									/>

								{!expired && <div className="total-bid-box"><h3>My Total Bids will be </h3> <h4>{(Number(pendingBids)+Number(bidPrice)).toFixed(6)} ETH</h4> </div> }
								{!expired && <div className="total-price-box"><h3>Price with fee : </h3><h4>{Number(bidPriceWithFee).toFixed(6)} ETH</h4></div>}
								</div>
								{expired ? <button onClick={withdrawOnClick}>Withdraw</button> : <button onClick={bidOnClick}>Submit</button>}
							</form>
						</section>
					</>
				) : (
					<>
						<section className="not-available-container">
							<h1>This item is not available to bid!</h1>
						</section>
					</>
				)}
			</section>
		</section>
	);
};

/* Loading 화면 */
const LoadingContent = () => {
	return (
		<>
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

					<div className="audio-box">
						<audio src={``} controls></audio>
					</div>
				</section>

				{/*** 오른쪽 컨테이너 ***/}
				<section className="right-container">
					{/* 상세정보 컨테이너 */}
					<section className="info-container">
						<h1 className="title">Be the top bidder!</h1>
						<div className="genre-box">
							<h2>
								<i className="uil uil-music"></i> Genre
							</h2>
							<Skeleton width={"100%"} height={"100%"} variant="text" />
						</div>
						<div className="description-box">
							<h2>
								<i className="uil uil-subject"></i> Description
							</h2>
							<Skeleton width={"100%"} height={"100%"} variant="text" />
						</div>
						<div className="sell-price-box">
							<h2>
								<i className="uil uil-bill"></i> Sell Price
							</h2>
							<Skeleton width={"100%"} height={"100%"} variant="text" />
						</div>
						<button>Bid</button>
					</section>
				</section>
			</section>
			<SimpleBackdrop/>
		</>
	);
};

/* Error 화면 */
const ErrorContent = () => {
	return <section className="auction-layout">
		<Error error={{name: "Bid Error", message: "Bid page loading fail"}}/>
	</section>;
};

export default Bid;

