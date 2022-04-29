import { Button, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { readMusicData } from "../../../redux/actions/musicActions";
import "./Minting.css";
import SimpleBackdrop from "../../SimpleBackdrop";
import AletMessage from "../../AletMessage";
import axios from "axios";
import Ethers from "../../../web3/Ethers";

const Minting = () => {
  let { ipfs_hash } = useParams();
  const dispatch = useDispatch();
  const musicData = useSelector((state) => state.music);

  useEffect(async () => {
    await dispatch(readMusicData(ipfs_hash));
  }, []);

  return musicData.loading || !musicData.ipfs_hash ? (
    <LoadingContent />
  ) : musicData.error ? (
    <>Error</>
  ) : (
    <>
      <SuccessContent musicData={musicData} ipfs_hash={ipfs_hash} />
    </>
  );
};

const LoadingContent = () => {
  return (
    <>
      <SimpleBackdrop/>
    </>
  );
};

const SuccessContent = ({ ipfs_hash }) => {
  const artistData = useSelector((state) => state.artist);
  const musicData = useSelector((state) => state.music);
  const [mintingLoading, setMintingLoading] = useState(false);
	const navigate = useNavigate();

  const mintingOnClick = async () => {
    const metadata = {
      ipfs_hash: musicData.ipfs_hash,
      title: musicData.title,
      description: musicData.description,
      img_file: musicData.img_file,
      genre: musicData.genre,
      artist_name: musicData.artist_name,
      artist_address: artistData.user_address,
    };
    setMintingLoading(true)
    const url = "http://54.180.145.5/files/upload/metadata";
    const uploadResult = ((await axios.post(url, metadata))).data;
    const result = await Ethers.minting(uploadResult.path)
    setMintingLoading(false)
    
    if (result && result.confirmations > 0) {
      <AlertMessage />
      window.alert("Minting 정상적으로 완료 되었습니다.")
      // navigate(`/mypage/mynftlist`);
    } else {
      window.alert("Minting이 완료되지 않았습니다.");
      // navigate(`/artist/myupload`);
    }
  };

  return (
    <section className="minting-layout">
      <section className="minting-container">
        <header className="minting-title">
          <i className="uil uil-capture"></i>
          <span className="text-minting"> NFT-Minting</span>
        </header>

        <main className="mintig-content-wrap">
          <section className="left-container">
            <div className="img-title-box">
              <span className="minitng-imgcover">Album Cover Image</span>
            </div>
            <div className="img-box">
              <img src={musicData.img_file} />
            </div>
          </section>

          <section className="right-container">
            <div className="content-box title-box">
              <h2 className="title-minting">Title</h2>
              <h1 className="content">{musicData.title}</h1>
            </div>

            <div className="content-box audio-box">
              <h2 className="title">Audio</h2>
              <audio
                src={`https://ipfs.infura.io/ipfs/${ipfs_hash}`}
                controls
              />
            </div>

            <div className="content-box description-box">
              <h2 className="title">Description</h2>
              <p>{musicData.description}</p>
            </div>
            <div className="content-box minting-btn">
              <Button
                onClick={mintingOnClick}
                sx={{
                  color: "var(--black-light-color)",
                  backgroundColor: "var(--box1-color)",
                  ":hover": {
                    background: "var(--primary-color)",
                    color: "var(--text-color)",
                  },
                }}
              >
                Minting
              </Button>
            </div>
          </section>
        </main>
      </section>
      {mintingLoading ? <SimpleBackdrop/> : <></>}
    </section>
  );
};

export default Minting;
