import "./Artist.css";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";

export const Artist = ({ address, artistState, loginState }) => {
  //내가 바꾸고 싶은 닉네임 선택
  const [select, setSelect] = useState("");
  //and 연산자를 사용하기위한 useState input을 숨기기위한 조건문
  const [visible, setVisible] = useState(false);
  //내사진 변경을 위한 클릭 hidden 버튼 생성
  const [albumCoverImgFile, setAlbumCoverImgFile] = useState("");
  const [image, setImage] = useState("");
  const [img, setImg] = useState("");

  //기존에 시작되면 artists의 어드레서로 유저어드레스를 찾아줘야했는데 필요없게됨
  // useEffect(() => {
  //   const UserImage = async () => {
  //     const url = "http://localhost:5000/artists/image";
  //     const response = await axios.post(url, { address });
  //     setImage(response.data);
  //   };
  //   UserImage();
  //   return () => {};
  // }, []);
  //useEffect사용할일 있으면 바로 쓰기위해 선언만
  useEffect(() => {}, []);

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
    const url = "http://localhost:5000/artists/change";
    const response = await axios.post(url, { address, select });
    return console.log(response.data);
  };

  ///////////////////////////////////////////////////////////////////////////////////

  //S3에 보내는데이터는 formData에 담아서 보내야한다.
  const formData = new FormData();

  const postImg = async () => {
    //multer하고 s3저장후 링크가져오기
    formData.append("img", img);
    const url = "http://localhost:5000/files/imgupload";
    const result = await axios.post(url, formData); //formData multer가읽을수있다.
    console.log(result);
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
      .post("http://localhost:5000/artists/changeimg", {
        address,
        downloadLink: newimg.downLoadLink,
      })
      .then((res) => {})
      .catch((err) => alert(err));
  };

  console.log(artistState);
  return (
    <>
      <div className="artistpage">
        <div className="artist-card">
          {/* 내이미지공간 */}
          <div className="artist-image">
            {/* 현재 이미지 불러오기 */}
            <img src={artistState.img} alt="artist profile" />
            {/* 버튼 클릭 클릭시 setVisible로 state 변경*/}
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
            {artistState.artist_name}
            {visible && (
              <div>
                <input type="text" onChange={idonchange}></input>
              </div>
            )}
            <h2 className="address">Address</h2>
            <span>{address}</span>
            <h2 className="likes">Like</h2>
            <span>좋아요 : {artistState.likes} </span>
            <h2 className="subscription">Subscription</h2>
            <span>{loginState.subscription}월이용권 </span>
          </div>
          {/* 셋팅 버튼을 눌렀을때 user에대한 새팅을 할수 있는 렌더 내용이 나와야된다. */}
          <div>
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
                <span className="link-name"> Artists</span>
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
