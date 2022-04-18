import "./Userinformation.css";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Button, Input } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "../../../../redux/actions/userActions";
import CountryType from "../../register/CountryType";

export default function Userinformation({}) {
  const [select, setSelect] = useState("");
  const [visible, setVisible] = useState(false);
  const [albumCoverImgFile, setAlbumCoverImgFile] = useState("");
  const [img, setImg] = useState("");
  const [checkedInputs, setCheckedInputs] = useState("");
  const [selected, setSelected] = useState("KS");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const metamask = useSelector((state) => state.metamask);

  const idonchange = (e) => {
    setSelect(e.target.value);
  };

  const BaseOnClick = async () => {
    setSelect(user.nickname);
    setSelected(user.nation);
    setCheckedInputs(user.genre);
    setImg(user.img);
  };

  const ChangeUser = async () => {
    let newImg = img !== user.img ? await postImg() : img;
    await dispatch(
      updateUserData({
        nickname: select,
        genre: checkedInputs,
        img: newImg,
        nation: selected,
      })
    );
  };
  const formData = new FormData();

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

  const changeHandler = (checked, value) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, value]);
    } else {
      setCheckedInputs(checkedInputs.filter((el) => el !== value));
    }
  };

  ///////////////////////////////////////////////////////////////

  const [genre, setgenre] = useState([
    "Pop",
    "K-pop",
    "Classical Music",
    "Jazz",
    "Trot",
    "Hip-pop",
    "CCM",
    "Ballad",
    "Contry Music",
    "Folk Music",
    "Reggae",
    "Disco",
    "Rock",
    "Electronic",
    "Dance",
  ]);

  const sliceAddress =
    metamask.accounts[0] &&
    metamask.accounts[0].substr(0, 5) +
      metamask.accounts[0].substr(metamask.accounts[0].length - 4, 4) +
      "...";

  return (
    <div className="userinfo-layout">
      <div className="userinfo-card">
        <div className="userinfo-image">
          {user.img === "" ? (
            <Avatar alt="Remy Sharp" sx={{ width: 300, height: 300 }} />
          ) : (
            <Avatar
              className="userinfo-image"
              alt="Remy Sharp"
              src={user.img}
              sx={{ width: 300, height: 300 }}
            />
          )}
          {/* 버튼 클릭 클릭시 setVisible로 state 변경*/}
          {visible && (
            <div>
              <input
                type="file"
                name="imgUpload"
                accept="image/*"
                onChange={getImg}
                // style="none"
              ></input>
              {albumCoverImgFile && (
                <img style={{ width: "100px" }} src={albumCoverImgFile}></img>
              )}
            </div>
          )}
        </div>
        <div className="userinfo-info">
          <h2 className="nickname">Nickname</h2>

          {visible ? (
            <div>
              <Input
                inputProps={{ style: { fontSize: 30 } }}
                type="text"
                sx={{ width: 400 }}
                defaultValue={user.nickname}
                onChange={idonchange}
              />
            </div>
          ) : (
            <p>{user.nickname}</p>
          )}
          <h2 className="address">Address</h2>
          <span>{metamask.accounts[0]}</span>
          <h2 className="subscription">Subscription</h2>
          <span>{user.subscription}월이용권 </span>
          {visible ? (
            <div>
              <CountryType
                inputProps={{ width: "400px" }}
                setSelected={setSelected}
              />
            </div>
          ) : (
            <div>
              <h2 className="Nation">Nation</h2>
              <p>국가 : {user.nation}</p>
            </div>
          )}
          <h2 className="userinfo-Genre">Genre</h2>
          {visible ? (
            <div>
              {genre.map((MusicType, index) => {
                return (
                  <>
                    <label>
                      {MusicType}
                      <input
                        type={"checkbox"}
                        name={"MusicType"}
                        value={MusicType}
                        onChange={(e) => {
                          changeHandler(e.currentTarget.checked, MusicType);
                        }}
                        checked={
                          checkedInputs.includes(MusicType) ? true : false
                        }
                      />
                    </label>
                  </>
                );
              })}
            </div>
          ) : (
            <span>{user.genre}</span>
          )}

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
                await ChangeUser();
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
          <div className="setting-btn"></div>
        </div>
      </div>
    </div>
  );
}
