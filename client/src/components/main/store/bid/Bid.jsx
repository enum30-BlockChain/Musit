import { LinearProgress, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
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
	const navigate = useNavigate();

	const [expired, setExpired] = useState(false);
	const [bidPrice, setBidPrice] = useState(0.0001);
	const [pendingBids, setPendingBids] = useState(0);
	const [bidPriceWithFee, setBidPriceWithFee] = useState(0);
	const [bidLoading, setBidLoading] = useState(false);

	// 경매 입찰
	const bidOnClick = async (e) => {
		console.log(bidPrice + pendingBids);
		console.log(selectedNFT.topBid);
		e.preventDefault();
		if (bidPrice + pendingBids >= selectedNFT.topBid) {
			setBidLoading(true)
			const result = await Ethers.bidAuction(selectedNFT.itemId, bidPrice)
			setBidLoading(false)
			if(result && result.confirmations == 1) {
				window.alert("입찰에 성공했습니다!")
				navigate('/store/mybids')
			} else {
				window.alert("입찰에 실패했습니다.")
				window.location.reload();
			}
		} else {
			window.alert("입찰 금액을 확인해주세요")
		}
	}

	// 입찰금 회수 하기
	const withdrawOnClick = async (e) => {
		e.preventDefault();
		if (pendingBids > 0) {
			if(selectedNFT.topBidder.toLowerCase() === user.address.toLowerCase()) {
				window.alert("최고 입찰자는 출금할 수 없습니다.")
				return
			}
			setBidLoading(true)
			const result = await Ethers.withdrawAuction(selectedNFT.itemId)
			setBidLoading(false)
			if(result && result.confirmations == 1) {
				window.alert("입찰금액의 출금이 완료되었습니다.")
				navigate('/store/mybids')
			} else {
				window.alert("입찰금액의 출금에 실패했습니다.")
				window.location.reload();
			}
		} else {
			window.alert("입찰한 기록이 없습니다.")
		}
	}

	// 경매 종료 후 Top bidder가 NFT 받기
	const getNFTOnClick = async (e) => {
		e.preventDefault();
		if (pendingBids > 0) {
			if(selectedNFT.topBidder.toLowerCase() !== user.address.toLowerCase()) {
				window.alert("오직 최고 입찰자만 NFT를 회수 할 수 있습니다.")
				return
			}
			setBidLoading(true)
			const result = await Ethers.endAuction(selectedNFT.itemId)
			console.log(result);
			setBidLoading(false)
			if(result && result.confirmations == 1) {
				window.alert("축하합니다! NFT를 획득했습니다.")
				navigate('/store/mybids')
			} else {
				window.alert("NFT 획득에 실패했습니다.")
				// window.location.reload();
			}
		} else {
			window.alert("입찰한 기록이 없습니다.")
		}
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
		setBidPriceWithFee(Number(await Ethers.bidPriceWithFee(selectedNFT.topBid)))
		setPendingBids(Number(await Ethers.getPendingBids(selectedNFT.itemId, user.address)))
		const bidCountdown = document.getElementById("countdown");
		// 1초마다 카운트 다운
		const countDown = setInterval(() => {
			if (selectedNFT.endAt !== null && bidCountdown !== null) {
				const now = Date.now();
				const distance = new Date(selectedNFT.endAt * 1000 - now);
				const days = Math.floor(distance / (1000 * 60 * 60 * 24));
				const hours = twoDigit(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
				const minutes = twoDigit(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
				const seconds = twoDigit(Math.floor((distance % (1000 * 60)) / 1000));

				bidCountdown.innerHTML =
					days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

				// 남은 시간이 0보다 작으면 종료
				if (distance < 0) {
					clearInterval(countDown);
					bidCountdown.innerHTML = "EXPIRED";
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
			{bidLoading && <SimpleBackdrop />}
			{/* 이미지 박스 */}
			<div className="image-box">
				<img src={selectedNFT.img_file} alt="" />
			</div>

			{/*** 왼쪽 컨테이너 ***/}
			<section className="left-container">
				<div>
					<h2>Token Id</h2>
					<h1>{selectedNFT.tokenId}</h1>
				</div>
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
							<div>
								<h2>Auction Item Id</h2>
								<h1>{selectedNFT.itemId}</h1>
							</div>
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
									<h1>
										{Ethers.zeroAddress() == selectedNFT.topBidder
											? "None"
											: shortAddress(selectedNFT.topBidder)}
									</h1>
								</div>
								<div className="top-bid-box">
									<h2>
										<i className="uil uil-trophy"></i> Top Bid
									</h2>
									<h1>{selectedNFT.topBid} ETH</h1>
								</div>
								<div className="countdown-box">
									<div className="title-box">
										<h2>
											<i className="uil uil-schedule"></i> End At
										</h2>
									</div>
									<h1 id="countdown">
										<LinearProgress color="inherit" />
									</h1>
								</div>
								<div className="price-box">
									<div className="title-box">
										<h2>Bid Price</h2> <h5>*</h5>
									</div>
									<input
										defaultValue={0.0001}
										disabled={expired}
										step={0.0001}
										required
										type="number"
										onChange={async (e) => {
											setBidPrice(e.target.value);
											if (e.target.value > 0) {
												setBidPriceWithFee(
													await Ethers.bidPriceWithFee(e.target.value)
												);
											} else {
												setBidPriceWithFee(0);
											}
										}}
									/>

									{!expired && (
										<>
											<div className="total-bid-box">
												<h3>My Total Bids will be </h3>{" "}
												<h4>
													{(Number(pendingBids) + Number(bidPrice)).toFixed(6)}{" "}
													ETH
												</h4>{" "}
											</div>
											<div className="total-price-box">
												<h3>Price with fee : </h3>
												<h4>{Number(bidPriceWithFee).toFixed(6)} ETH</h4>
											</div>
										</>
									)}
								</div>
								<div className="btn-box">
									{expired ? (
										<>
											{pendingBids > 0 &&
												selectedNFT.topBidder.toLowerCase() !==
													user.address.toLowerCase() && (
													<button
														className="withdraw-btn"
														onClick={withdrawOnClick}
													>
														Withdraw
													</button>
												)}
											{selectedNFT.topBidder.toLowerCase() ===
												user.address.toLowerCase() && (
												<button onClick={getNFTOnClick}>Get NFT</button>
											)}
										</>
									) : (
										<>
											{pendingBids > 0 &&
												selectedNFT.topBidder.toLowerCase() !==
													user.address.toLowerCase() && (
													<button
														className="withdraw-btn"
														onClick={withdrawOnClick}
													>
														Withdraw
													</button>
												)}
											<button className="submit-btn" onClick={bidOnClick}>
												Submit
											</button>
										</>
									)}
								</div>
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
					</section>
					<section className="input-container">
						<form className="input-form">
							<h1 className="title">Be the top bidder!</h1>
							<div className="top-bidder-box">
								<h2>
									<i className="uil uil-game-structure"></i> Top Bidder
								</h2>
								<Skeleton width={"100%"} height={"100%"} variant="text" />
							</div>
							<div className="top-bid-box">
								<h2>
									<i className="uil uil-trophy"></i> Top Bid
								</h2>
								<Skeleton width={"100%"} height={"100%"} variant="text" />
							</div>
							<div className="countdown-box">
								<div className="title-box">
									<h2>
										<i className="uil uil-schedule"></i> End At
									</h2>
								</div>
								<h1 id="countdown">
									<Skeleton width={"100%"} height={"100%"} variant="text" />
								</h1>
							</div>
							<div className="price-box">
								<div className="title-box">
									<h2>Bid Price</h2> <h5>*</h5>
								</div>
								<Skeleton width={"100%"} height={"100%"} variant="text" />
								<Skeleton width={"100%"} height={"100%"} variant="text" />
								<Skeleton width={"100%"} height={"100%"} variant="text" />
							</div>
							<div className="btn-box">
								<button >Submit</button>
							</div>
						</form>
					</section>
				</section>
			</section>
			<SimpleBackdrop />
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

