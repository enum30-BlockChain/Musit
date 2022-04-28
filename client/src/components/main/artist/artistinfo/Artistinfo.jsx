import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateArtistData } from "../../../../redux/actions/artistActions";
import { Avatar, Button, Input } from "@mui/material";
import "./Artistinfo.css";

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
      const url = "http://54.180.145.5/files/upload/img";
      const result = await axios.post(url, formData);
      return result.data;
    }
  };

  const getImg = (e) => {
    setAlbumCoverImgFile(URL.createObjectURL(e.target.files[0]));
    setImg(e.target.files[0]);
  };

  const sliceAddress =
    metamask.accounts[0] &&
    metamask.accounts[0].slice(0, 5) + "..." + metamask.accounts[0].slice(-4);

  return (
    <>
      <div className="artist-info-container">
        <div className="artist-card">
          <div className="artist-image">
            <Avatar
              alt="Remy Sharp"
              src={albumCoverImgFile ? albumCoverImgFile : artist.img}
              sx={{ mx: "auto", width: 310, height: 310 }}
            />
            {visible && (
              <div>
                <label className="input-Image" htmlFor="input-userimg">
                  Choose your Profile Image
                </label>
                <input
                  id="input-userimg"
                  type="file"
                  style={{ display: "none" }}
                  name="imgUpload"
                  accept="image/*"
                  onChange={getImg}
                  // style="none"
                ></input>
              </div>
            )}
          </div>

          <div className="artist-info">
            <div className="artistname-box">
              <h2 className="nickname">ArtistName</h2>
              {visible ? (
                <div>
                  <Input
                    inputProps={{ style: { fontSize: 30 } }}
                    type="text"
                    sx={{ width: 300 }}
                    defaultValue={artist.artist_name}
                    onChange={idonchange}
                  />
                </div>
              ) : (
                <h3>{artist.artist_name}</h3>
              )}
            </div>

            <div className="address-box">
              <h2 className="address">Address</h2>
              <h3>{sliceAddress}</h3>
            </div>

            <div className="like-box">
              <h2 className="likes">Likes</h2>
              <h3>{artist.likes} </h3>
            </div>

            <div className="setting-btn">
              {visible ? (
                <>
                  <Button
                    variant="contained"
                    sx={{
                      mx: 1,
                      width: 100,
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
                  <Button
                    variant="contained"
                    sx={{
                      mx: 1,
                      width: 100,
                      color: "var(--black-light-color)",
                      backgroundColor: "var(--box1-color)",
                      ":hover": {
                        background: "var(--primary-color)",
                        color: "var(--text-color)",
                      },
                    }}
                    onClick={async () => {
                      setVisible(!visible);
                    }}
                  >
                    cancel
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  sx={{
                    width: 100,
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
      </div>
    </>
  );
}
