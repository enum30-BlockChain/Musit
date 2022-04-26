import { Button, Skeleton } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { readMusicData } from "../../../redux/actions/musicActions";
import { mintingMusitNFT } from "../../../redux/actions/contractActions";
import "./Minting.css";

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
    
    <section className="minting-layout">
      <div className="content-box minting-img-box">
        <h2>Album Cover Image</h2>
        <Skeleton
          width={400}
          height={400}
          sx={{ marginTop: "20px" }}
          variant="circular"
        />
      </div>

      <div className="minting-content-container">
        <div className="content-box title-box">
          <h2 className="title">Title</h2>
          <Skeleton width={400} height={50} variant="text" />
        </div>
        <div className="content-box audio-box">
          <h2 className="title">Audio</h2>
          <Skeleton width={400} height={50} variant="text" />
        </div>
        <div className="content-box description-box">
          <h2 className="title">Description</h2>
          <Skeleton width={400} height={200} variant="text" />
        </div>
      </div>
    </section>
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
      <div className="minting-margin">
        <div className="minting-title">
          <i className="uil uil-capture"></i>
          <span className="text-minting"> NTF-Minting</span>
        </div>
        <div className="mintig-input">
          <div className="content-box-minting-img-box">
            <div>
              <span className="minitng-imgcover">Album Cover Image</span>
            </div>
            <img src={musicData.img_file} />
          </div>

          <div className="minting-content-container">
            <div className="content-box title-box">
              <span className="title-minting">Title</span>
              <p className="content">{musicData.title}</p>
            </div>
            <div className="content-box audio-box">
              <span className="title">Audio</span>
              <audio
                src={`https://ipfs.infura.io/ipfs/${ipfs_hash}`}
                controls
              />
            </div>
            <div className="content-box description-box">
              <span className="title">Description</span>
              <span className="content">{musicData.description}</span>
              <div className="minting-btn">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Minting;
