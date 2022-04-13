import React, { useState } from "react";
import axios from "axios";

function Modal({ props, onClose }) {
  console.log(props)
  const [albumCoverImgFile, setAlbumCoverImgFile] = useState(props.img_file);
  const [img, setImg] = useState("");
  const [musicTitle, setMusicTitle] = useState(props.title);
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
  "Dance",]);
  const [checkedInputs, setCheckedInputs] = useState(props.Genre.split(","));
  const [contents, setContents] = useState({
    cover_img_link: props.img_file,
    music_link: props.ipfs_hash,
    title: props.title,
    artist_name: props.artist_name,
    count: props.play_count,
    genre: "",
  });

  const formData = new FormData();

  const postImg = async () => {
    //multer하고 s3저장후 링크가져오기
    if (props.img_file === albumCoverImgFile) {
      console.log("바뀐게없네");
      return albumCoverImgFile;
    } else if (props.img_file !== albumCoverImgFile) {
      formData.append("img", img);
      await axios
        .post("http://localhost:5000/files/upload/img", formData) //formData multer가읽을수있다.
        .then((res) => (contents.cover_img_link = res.data.downLoadLink))
        .catch((err) => alert(err));
      return contents;
    }
  };

  const changeHandler = (checked, value) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, value]);
    } else {
      // 체크 해제
      setCheckedInputs(checkedInputs.filter((el) => el !== value));
    }
  };
  const changeTitle = (e) => {
    setMusicTitle(e.target.value);
  };
  const getImg = (e) => {
    setAlbumCoverImgFile(URL.createObjectURL(e.target.files[0])); //화면에 띄우는 img
    setImg(e.target.files[0]); //수정할 데이터 img 보낼꺼
  };

  const Submit = async () => {
    contents.music_title = musicTitle;
    contents.genre = checkedInputs;
    await postImg();
    console.log(contents);
    await axios
      .post("http://localhost:5000/files/modify", contents)
      .then((res) => {
        console.log(res);
        if ((res.data.result = 0)) {
          // alert(res.data.message);
          window.location.href = "/musicsearch";
        } else if ((res.data.result = 2)) {
          alert(res.data.message);
          window.location.href = "/musicsearch";
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <div
      className="modal"
      style={{ background: "yellow", width: "500px", height: "500px" }}
    >
      <button onClick={onClose}>창닫기</button>
      <p>music_title</p>
      <div>
        <input value={musicTitle} onChange={changeTitle} />
      </div>
      <p>artist_name</p>
      <div>
        <input value={contents.artist_name} disabled />
      </div>
      <div>
        <p>img</p>
        <input
          name="imgUpload"
          type="file"
          accept="image/*"
          onChange={getImg}
        />
        {albumCoverImgFile && (
          <img style={{ width: "100px" }} src={albumCoverImgFile}></img>
        )}
        <p>audio</p>
        <audio
          src={`https://ipfs.io/ipfs/${contents.music_link}`}
          on
          autoplay
          loop
          controls
        ></audio>
        <p>genre</p>
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
      <button onClick={Submit}>수정완료~</button>
    </div>
  );
}

export default Modal;
