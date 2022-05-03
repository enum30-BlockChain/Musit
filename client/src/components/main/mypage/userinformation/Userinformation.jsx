import "./Userinformation.css";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Button, Input } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "../../../../redux/actions/userActions";
import CountryType from "../../register/usersubmit/CountryType";

export default function Userinformation({}) {
  const [select, setSelect] = useState("");
  const [visible, setVisible] = useState(false);

  const [userImg, setUserImg] = useState("");
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
    setUserImg(URL.createObjectURL(e.target.files[0]));
    setImg(e.target.files[0]);
  };

  const changeHandler = (checked, value) => {
    if (checked) {
      if ([...checkedInputs, value].length >= 4) {
        return alert("3개까지만 check 해주세요");
      }
      setCheckedInputs([...checkedInputs, value]);
    } else {
      setCheckedInputs(checkedInputs.filter((el) => el !== value));
    }
  };

  ///////////////////////////////////////////////////////////////

  const [genre, setgenre] = useState([
    "Pop",
    "K-pop",
    "Classic",
    "Jazz",
    "Trot",
    "Hip-pop",
    "CCM",
    "Ballad",
    "Contry ",
    "Folk ",
    "Reggae",
    "Disco",
    "Rock",
    "Electronic",
    "Dance",
    "R&B",
  ]);

  const sliceAddress =
    metamask.accounts[0] &&
    metamask.accounts[0].slice(0, 5) + "..." + metamask.accounts[0].slice(-4);
  return (
    <div className="userinfo-layout">
      <div className="userinfo-card">
        <div className="userinfo-image">
          <Avatar
            alt="Remy Sharp"
            src={userImg ? userImg : user.img}
            sx={{ mx: "auto", width: 310, height: 310 }}
          />
          {/* 버튼 클릭 클릭시 setVisible로 state 변경*/}
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
        <div className="userinfo-info">
          <div className="nickname-box">
            <h2 className="nickname">Nickname</h2>
            {visible ? (
              <div>
                <Input
                  inputProps={{ style: { fontSize: 30 } }}
                  type="text"
                  sx={{ width: 300 }}
                  defaultValue={user.nickname}
                  onChange={idonchange}
                />
              </div>
            ) : (
              <h3>{user.nickname}</h3>
            )}
          </div>

          <div className="address-box">
            <h2 className="address">Address</h2>
            <h3>{sliceAddress}</h3>
          </div>

          <div className="nation-box">
            {visible ? (
              <div>
                <h2 className="Nation"> Nation : {user.nation}</h2>
                <CountryType
                  inputProps={{ width: "400px" }}
                  setSelected={setSelected}
                />
              </div>
            ) : (
              <div>
                <h2 className="Nation"> Nation</h2>
                <h3>{user.nation}</h3>
              </div>
            )}
          </div>

          <div className="genre-box" style={{ display: "block" }}>
            <h2 className="userinfo-Genre">Genre</h2>

            {visible ? (
              <div className="type-container">
                {genre.map((MusicType, index) => {
                  return (
                    <div key={index} className="type-box">
                      <label>
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
                        {MusicType}
                      </label>
                    </div>
                  );
                })}
              </div>
            ) : (
              <h3>{user.genre.join(", ")}</h3>
            )}
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
                    await ChangeUser();
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
  );
}
