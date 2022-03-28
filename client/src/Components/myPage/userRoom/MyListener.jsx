import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";

const MyListener = ({ address }) => {
  const [response, setResponse] = useState("");
  const [song, setSong] = useState();
  const [nickname, setNickname] = useState("");

  //내가 바꾸고 싶은 닉네임 선택
  const [select, setSelect] = useState("");

  //and 연산자를 사용하기위한 useState input을 숨기기위한 조건문
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const init = async () => {
      const url = "http://localhost:5000/users/signin";
      const response = await axios.post(url, { address });
      setResponse(response.data);
    };
    init();
    return () => {};
  }, [address]);

  const MusicOnClick = () => {
    const url = "http://localhost:5000/users/played";
    const response = axios.post(url, { address }).then((res) => {
      setSong(res.data);
    });
  };

  const IdOnChange = (e) => {
    setSelect(e.target.value);
  };

  const NickNameOnClick = () => {
    const url = "http://localhost:5000/users/change";
    const response = axios.post(url, { address, select }).then((res) => {});
  };

  ////////////////////////////////////////////////////////////////////

  //내사진 변경을 위한 클릭 hidden 버튼 생성
  const [imageChange, setImageChange] = useState(false);
  const [albumCoverImgFile, setAlbumCoverImgFile] = useState("");
  const [img, setImg] = useState("");

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

  const formData = new FormData();

  return (
    <>
      <sidebar>
        <div>
          <img src={response.img} style={{ width: "100" }} />
          {/* 버튼 클릭 클릭시 setVisible로 state 변경*/}
          <button
            onClick={() => {
              setImageChange(!imageChange);
            }}
          >
            {/* imageChange 취소나 닉네임에 따라 true false */}
            {imageChange ? "변경완료" : "내사진변경"}
          </button>
          {imageChange && (
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
              <button onClick={Submit}>올리기</button>
            </div>
          )}
        </div>

        <div>
          나의 닉네임 : {response.nickname}
          {/* 버튼 클릭 클릭시 setVisible로 state 변경*/}
          <button
            onClick={() => {
              NickNameOnClick();
              setVisible(!visible);
            }}
          >
            {/* visible 취소나 닉네임에 따라 true false */}
            {visible ? "변경완료" : "닉네임변경"}
          </button>
          {visible && (
            <div>
              <input type="text" onChange={IdOnChange}></input>
            </div>
          )}
        </div>

        <p>
          <Link to="/MyListener/UserSubscription">
            <button>UserSubscription</button>
          </Link>
        </p>
        <p>
          <Link to="/MyListener/UserList">
            <button>UserList</button>
          </Link>
        </p>
        <p>
          <Link to="/MyListener/myplaylist">
            <button>MyPlayList</button>
          </Link>
        </p>
        <p>
          <Link to="/MyListener/totalplaylist">
            <button>TotalPlayList</button>
          </Link>
        </p>
        <p>
          <Link to="/MyListener/recentlyplayed">
            <button onClick={MusicOnClick}>recentlyplayed</button>
          </Link>
        </p>
      </sidebar>
      <Outlet context={[address, response, setResponse, song]} />
    </>
  );
};

export default MyListener;
