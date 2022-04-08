import "./Userinformation.css";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

export default function Userinformation({ address }) {
  //내가 바꾸고 싶은 닉네임 선택
  const [select, setSelect] = useState("");
  //and 연산자를 사용하기위한 useState input을 숨기기위한 조건문
  const [visible, setVisible] = useState(false);
  //내사진 변경을 위한 클릭 hidden 버튼 생성
  const [albumCoverImgFile, setAlbumCoverImgFile] = useState("");
  const [img, setImg] = useState("");
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
  const [checkedInputs, setCheckedInputs] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  //TODO: user info(address, nickname, myfavorite, ...),
  useEffect(() => {
    const links = document.querySelectorAll(".user-nav .nav-links li");
    links.forEach((link) => {
      link.addEventListener("click", () => {
        // 이전에 active 된 메뉴 삭제
        links.forEach((link) => {
          link.classList.remove("active");
        });
        // 지금 클릭한 메뉴 active
        link.classList.add("active");
      });
    });
  }, []);

  function navlinkOnClick(e) {
    console.log(e.target);
  }

  //내가 input창에서 변한값을 넣어줄 함수
  const idonchange = (e) => {
    console.log(e.target.value);
    setSelect(e.target.value);
  };

  //내가 닉네임의 내용을 변환할 때 부르는 함수
  const NickNameOnClick = async () => {
    const url = "http://localhost:5000/users/change";
    const response = await axios.post(url, { address, select, checkedInputs });
    return console.log(response.data);
  };

  //////////////////////////////////////////////////////////////////////////////////////////
  //S3에 보내는데이터는 formData에 담아서 보내야한다.
  const formData = new FormData();

  const postImg = async () => {
    //multer하고 s3저장후 링크가져오기
    formData.append("img", img);
    const url = "http://localhost:5000/files/imgupload";
    const result = await axios.post(url, formData); //formData multer가읽을수있다.
    return result.data;
  };

  const getImg = (e) => {
    setAlbumCoverImgFile(URL.createObjectURL(e.target.files[0])); //화면에 띄우는 img
    setImg(e.target.files[0]); //수정할 데이터 img 보낼꺼
  };

  const Submit = async () => {
    const newimg = await postImg();
    console.log(newimg);
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
      // 체크 해제
      setCheckedInputs(checkedInputs.filter((el) => el !== value));
    }
  };

  return (
    <div className="user-card">
      <div className="user-image">
        <img src={user.img} alt="user profile" />
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
        {user.nickname}
        {visible && (
          <div>
            <Input
              type="text"
              sx={{ width: 400 }}
              onChange={idonchange}
              value={user.nickname}
            ></Input>
          </div>
        )}
        <h2 className="address">Address</h2>
        <span>{address}</span>
        <h2 className="subscription">Subscription</h2>
        <span>{user.subscription}월이용권 </span>
        <h2 className="Genre">Genre</h2>
        <span>{user.genre}</span>
        {visible && (
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
                      checked={checkedInputs.includes(MusicType) ? true : false}
                    />
                  </label>
                </>
              );
            })}
          </div>
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
