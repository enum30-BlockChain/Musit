import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import {
  readLikeArtistDetail,
  toggleLikeArtist,
} from "../../../../../redux/actions/artistActions";
import "../css/LikeCard.css";
import usernull from "./usernull.png";

const LikeCard = ({ data, setArtistModal }) => {
  const [TotalLike, setTotalLike] = useState("");
  const [artistlike, setArtistlike] = useState("");
  const dispatch = useDispatch();

  const likeArtistDetail = useSelector((state) => state.likeArtistDetail);

  // 파업창 띄워주는 것
  const postInfo = async () => {
    await dispatch(readLikeArtistDetail(data.user_address));
    if (likeArtistDetail.loding == true) {
      return setArtistModal(likeArtistDetail);
    } else if (likeArtistDetail !== "") {
      return setArtistModal(likeArtistDetail);
    }
  };

  const likeOnclick = async () => {
    dispatch(toggleLikeArtist(data.artist_name));
    alert("좋아요를 취소하였습니다.");
  };

  return (
    <>
      <div className="item-card">
        <div className="img-box" onClick={postInfo}>
          {data.img === "" ? (
            <img src={usernull} className="register-avatar" />
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
          </div>
        </div>
      </div>
    </>
  );
};

export default LikeCard;
