import "./Artist.css";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import Artistinfo from "./artistinfo/Artistinfo";

export const Artist = () => {
  function navlinkOnClick(e) {
    console.log(e.target);
  }

  const idonchange = (e) => {
    setSelect(e.target.value);
  };

  const NickNameOnClick = async () => {
    if (select === "") {
      setSelect(artist.artist_name);
    }
    const newimg = await postImg();
    await dispatch(updateArtistData({ artist_name: select, img: newimg }));
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

  return (
    <>
      <div className="artistpage">
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
