import "./Artistinfo.css";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateArtistData } from "../../../../redux/actions/artistActions";
import { Avatar, Button } from "@mui/material";

export default function Artistinfo() {
  const [select, setSelect] = useState("");
  const [visible, setVisible] = useState(false);
  const [albumCoverImgFile, setAlbumCoverImgFile] = useState("");
  const [img, setImg] = useState("");

  const formData = new FormData();
  const artist = useSelector((state) => state.artist);
  const metamask = useSelector((state) => state.metamask);

  const dispatch = useDispatch();

  const idonchange = (e) => {
    setSelect(e.target.value);
  };

  const BaseOnClick = async () => {
    setSelect(artist.artist_name);
    setImg(artist.img);
  };

  const NickNameOnClick = async () => {
    let newImg = img !== artist.img ? await postImg() : img;
    await dispatch(updateArtistData({ artist_name: select, img: newImg }));
  };

  const postImg = async () => {
    if (img !== "") {
      formData.append("img", img);
      const url = "http://localhost:5000/files/upload/img";
      const result = await axios.post(url, formData);
      return result.data;
    }
  };

  const getImg = (e) => {
    setAlbumCoverImgFile(URL.createObjectURL(e.target.files[0]));
    setImg(e.target.files[0]);
  };

  console.log(img);

  return (
    <>
      <div className="artistpage">
        <div className="artist-card">
          <div className="artist-image">
            {artist.img === "" ? (
              <Avatar alt="Remy Sharp" sx={{ width: 260, height: 260 }} />
            ) : (
              <Avatar
                alt="Remy Sharp"
                src={artist.img}
                sx={{ width: 260, height: 260 }}
              />
            )}
            {visible && (
              <div>
                <input
                  type="file"
                  name="imgUpload"
                  accept="image/*"
                  onChange={getImg}
                ></input>
                {albumCoverImgFile && (
                  <img style={{ width: "100px" }} src={albumCoverImgFile}></img>
                )}
              </div>
            )}
          </div>
          <div className="artist-info">
            <h2 className="nickname">ArtistName</h2>
            {artist.artist_name}
            {visible && (
              <div>
                <input type="text" onChange={idonchange}></input>
              </div>
            )}
            <h2 className="address">Address</h2>
            <span>{metamask.accounts[0]}</span>
            <h2 className="likes">Like</h2>
            <span>좋아요 : {artist.likes} </span>
            {visible ? (
              <Button
                variant="contained"
                sx={{
                  color: "var(--black-light-color)",
                  backgroundColor: "var(--box1-color)",
                  ":hover": {
                    background: "var(--primary-color)",
                    color: "var(--text-color)",
                  },
                }}
                onClick={async () => {
                  setVisible(!visible);
                  await NickNameOnClick();
                }}
              >
                Submit
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{
                  color: "var(--black-light-color)",
                  backgroundColor: "var(--box1-color)",
                  ":hover": {
                    background: "var(--primary-color)",
                    color: "var(--text-color)",
                  },
                }}
                onClick={async () => {
                  setVisible(!visible);
                  await BaseOnClick();
                }}
              >
                Edit
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
