import "./Userinformation";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Input } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "../../../../redux/actions/userActions";

export default function Userinformation({}) {
  const [select, setSelect] = useState("");
  const [visible, setVisible] = useState(false);
  const [albumCoverImgFile, setAlbumCoverImgFile] = useState("");
  const [img, setImg] = useState("");
  const [checkedInputs, setCheckedInputs] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const metamask = useSelector((state) => state.metamask);

  useEffect(() => {
    const links = document.querySelectorAll(".user-nav .nav-links li");
    links.forEach((link) => {
      link.addEventListener("click", () => {
        links.forEach((link) => {
          link.classList.remove("active");
        });
        link.classList.add("active");
      });
    });
  }, []);

  function navlinkOnClick(e) {
    console.log(e.target);
  }

  const idonchange = (e) => {
    setSelect(e.target.value);
  };

  const NickNameOnClick = async () => {
    console.log(select);
    dispatch(updateUserData({ nickname: select }));
  };

  const formData = new FormData();

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
      .post("http://localhost:5000/users/changeimg", {
        address,
        downloadLink: newimg.downLoadLink,
      })
      .then((res) => {})
      .catch((err) => alert(err));
  };

  const changeHandler = (checked, value) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, value]);
    } else {
      setCheckedInputs(checkedInputs.filter((el) => el !== value));
    }
  };

  console.log(user);

  return (
    <div className="user-card">
      <div className="user-image">
        {user.img === "" ? (
          <Avatar alt="Remy Sharp" sx={{ width: 128, height: 128 }} />
        ) : (
          <Avatar
            alt="Remy Sharp"
            src={user.img}
            sx={{ width: 128, height: 128 }}
          />
        )}
        {/* 버튼 클릭 클릭시 setVisible로 state 변경*/}
        {visible && (
          <div>
            <button onClick={Submit}>User info edit Complete</button>
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
      <div className="user-info">
        <h2 className="nickname">Nickname</h2>

        {visible ? (
          <div>
            <Input
              inputProps={{ style: { fontSize: 30 } }}
              type="text"
              sx={{ width: 400 }}
              onChange={idonchange}
              defaultValue={user.nickname}
            />
          </div>
        ) : (
          <p>{user.nickname}</p>
        )}
        <h2 className="address">Address</h2>
        <span>{metamask.accounts[0]}</span>
        <h2 className="subscription">Subscription</h2>
        <span>{user.subscription}월이용권 </span>
        <h2 className="Genre">Genre</h2>
        {visible ? (
          <div>
            {user.genre.map((MusicType, index) => {
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
                      checked={checkedInputs.includes(MusicType) ? true : false}
                    />
                  </label>
                </>
              );
            })}
          </div>
        ) : (
          <span>{user.genre}</span>
        )}
      </div>
      {/* 셋팅 버튼을 눌렀을때 user에대한 새팅을 할수 있는 렌더 내용이 나와야된다. */}
      <div className="setting-btn">
        <button
          className="uil uil-setting"
          onClick={async () => {
            setVisible(!visible);
            await NickNameOnClick();
          }}
        ></button>
      </div>
    </div>
  );
}
