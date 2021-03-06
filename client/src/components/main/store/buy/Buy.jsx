import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { selectedMusitNFT } from "../../../../redux/actions/contractActions";
import Ethers from "../../../../web3/Ethers";
import Error from "../../../Error";
import SimpleBackdrop from "../../../SimpleBackdrop";


import "./Buy.css";
const fakeFetch = (delay = 500) => new Promise((res) => setTimeout(res, delay));

const Buy = () => {
	let { tokenId } = useParams();
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const selectedNFT = useSelector((state) => state.selectedMusitNFT);

	useEffect(async () => {
		if (selectedNFT.itemId === undefined) {
			const item = await Ethers.getMarketItem(tokenId)
			await dispatch(selectedMusitNFT(item))
		}
		await fakeFetch()
		setLoading(false)
	}, []);

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
	const selectedNFT = useSelector((state) => state.selectedMusitNFT);
	const [buyLoading, setbuyLoading] = useState(false);
	const navigate = useNavigate();

	// NFT 판매 등록
	const buyOnClick = async (e) => {
		setbuyLoading(true)
		e.preventDefault();
		const result = await Ethers.purchaseNFT(selectedNFT.itemId)
		setbuyLoading(false)
		if(result && result.confirmations > 0) {
			window.alert("구매에 성공했습니다!")
			navigate('/mypage/mynftlist')
		} else {
			window.alert("구매에 실패했습니다.")
			navigate('/store/')
		}
	}

	return (
		<section className="buy-container">
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
							<h5 className="title">BUY NFT</h5>
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
								<pre>{selectedNFT.description}</pre>
							</div>
							<div className="sell-price-box">
								<h2>
									<i className="uil uil-bill"></i> Sell Price
								</h2>
								<h1>{selectedNFT.price} ETH</h1>
								<h3>(Price with fee : {selectedNFT.totalPrice} ETH)</h3>
							</div>
							{!selectedNFT.sold ? (
								<button onClick={buyOnClick}>Buy</button>
							) : (
								<div className="sold-box">Sold</div>
							)}
						</section>
					</>
				) : (
					<>
						<section className="not-available-container">
							<h1>This item is not available to buy!</h1>
						</section>
					</>
				)}
			</section>
			{buyLoading ? <SimpleBackdrop /> : <></>}
		</section>
	);
};

/* Loading 화면 */
const LoadingContent = () => {
	return (
		<>
			<section className="buy-container">
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
						<h1 className="title">BUY NFT</h1>
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
						<button>Buy</button>
					</section>
				</section>
			</section>
		</>
	);
};

/* Error 화면 */
const ErrorContent = () => {
	return <section className="auction-layout">
		<Error error={{name: "Buy Error", message: "Buy page loading fail"}}/>
	</section>;
};

export default Buy;
