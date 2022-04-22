import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readMyNFTList } from "../../../../../redux/actions/contractActions";
const Usercontent = () => {
  const user = useSelector((state) => state.user);
  const likeMusic = useSelector((state) => state.likeMusic.data);
  const likeArtist = useSelector((state) => state.likeArtist.data);
  const mynft = useSelector((state) => state.ownedMusitNFT.data);
  const title = document.getElementById("title");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readMyNFTList());
  }, []);
  return (
    <>
      <div className="contentbox">
        <div className="boxes">
          <div className="box box1">
            <i className="uil uil-thumbs-up"></i>
            <span className="text">Total Music Likes</span>
            <span className="number">{likeMusic && likeMusic.length}</span>
          </div>
          <div className="box box1">
            <i className="uil uil-heart"></i>
            <span className="text">Total Artist Likes</span>
            <span className="number">{likeArtist && likeArtist.length}</span>
          </div>
        </div>

        <div className="boxes">
          <div className="box box1">
            <i className="uil uil-bill"></i>
            <span className="text">Subscription</span>
            <span className="number">{user && user.subscription}Month</span>
          </div>
          <div className="box box1">
            <i className="uil uil-capture"></i>
            <span className="text">Total NFT</span>
            <span className="number">{mynft && mynft.length}</span>
          </div>
        </div>

        <div className="boxes">
          <div className="box box1">
            <i className="uil uil-headphones-alt"></i>
            <span className="text">Recently Played Music</span>
            <span className="number">Title</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Usercontent;
