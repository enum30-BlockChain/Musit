import "./Store.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readOnAuctionNFTList, readOnMarketNFTList } from "../../../redux/actions/contractActions";
import SellCard from "./nftcard/SellCard"
import AuctionCard from "./nftcard/AuctionCard";
import Error from "../../Error";
import SimpleBackdrop from "../music/SimpleBackdrop";

const fakeFetch = (delay = 1000) => new Promise((res) => setTimeout(res, delay));

export const Store = () => {
  const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const market = useSelector((state) => state.market);
  const auction = useSelector((state) => state.auction);

  useEffect(async () => {
    await dispatch(readOnMarketNFTList())
    await dispatch(readOnAuctionNFTList())
		await fakeFetch()
		setLoading(false)
  }, []);

	return !market || market.error || !auction || auction.error ? (
		<ErrorContent />
	) : (
		<>
			<SuccessContent loading={loading} />
		</>
	);
};

const SuccessContent = ({loading}) => {
	const market = useSelector((state) => state.market);
  const auction = useSelector((state) => state.auction);

	useEffect(async () => {
    btnListener()
  }, []);

	const btnListener = () => {
    document
			.querySelector(".nav-links .ordinary-market")
			.addEventListener("click", () => {
				const contentContainer = document.querySelector(
					".store .content-container"
				);
				contentContainer.classList.add("ordinary");
				contentContainer.classList.remove("auction");
			});
		document
			.querySelector(".nav-links .auction-market")
			.addEventListener("click", () => {
				const contentContainer = document.querySelector(
					".store .content-container"
				);
				contentContainer.classList.remove("ordinary");
				contentContainer.classList.add("auction");
			});
  }

  return (
		<section className="store">
			<nav className="top-nav">
				<ul className="nav-links">
					<li className="ordinary-market">
						<a>
							<i className="uil uil-shopping-cart"></i>
							<span className="link-name"> Ordinary Market</span>
						</a>
					</li>
					<li className="auction-market">
						<a>
							<i className="uil uil-arrow-growth"></i>
							<span className="link-name"> Auction Market</span>
						</a>
					</li>
				</ul>
			</nav>
			<section className="content-container ordinary">
				{loading ||
				(market && market.loading) ||
				(auction && auction.loading) ? (
					<LoadingContent />
				) : (
					<>
						<Ordinary />
						<Auction />
					</>
				)}
			</section>
		</section>
	);
}

const Ordinary = () => {
  const market = useSelector((state) => state.market.data);
  return (
    <section className="ordinary-box">
      {market.length > 0 && market.map((nft, index) =>
        <SellCard data={nft} key={`sell-${nft.itemId}-${index}`} />
      )}
			{market.length == 0 && <>
				Nothing to buy
			</>}
    </section>
  )
}

const Auction = () => {
  const auction = useSelector((state) => state.auction.data);

  return (
    <section className="auction-box">
      {auction.length > 0 && auction.map((nft, index) =>
        <AuctionCard data={nft} key={`auction-${nft.itemId}-${index}`} />
      )}
			{auction.length == 0 && <>
				Nothing to bid
			</>}
    </section>
  )
}


/* Loading 화면 */
const LoadingContent = () => {
	return (
		<>
			<SimpleBackdrop />
		</>
	);
};


/* Error 화면 */
const ErrorContent = () => {
	return <Error error ={{name: "Error Page Error", message: "Error page loading fail"}} />;;
};