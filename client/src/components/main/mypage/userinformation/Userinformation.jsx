import "./Userinformation";

import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { Input } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

export default function Userinformation({}) {
  //내가 바꾸고 싶은 닉네임 선택
  const [select, setSelect] = useState("");
  //and 연산자를 사용하기위한 useState input을 숨기기위한 조건문
  const [visible, setVisible] = useState(false);
  //내사진 변경을 위한 클릭 hidden 버튼 생성
  const [albumCoverImgFile, setAlbumCoverImgFile] = useState("");
  const [img, setImg] = useState("");
  const [checkedInputs, setCheckedInputs] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const MetamaskData = useSelector((state) => state.MetamaskData);

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

  console.log(MetamaskData);

  return <div className="user-card"></div>;
}
