import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Marquee from "react-fast-marquee";
import { readMyNFTList } from "../../../../../redux/actions/contractActions";
import { Link } from "react-router-dom";
import Ethers from "../../../../../web3/Ethers";

const Usercontent = () => {
  const user = useSelector((state) => state.user);
  const recentMusic = useSelector((state) => state.recentMusic);
  const likeMusic = useSelector((state) => state.likeMusic.data);
  const likeArtist = useSelector((state) => state.likeArtist.data);
  const mynft = useSelector((state) => state.ownedMusitNFT.data);
  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(readMyNFTList());
    const subsEndAt = await Ethers.getSubscriptionEndAt(user.address);
    const countDown = setInterval(() => {
			const now = new Date().getTime();
			const distance = (subsEndAt*1000) - now;
			const days = Math.floor(distance / (1000 * 60 * 60 * 24));
			const hours = Math.floor(
				(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			);
			const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((distance % (1000 * 60)) / 1000);
	
			document.getElementById("countdown").innerHTML =
				days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	
			// 남은 시간이 0보다 작으면 종료
			if (distance < 0 || distance == NaN) {
				clearInterval(countDown);
				document.getElementById("countdown").innerHTML = "EXPIRED";
			}
		}, 1000);
  }, []);

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
            <i className="uil uil-bill"></i>
            <span className="text">Subscription</span>
            <span className="number">{user && user.subscription}Month</span>
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
          <Link to={"/mypage/subscription"} className="box box1">
            <i className="uil uil-hourglass"></i>
            <span className="text">Subscription</span>
            <span className="number" id="countdown"></span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Usercontent;
