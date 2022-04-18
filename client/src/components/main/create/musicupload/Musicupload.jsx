import "./Musicupload.css";
import { Button, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Createmain from "../Createmain";
import { useDispatch, useSelector } from "react-redux";
import { readArtistList } from "../../../../redux/actions/artistActions";
import { createMusicData } from "../../../../redux/actions/musicActions";
import { useNavigate } from "react-router-dom";
import Progress from "./progress/Progress";
import MessageHandler from "./progress/MessageHandler";

// const { create } = require("ipfs-http-client");

export const Musicupload = () => {
  const artistList = useSelector(state => state.artistList)
  const user = useSelector(state => state.user)
  const music = useSelector(state => state.music)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [genre, setGenre] = useState([
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
  const [checkedInputs, setCheckedInputs] = useState([]);
  const [albumCoverImgFile, setAlbumCoverImgFile] = useState("");
  const [audiofile, setaudiofile] = useState("");
  const [duration, setDuration] = useState("");
  const [musicTitle, setMusicTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tttttt, settttttt] = useState(false);
  const [DBdata, setDBdata] = useState({
    title: "",
    play_time: "",
    artist_name: "",
    genre: "",
    description: "",
  });
  const imgFormData = new FormData();
  const audioFormData = new FormData();

  const getImg = (e) => {
    setAlbumCoverImgFile(e.target.files[0]);
  };
  const getAudio = (e) => {
    setaudiofile(e.target.files[0]);
  };
  const getTitle = (e) => {
    setMusicTitle(e.target.value);
  };
  const getDescription = (e) => {
    setDescription(e.target.value);
  };

  const changeHandler = (checked, value) => {
    if (checked) {
      if ([...checkedInputs, value].length >= 4) {
        return alert("3개까지만 check 해주세요");
      }
      setCheckedInputs([...checkedInputs, value]);
    } else {
      // 체크 해제
      setCheckedInputs(checkedInputs.filter((el) => el !== value));
    }
  };

  const isValidDBdata = () => {
    if (DBdata.artist_name === "") {
      alert("로그인을 해주세요");
      return false;
    } else if (albumCoverImgFile === "") {
      alert("앨범파일 넣어주세요");
      return false;
    } else if (audiofile === "") {
      alert("오디오파일 넣어주세요");
      return false;
    } else if (musicTitle === "") {
      alert("노래제목을 넣어주세요");
      return false;
    } else if (description === "") {
      alert("description 넣어주세여");
      return false;
    } else if (checkedInputs.length == 0) {
      alert("장르를 체크해주세요");
      return false;
    }
    return true;
  };

  const submit = async () => {
    imgFormData.append("img", albumCoverImgFile);
    audioFormData.append("audio", audiofile);
    DBdata.play_time = duration;
    DBdata.title = musicTitle;
    DBdata.genre = checkedInputs;
    DBdata.description = description;
    await findArtist();
    if (isValidDBdata()) {
      await dispatch(createMusicData(imgFormData, audioFormData, DBdata))
      // navigate("/create", { state: musicTitle });
      await settttttt(true)
    }
    await settttttt(false)
  };
  
  const findArtist = async () => {
    artistList.data.map((a, index) => {
      if (a.user_address === user.address) {
        DBdata.artist_name = a.artist_name;
        return DBdata;
      }
    });
  };

  useEffect(() => {
    const init = async () => {
      await dispatch(readArtistList());
    };
    init();
  }, []);

  return (
    <>
         <MessageHandler test={tttttt}/>
      <h1 className="create-title">Create your music file</h1>
      <div className="create-layout">
        <div className="create-imgbox">
          <h2>Album Cover Image</h2>
          {albumCoverImgFile && (
            <img src={URL.createObjectURL(albumCoverImgFile)}></img>
          )}

          <div className="create-img-upload-btn">
            <label className="create-coverupload-btn" for="coverupload">
              Choose your cover image
            </label>
            <input
              id="coverupload"
              name="imgUpload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={getImg}
            />
          </div>
        </div>

        <div className="creae-inputbox">
          <h2>Music File</h2>
          <div className="upload-music">
            {audiofile && (
              <audio
                src={URL.createObjectURL(audiofile)}
                onLoadedData={(e) => {
                  setDuration(Math.floor(e.currentTarget.duration));
                  // console.log(e.currentTarget.duration);
                }}
                // onTimeUpdate= {(e) =>{
                //   console.log(e.currentTarget.currentTime)
                // }}
                autoplay
                loop
                controls
              >
                오디오 지원되지 않는 브라우저
              </audio>
            )}
          </div>
          <label className="create-file-btn" for="input-file">
            Music file Upload
          </label>
          <Input
            id="input-file"
            type="file"
            inputProps={{ accept: "audio/*" }}
            style={{ display: "none" }}
            onChange={getAudio}
            Address
            sx={{ width: 400 }}
          />

          <h2>Music Title</h2>
          <Input
            onChange={getTitle}
            value={musicTitle}
            sx={{ width: 400 }}
            inputProps={{ style: { fontSize: 30 } }}
            placeholder="Music Title"
          />
          <h2>Music Description</h2>
          <TextareaAutosize
            maxRows={4}
            aria-label="maximum height"
            placeholder="Fill your music description"
            style={{ width: 400, height: 80 }}
            onChange={getDescription}
          />
          {/* <input onchange={getDescription} value={musicDescription} /> */}
          <h2>Genre</h2>
          <form>
            {genre.map((MusicType, index) => {
              return (
                <>
                  <label id={index} key={index}>
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
          </form>
        </div>
      </div>
      {/* <audio src="" autoplay loop controls>오디오 지원되지 않는 브라우저</audio> */}
      <div className="create-btn">
        <Button onClick={submit}> submit </Button>
      </div>
         {music.loading && <Progress />}
    </>
  );
};
