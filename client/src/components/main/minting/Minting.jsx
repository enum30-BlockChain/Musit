import { Button, Skeleton } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { readMusicData } from "../../../redux/actions/musicActions";
import { mintingMusitNFT } from "../../../redux/actions/contractActions";
import "./Minting.css";
import SimpleBackdrop from "../../SimpleBackdrop";

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
  const dispatch = useDispatch();

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
    await dispatch(mintingMusitNFT(metadata));
  };

  return (
    <section className="minting-layout">
      <section className="minting-container">
        <header className="minting-title">
          <i className="uil uil-capture"></i>
          <span className="text-minting"> NTF-Minting</span>
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
    </section>
  );
};

export default Minting;
