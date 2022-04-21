import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import { toggleLikeMusic } from "../../../../redux/actions/musicActions";
import "./css/MusicCard.css";

const MusicCard = ({ data, setArtistModal }) => {
  const [TotalLike, setTotalLike] = useState();
  const [musiclike, setMusicLike] = useState("");

  const likeMusic = useSelector((state) => state.likeMusic).data;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!likeMusic.loading) {
      setMusicLike(
        likeMusic.filter((artist) => {
          return artist.artist_name.indexOf(data.artist_name) > -1;
        })
      );
    }
  }, [likeMusic]);

  // 파업창 띄워주는 것
  const postInfo = () => {
    setArtistModal(data);
  };

  const likeOnclick = async () => {
    dispatch(toggleLikeMusic(data));
    alert("좋아요를 취소하였습니다.");
  };

  const sliceTitle = data.title && data.title.substr(0, 10) + "...";

  return (
    <>
      <div className="item-card">
        <div className="img-box" onClick={postInfo}>
          {data.img === "" ? (
            <Avatar
              className="register-avatar"
              alt="Remy Sharp"
              sx={{ width: 165, height: 160 }}
            />
          ) : (
            <img src={data.img_file} />
          )}
        </div>
        <div className="content-wrap">
          <div className="color-box">
            <h1>
              <FavoriteBorderIcon
                onClick={() => {
                  likeOnclick();
                  setTotalLike(TotalLike + 1);
                  setMusicLike(1);
                }}
                sx={{ mr: 0.5 }}
                cursor="pointer"
                fontSize="large"
                style={{ position: "absolute", right: "0px" }}
              />
            </h1>
          </div>
          <div className="content-box">
            <div className="content">
              <h2>Title</h2>
              <h1>{sliceTitle}</h1>
            </div>
          </div>
          <div className="content-box">
            <div className="content">
              <audio
                src={`https://ipfs.infura.io/ipfs/${data.ipfs_hash}`}
                controls
              ></audio>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicCard;
