import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Input } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateMusicList } from "../../../../../redux/actions/musicActions";
import { useNavigate } from "react-router-dom";
import { readArtistData } from "../../../../../redux/actions/artistActions";
import Checkbox from "@mui/material/Checkbox";
function Modal(props) {
  const dispatch = useDispatch();
  const [albumCoverImgFile, setAlbumCoverImgFile] = useState(
    props.music.img_file
  );
  const [img, setImg] = useState("");
  const [musicTitle, setMusicTitle] = useState(props.music.title);
  const navigate = useNavigate();
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
  const [checkedInputs, setCheckedInputs] = useState(props.music.genre);
  const [contents, setContents] = useState({
    img_file: props.music.img_file,
    title: props.music.title,
    artist_name: props.music.artist_name,
    play_count: props.music.play_count,
    genre: "",
  });

  const formData = new FormData();

  const postImg = async () => {
    //multer하고 s3저장후 링크가져오기
    if (props.music.img_file === albumCoverImgFile) {
      return albumCoverImgFile;
    } else if (props.img_file !== albumCoverImgFile) {
      formData.append("img", img);
      await axios
        .post("http://54.180.145.5/files/upload/img", formData) //formData multer가읽을수있다.
        .then((res) => (contents.img_file = res.data))
        .catch((err) => alert(err));
      return contents;
    }
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
  const changeTitle = (e) => {
    setMusicTitle(e.target.value);
  };
  const getImg = (e) => {
    setAlbumCoverImgFile(URL.createObjectURL(e.target.files[0])); //화면에 띄우는 img
    setImg(e.target.files[0]); //수정할 데이터 img 보낼꺼
  };

  const Submit = async () => {
    contents.title = musicTitle;
    contents.genre = checkedInputs;
    await postImg();
    await dispatch(updateMusicList(contents, props.music.ipfs_hash));
    await dispatch(readArtistData());
  };

  return (
    <Box
      className="modal"
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        backgroundColor: "var(--content-bg-color2)",
        position: "fixed",
        top: "25%",
        left: "40%",
        width: "550px",
        height: "600px",
      }}
    >
      <Box sx={{ display: "flex" }}>
        {albumCoverImgFile && (
          <img
            align="middle"
            style={{ width: "260px" }}
            src={albumCoverImgFile}
          ></img>
        )}

        <Box sx={{ display: "inline-block" }}>
          <Box sx={{ width: "100%", fontSize: 35, my: 4, ml: 4 }}>
            <p>Music Title</p>
            <Input
              sx={{ width: "100%" }}
              value={musicTitle}
              onChange={changeTitle}
            />
          </Box>

          <Box sx={{ width: "100%", fontSize: 35, my: 2, ml: 4 }}>
            <p>Artist Name</p>
            <div>
              <Input
                sx={{ width: "100%" }}
                value={contents.artist_name}
                disabled
              />
            </div>
          </Box>
        </Box>
      </Box>
      <Input
        sx={{ display: "flex", width: "45%", mt: 2 }}
        name="imgUpload"
        type="file"
        accept="image/*"
        onChange={getImg}
      />
      <div>
        <audio
          style={{ width: "100%", marginTop: "20px", height: "50px" }}
          src={`https://ipfs.infura.io/ipfs/${props.music.ipfs_hash}`}
          controls
        ></audio>
        <Box sx={{ width: "100%", fontSize: 25, mb: 2, ml: 1 }}>
          <p>genre</p>
        </Box>
        <Box
          flexWrap="wrap"
          justifyContent="flex-start"
          sx={{
            ml: "7%",
            width: "100%",
            display: "flex",
          }}
        >
          {genre.map((MusicType, index) => {
            return (
              <Box
                key={index}
                sx={{
                  width: "25%",
                  textAlign: "left",
                }}
              >
                <label>
                  <Checkbox
                    sx={{ m: 0, p: 0 }}
                    type={"checkbox"}
                    name={"MusicType"}
                    value={MusicType}
                    onChange={(e) => {
                      changeHandler(e.currentTarget.checked, MusicType);
                    }}
                    checked={checkedInputs.includes(MusicType) ? true : false}
                  />
                  {MusicType}
                </label>
              </Box>
            );
          })}
        </Box>
      </div>
      <Button
        sx={{
          mt: 2,
          width: 300,
          color: "var(--black-light-color)",
          backgroundColor: "var(--box1-color)",
          ":hover": {
            background: "var(--primary-color)",
            color: "var(--text-color)",
          },
        }}
        onClick={Submit}
      >
        Edit Complete~
      </Button>
      <Button
        sx={{
          mt: 2,
          ml: 2,
          width: 100,
          color: "var(--black-light-color)",
          backgroundColor: "var(--box1-color)",
          ":hover": {
            background: "var(--primary-color)",
            color: "var(--text-color)",
          },
        }}
        onClick={() => {
          props.setMusicEditModal(false);
        }}
      >
        close
      </Button>
    </Box>
  );
}

export default Modal;
