import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Marquee from "react-fast-marquee";
import { readMyNFTList } from "../../../../../redux/actions/contractActions";
import { Link } from "react-router-dom";
import Ethers from "../../../../../web3/Ethers";
import { CircularProgress } from "@mui/material";

const Usercontent = () => {
  const metamask = useSelector((state) => state.metamask);
  // console.log(111111);
  // console.log(metamask.balance / 10 ** 18);
  const user = useSelector((state) => state.user);
  const recentMusic = useSelector((state) => state.recentMusic);
  const likeMusic = useSelector((state) => state.likeMusic.data);
  const likeArtist = useSelector((state) => state.likeArtist.data);
  const mynft = useSelector((state) => state.ownedMusitNFT.data);
  const dispatch = useDispatch();

  const twoDigit = (number) => {
    return ("0" + number).slice(-2);
  };

  const balance = (metamask) => {
    console.log(metamask.balance);
  };

  useEffect(async () => {
    await dispatch(readMyNFTList());
    if (user) {
      const subsEndAt = await Ethers.getSubscriptionEndAt(user.address);
      const countdown = document.getElementById("subs-countdown");
      const subscription = setInterval(() => {
        if (subsEndAt !== null && countdown !== null) {
          const now = new Date().getTime();
          const distance = subsEndAt * 1000 - now;

          const days = twoDigit(Math.floor(distance / (1000 * 60 * 60 * 24)));
          const hours = twoDigit(
            Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          );
          const minutes = twoDigit(
            Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
          );
          const seconds = twoDigit(Math.floor((distance % (1000 * 60)) / 1000));

          countdown.innerHTML =
            days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

          // 남은 시간이 0보다 작으면 종료
          if (distance < 0) {
            clearInterval(subscription);
            countdown.innerHTML = "EXPIRED";
          }
        } else {
          clearInterval(subscription);
        }
      }, 1000);

      return () => {
        clearInterval(subscription);
      };
    }
  }, [user.loading]);

  return (
    <>
      <div className="contentbox">
        <div className="boxes">
          <Link to={"/mypage/favoritmusic"} className="box box1">
            <i className="uil uil-thumbs-up"></i>
            <span className="text">Total Music Likes</span>
            <span className="number">{likeMusic && likeMusic.length}</span>
          </Link>
          <Link to={"/mypage/favoritartist"} className="box box1">
            <i className="uil uil-heart"></i>
            <span className="text">Total Artist Likes</span>
            <span className="number">{likeArtist && likeArtist.length}</span>
          </Link>
        </div>

        <div className="boxes">
          <Link to={"/mypage/subscription"} className="box box1">
            <i className="uil uil-hourglass"></i>
            <span className="text">Subscription</span>
            <span className="number" id="subs-countdown">
              <CircularProgress />{" "}
            </span>
          </Link>
          <Link to={"/mypage/mynftlist"} className="box box1">
            <i className="uil uil-capture"></i>
            <span className="text">Total NFT</span>
            <span className="number">{mynft && mynft.length}</span>
          </Link>
        </div>

        <div className="boxes">
          <Link to={"/"} className="box box1">
            <i className="uil uil-headphones-alt"></i>
            <span className="text">Recently Played Music</span>
            <Marquee className="number">{recentMusic}</Marquee>
          </Link>
          <Link to={"/"} className="box box1">
            <i className="uil uil-wallet"></i>
            <span className="text">Wallet Balance</span>
            <span className="number">{balance}ETH</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Usercontent;
