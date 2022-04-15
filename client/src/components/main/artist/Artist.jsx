import "./Artist.css";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import Artistinfo from "./artistinfo/Artistinfo";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button } from "@mui/material";
import { updateArtistData } from "../../../redux/actions/artistActions";

export const Artist = () => {
  function navlinkOnClick(e) {
    console.log(e.target);
  }

  const idonchange = (e) => {
    setSelect(e.target.value);
  };

  const NickNameOnClick = async () => {
    let newImg = img !== artist.img ? await postImg() : img;
    await dispatch(
      updateArtistData({
        artist_name: select,
        img: newImg,
      })
    );
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

  ////////////////////////////////////////////////////////////
  const BaseOnClick = async () => {
    setSelect(artist.artist_name);
    setImg(artist.img);
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
              <button
                className="uil uil-setting"
                onClick={async () => {
                  setVisible(!visible);
                  await BaseOnClick();
                }}
              />
            )}
          </div>
        </div>

        <nav className="artist-nav">
          <ul className="nav-links" onClick={navlinkOnClick}>
            <li>
              <Link to="/artist/artistdashbord">
                <i className="uil uil-favorite"></i>
                <span className="link-name">Artist Dashboard</span>
              </Link>
            </li>

            <li>
              <Link to="/artist/myupload">
                <i className="uil uil-favorite"></i>
                <span className="link-name">My Album</span>
              </Link>
            </li>
            <li>
              <Link to="/artist/auctionupload">
                <i className="uil uil-favorite"></i>
                <span className="link-name">Auction Upload</span>
              </Link>
            </li>
          </ul>
        </nav>
        <section className="artist-details">
          <div className="artist-detail1">
            <Artistinfo />
          </div>
          <div className="artist-detail2">
            <Outlet />
          </div>
        </section>
      </div>
    </>
  );
};
