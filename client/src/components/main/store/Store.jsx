import "./Store.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readOnAuctionNFTList, readOnMarketNFTList } from "../../../redux/actions/contractActions";
import SellCard from "./nftcard/SellCard"
import AuctionCard from "./nftcard/AuctionCard";

export const Store = () => {
  const user = useSelector((state) => state.user);
  const market = useSelector((state) => state.market);
  const auction = useSelector((state) => state.auction);
  const dispatch = useDispatch();

  useEffect(async () => {
    btnListener()
    await dispatch(readOnMarketNFTList())
    await dispatch(readOnAuctionNFTList())
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
				{market.loading || auction.loading ? (
					<>loading</>
				) : (
					<>
						<Ordinary />
						<Auction />
					</>
				)}
			</section>
		</section>
	);
};

const Ordinary = () => {
  const market = useSelector((state) => state.market);
  return (
    <section className="ordinary-box">
      {market.data.map((nft, index) => <>
        <SellCard data={nft} key={index} />
      </>)}
    </section>
  )
}

const Auction = () => {
  const auction = useSelector((state) => state.auction);
  useEffect(() => {
    console.log(auction.data)
  }, [auction.loading])

  return (
    <section className="auction-box">
      {auction.data.map((nft, index) => <>
        <AuctionCard data={nft} key={index} />
      </>)}
    </section>
  )
}

