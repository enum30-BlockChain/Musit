import "./Store.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  readOnAuctionNFTList,
  readOnMarketNFTList,
} from "../../../redux/actions/contractActions";
import SellCard from "./nftcard/SellCard";
import AuctionCard from "./nftcard/AuctionCard";
import Error from "../../Error";
import SimpleBackdrop from "../../SimpleBackdrop";
import Nothing from "../../landingpage/pages/Nothing";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";


const fakeFetch = (delay = 500) =>
  new Promise((res) => setTimeout(res, delay));

export const Store = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const market = useSelector((state) => state.market);
  const auction = useSelector((state) => state.auction);

  useEffect(async () => {
    await dispatch(readOnMarketNFTList());
    await dispatch(readOnAuctionNFTList());
    await fakeFetch();
    setLoading(false);
  }, []);

  return !market || market.error || !auction || auction.error ? (
    <ErrorContent />
  ) : (
    <>
      <SuccessContent loading={loading} />
    </>
  );
};

const SuccessContent = ({ loading }) => {
  const market = useSelector((state) => state.market);
  const auction = useSelector((state) => state.auction);

  useEffect(async () => {
    // btnListener();
  }, []);

  const btnListener = () => {
    document
      .querySelector(".nav-links .ordinary-market")
      .addEventListener("click", () => {
        const contentContainer = document.querySelector(
          ".store .content-container"
        );
        contentContainer.classList.remove("mybids");
        contentContainer.classList.remove("auction");
        contentContainer.classList.add("ordinary");
      });
    document
      .querySelector(".nav-links .auction-market")
      .addEventListener("click", () => {
        const contentContainer = document.querySelector(
          ".store .content-container"
        );
        contentContainer.classList.remove("ordinary");
        contentContainer.classList.remove("mybids");
        contentContainer.classList.add("auction");
      });
    document
      .querySelector(".nav-links .my-bids")
      .addEventListener("click", () => {
        const contentContainer = document.querySelector(
          ".store .content-container"
        );
        contentContainer.classList.remove("ordinary");
        contentContainer.classList.remove("auction");
        contentContainer.classList.add("mybids");
      });
  };

  return (
    <section className="store">
      <nav className="top-nav">
        <ul className="nav-links">
          <li className="ordinary-market">
            <Link to="/store">
              <i className="uil uil-shopping-cart"></i>
              <span className="link-name"> Ordinary Market</span>
            </Link>
          </li>
          <li className="auction-market">
            <Link to="/store/auction">
              <i className="uil uil-arrow-growth"></i>
              <span className="link-name"> Auction Market</span>
            </Link>
          </li>
          <li className="my-bids">
            <Link to="/store/mybids">
              <i className="uil uil-transaction"></i>
              <span className="link-name"> My Bids</span>
            </Link>
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
            <Outlet/>
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
      <SimpleBackdrop />
    </>
  );
};

/* Error 화면 */
const ErrorContent = () => {
  return (
    <Error error={{ name: "Page Error", message: "Error page loading fail" }} />
  );
};
