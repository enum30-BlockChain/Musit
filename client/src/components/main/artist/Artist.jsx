import "./Artist.css";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchArtistData } from "../../../redux/artist/artistAction";

export const Artist = ({ address }) => {
  const [select, setSelect] = useState("");
  const [visible, setVisible] = useState(false);
  const [albumCoverImgFile, setAlbumCoverImgFile] = useState("");
  const [img, setImg] = useState("");

  const formData = new FormData();
  const artist = useSelector((state) => state.artist);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArtistData(address));
  }, []);

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
          {/* 내이미지공간 */}
          <div className="artist-image">
            {/* 현재 이미지 불러오기 */}
            <img src={artist.img} alt="artist profile" />
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
            {artist.artist_name}
            {visible && (
              <div>
                <input type="text" onChange={idonchange}></input>
              </div>
            )}
            <h2 className="address">Address</h2>
            <span>{address}</span>
            <h2 className="likes">Like</h2>
            <span>좋아요 : {artist.likes} </span>
            <h2 className="subscription">Subscription</h2>
            {/* <span>{loginState.subscription}월이용권 </span> */}
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
                <span className="link-name">Artists</span>
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
