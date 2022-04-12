import "./Artist.css";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { updateArtistData } from "../../../redux/actions/artistActions";

export const Artist = () => {
  const [select, setSelect] = useState("");
  const [visible, setVisible] = useState(false);
  const [albumCoverImgFile, setAlbumCoverImgFile] = useState("");
  const [img, setImg] = useState("");

  const formData = new FormData();
  const artist = useSelector((state) => state.artist);
  const metamask = useSelector((state) => state.metamask);

  const dispatch = useDispatch();

  function navlinkOnClick(e) {
    console.log(e.target);
  }

  const idonchange = (e) => {
    setSelect(e.target.value);
  };

  const NickNameOnClick = async () => {
    if (select === "") {
      setSelect(user.nickname);
    }
    const newimg = await postImg();
    await dispatch(updateArtistData({ artist_name: select, img: newimg }));
  };

  const postImg = async () => {
    if (img !== "") {
      formData.append("img", img);
      const url = "http://localhost:5000/files/imgupload";
      const result = await axios.post(url, formData);
      return result.data;
    }
  };

  const getImg = (e) => {
    setAlbumCoverImgFile(URL.createObjectURL(e.target.files[0]));
    setImg(e.target.files[0]);
  };

  return (
    <>
      <div className="artistpage">
        <div className="artist-card">
          <div className="artist-image">
            {artist.img === "" ? (
              <Avatar alt="Remy Sharp" sx={{ width: 128, height: 128 }} />
            ) : (
              <Avatar
                alt="Remy Sharp"
                src={artist.img}
                sx={{ width: 128, height: 128 }}
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
            <button
              className="uil uil-setting"
              onClick={async () => {
                setVisible(!visible);
                await NickNameOnClick();
              }}
            ></button>
          </div>
        </div>
        <nav className="artist-nav">
          <ul className="nav-links" onClick={navlinkOnClick}>
            <li>
              <Link to="/artist/list">
                <i className="uil uil-favorite"></i>
                <span className="link-name">Artists</span>
              </Link>
            </li>
            <li>
              <Link to="/artist/album">
                <i className="uil uil-favorite"></i>
                <span className="link-name">album</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="detail">
          <Outlet />
        </div>
      </div>
    </>
  );
};
