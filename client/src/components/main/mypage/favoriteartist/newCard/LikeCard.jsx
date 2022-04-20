import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import { toggleLikeArtist } from "../../../../../redux/actions/artistActions";
import "../css/LikeCard.css";

const LikeCard = ({ data, setArtistModal, artistModal }) => {
  const [TotalLike, setTotalLike] = useState();
  const [artistlike, setArtistlike] = useState("");
  const likeArtist = useSelector((state) => state.likeArtist).data;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!likeArtist.loading) {
      setArtistlike(
        likeArtist.filter((artist) => {
          return artist.artist_name.indexOf(data.artist_name) > -1;
        })
      );
    }
  }, [likeArtist]);

  // 파업창 띄워주는 것
  const postInfo = () => {
    setArtistModal(data);
  };

  const likeOnclick = async () => {
    dispatch(toggleLikeArtist(data.artist_name));
    alert("좋아요를 취소하였습니다.");
  };

  const TotalCount = data.Music.map((e) => e.play_count) //play총합
    .reduce((prev, curr) => prev + curr, 0);

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
            <img src={data.img} />
          )}
        </div>
        <div className="content-wrap">
          <div className="color-box">
            <h1>
              <FavoriteBorderIcon
                onClick={() => {
                  likeOnclick();
                  setTotalLike(TotalLike + 1);
                  setArtistlike(1);
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
              <h2>Artist</h2>
              <h1>{data.artist_name}</h1>
            </div>
            <div className="content">
              <h2>Likes</h2>
              <h1>{data.likes}</h1>
            </div>
          </div>
          <div className="content-box">
            <div className="content">
              <h2>UPLOAD MUSIC</h2>
              <h1>{data.Music.length}</h1>
            </div>
            <div className="content">
              <h2>TOTAL PLAY COUNT</h2>
              <h1>{TotalCount}</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LikeCard;
