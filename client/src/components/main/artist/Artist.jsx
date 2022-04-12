import "./Artist.css";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

export const Artist = () => {
  const [select, setSelect] = useState("");
  const [visible, setVisible] = useState(false);
  const [albumCoverImgFile, setAlbumCoverImgFile] = useState("");
  const [img, setImg] = useState("");

  const formData = new FormData();
  const artist = useSelector((state) => state.artist);
  const metamask = useSelector((state) => state.metamask);

  function navlinkOnClick(e) {
    console.log(e.target);
  }

  const idonchange = (e) => {
    console.log(e.target.value);
    setSelect(e.target.value);
  };

  const NickNameOnClick = async () => {
    const url = "http://localhost:5000/artists/change";
    const response = await axios.post(url, { address, select });
    return response.data;
  };

  const postImg = async () => {
    formData.append("img", img);
    const url = "http://localhost:5000/files/imgupload";
    const result = await axios.post(url, formData);
    return result.data;
  };

  const getImg = (e) => {
    setAlbumCoverImgFile(URL.createObjectURL(e.target.files[0]));
    setImg(e.target.files[0]);
  };

  const Submit = async () => {
    const newimg = await postImg();
    await axios
      .post("http://localhost:5000/artists/changeimg", {
        address,
        downloadLink: newimg.downLoadLink,
      })
      .then((res) => {})
      .catch((err) => alert(err));
  };

  return (
    <>
      <div className="artistpage">
        <div className="artist-card">
          <div className="artist-image">
            <img
              style={{ objectFit: "cover" }}
              src={artist.img}
              alt="artist profile"
            />
            {visible && (
              <div>
                <button onClick={Submit}>올리기</button>
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
              <Link to="/artist/artistdashbord">
                <i className="uil uil-favorite"></i>
                <span className="link-name">Artist Dashboard</span>
              </Link>
            </li>

            <li>
              <Link to="/artist/createnft">
                <i className="uil uil-favorite"></i>
                <span className="link-name">Create NFT</span>
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
        <div className="detail">
          <Outlet />
        </div>
      </div>
    </>
  );
};
