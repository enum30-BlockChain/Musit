import React, { useEffect, useState } from "react";
import axios from "axios";

const MyArtist = ({ address }) => {
  const [albumCoverImgFile, setAlbumCoverImgFile] = useState("");
  const [img, setImg] = useState("");
  const [nickname, setNickname] = useState("");
  const [totallike, setTotalLike] = useState("");
  const [music, setMusic] = useState("");
  const [song, setSong] = useState();
  const [artists, setArtists] = useState("");
  const [contents, setContents] = useState({
    cover_img_link: img,
    artist_name: nickname,
  });

  //내가 바꾸고 싶은 닉네임 선택
  const [select, setSelect] = useState("");

  //내가 최근 재생했던 목록 선택
  const [search, setSearch] = useState("");

  //and 연산자를 사용하기위한 useState input을 숨기기위한 조건문
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const init = async () => {
      const url = "http://localhost:5000/artists/signin";
      const response = await axios.post(url, { address });
      setNickname(response.data.artist_name);
    };
    const artistimg = async () => {
      const url = "http://localhost:5000/artists/img";
      const response = await axios.post(url, { address });
      setArtists(response.data);
    };
    artistimg();
    init();
    return () => {};
  }, [address]);

  const IdOnChange = (e) => {
    setSelect(e.target.value);
  };

  const NickNameOnClick = () => {
    const url = "http://localhost:5000/artists/change";
    const response = axios.post(url, { address, select }).then((res) => {});
  };

  const TotalLikeOnClick = () => {
    const url = "http://localhost:5000/artists/like";
    const response = axios.post(url, { address }).then((res) => {
      setTotalLike(res.data);
    });
  };

  const SearchMusicOnClick = () => {
    const url = "http://localhost:5000/artists/music";
    const response = axios.post(url, { address, nickname }).then((res) => {
      setMusic(res.data);
    });
  };

  const RecentedOnClick = () => {
    const url = "http://localhost:5000/artists/played";
    const response = axios.post(url, { address }).then((res) => {
      setSong(res.data);
    });
  };

  const formData = new FormData();

  const postImg = async () => {
    //multer하고 s3저장후 링크가져오기
    if (img === albumCoverImgFile) {
      return albumCoverImgFile;
    } else if (img !== albumCoverImgFile) {
      formData.append("img", img);
      await axios
        .post("http://localhost:5000/files/imgupload", formData) //formData multer가읽을수있다.
        .then((res) => (contents.cover_img_link = res.data.downLoadLink))
        .catch((err) => alert(err));
      return contents;
    }
  };

  const getImg = (e) => {
    setAlbumCoverImgFile(URL.createObjectURL(e.target.files[0])); //화면에 띄우는 img
    setImg(e.target.files[0]); //수정할 데이터 img 보낼꺼
  };

  const Submit = async () => {
    await postImg();
    await axios
      .post("http://localhost:5000/files/modify", contents)
      .then((res) => {})
      .catch((err) => alert(err));
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <div>나의 주소는 : {address}</div>
      <div>
        내사진 : <img src={artists.img} style={{ width: "100px" }} />
      </div>
      <div>
        나의 닉네임 : {nickname}
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
      <div>
        <button onClick={TotalLikeOnClick}>총 좋아요</button>
        <div>{totallike.length}</div>
      </div>
      <div>
        <button onClick={SearchMusicOnClick}>등록한음원조회</button>
      </div>
      <div>가수이름 : {music.artist_name}</div>
      <div>음악제목 : {music.title}</div>
      <div>플레이 수 : {music.play_count}</div>
      <div>음악 총 길이 : {music.play_time}</div>

      <div>곡별 재생시간</div>
      <div>총 재생시간</div>
      <div>청취 곡수</div>
      <div>
        <button onClick={RecentedOnClick}>최근 재생목록</button>
      </div>
      <div>My favorite</div>
      <div>나의 재생목록</div>

      <div>
        <button onClick={Submit}>이미지넣기</button>
        <div>
          <p>img</p>
          <input
            name="imgUpload"
            type="file"
            accept="image/*"
            onChange={getImg}
          />
        </div>
      </div>
    </>
  );
};

export default MyArtist;
