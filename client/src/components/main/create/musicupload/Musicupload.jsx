import "./Musicupload.css";
import { Box, Button, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useDispatch, useSelector } from "react-redux";
import { readArtistList } from "../../../../redux/actions/artistActions";
import { createMusicData } from "../../../../redux/actions/musicActions";
import Progress from "./progress/Progress";
import MessageHandler from "./progress/MessageHandler";
import Checkbox from "@mui/material/Checkbox";
import Usernull from "./usernull.png";

// const { create } = require("ipfs-http-client");
const label = { inputProps: { "aria-label": "Checkbox demo" } };
export const Musicupload = () => {
  const artistList = useSelector((state) => state.artistList);
  const user = useSelector((state) => state.user);
  const music = useSelector((state) => state.music);
  const dispatch = useDispatch();
  const [genre, setGenre] = useState([
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
  const [checkedInputs, setCheckedInputs] = useState([]);
  const [albumCoverImgFile, setAlbumCoverImgFile] = useState("");
  const [audiofile, setaudiofile] = useState("");
  const [duration, setDuration] = useState("");
  const [musicTitle, setMusicTitle] = useState("");
  const [description, setDescription] = useState("");
  const [messageState, setMessageState] = useState(false);
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
        return alert("3???????????? check ????????????");
      }
      setCheckedInputs([...checkedInputs, value]);
    } else {
      // ?????? ??????
      setCheckedInputs(checkedInputs.filter((el) => el !== value));
    }
  };

  const isValidDBdata = () => {
    if (DBdata.artist_name === "") {
      alert("???????????? ????????????");
      return false;
    } else if (albumCoverImgFile === "") {
      alert("???????????? ???????????????");
      return false;
    } else if (audiofile === "") {
      alert("??????????????? ???????????????");
      return false;
    } else if (musicTitle === "") {
      alert("??????????????? ???????????????");
      return false;
    } else if (description === "") {
      alert("description ???????????????");
      return false;
    } else if (checkedInputs.length == 0) {
      alert("????????? ??????????????????");
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
      await dispatch(createMusicData(imgFormData, audioFormData, DBdata));
      await setMessageState(true);
    }
    await setMessageState(false);
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
      <div className="create-mainlayout">
        <div className="create-title">
          <i className="uil uil-upload-alt"></i>
          <span className="text"> Create your music file</span>
        </div>
        <div className="create-layout">
          <div className="create-imgbox">
            <h2>Album Cover Image</h2>

            <img
              src={
                albumCoverImgFile
                  ? URL.createObjectURL(albumCoverImgFile)
                  : Usernull
              }
            ></img>

            <div className="create-img-upload-btn">
              <Button
                component="label"
                sx={{
                  color: "var(--black-light-color)",
                  fontSize: 15,
                  backgroundColor: "var(--box1-color)",
                  ":hover": {
                    background: "var(--primary-color)",
                    color: "var(--text-color)",
                  },
                }}
              >
                Image Upload
                <input
                  hidden
                  id="coverupload"
                  name="imgUpload"
                  type="file"
                  accept="image/*"
                  onChange={getImg}
                />
              </Button>
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
                  }}
                  // onTimeUpdate= {(e) =>{
                  // }}
                  loop
                  controls
                >
                  ????????? ???????????? ?????? ????????????
                </audio>
              )}
            </div>

            <Button
              component="label"
              variant="contained"
              sx={{
                color: "var(--black-light-color)",
                fontSize: 15,
                backgroundColor: "var(--box1-color)",
                ":hover": {
                  background: "var(--primary-color)",
                  color: "var(--text-color)",
                },
              }}
            >
              Music file Upload
              <input
                type="file"
                hidden
                accept={"audio/*"}
                style={{ display: "none" }}
                onChange={getAudio}
              />
            </Button>

            <h2>Music Title</h2>
            <input
              style={{
                width: 400,
                backgroundColor: "opacity",
                fontSize: "25px",
              }}
              onChange={getTitle}
              value={musicTitle}
              // inputProps={{ style: { fontSize: 30 } }}
              placeholder="Music Title"
            />
            <h2>Music Description</h2>
            <TextareaAutosize
              maxRows={4}
              aria-label="maximum height"
              placeholder="Fill your music description"
              style={{ width: 400, height: 100 }}
              onChange={getDescription}
            />
            <h2>Genre</h2>
            <Box sx={{ mx: "auto", width: "550px" }}>
              <form>
                <Box display="flex" flexWrap="wrap" justifyContent="flex-start">
                  {genre.map((MusicType, index) => {
                    return (
                      <Box key={index} sx={{ width: "20%", textAlign: "left" }}>
                        <label id={index}>
                          <Checkbox
                            className="checkbox-musicupload"
                            type={"checkbox"}
                            name={"MusicType"}
                            value={MusicType}
                            onChange={(e) => {
                              changeHandler(e.currentTarget.checked, MusicType);
                            }}
                            checked={
                              checkedInputs.includes(MusicType) ? true : false
                            }
                          />
                          {MusicType}
                        </label>
                      </Box>
                    );
                  })}
                </Box>
              </form>
            </Box>
            <div className="create-btn">
              <Button
                variant="contained"
                sx={{
                  color: "var(--black-light-color)",
                  fontSize: 15,
                  backgroundColor: "var(--box1-color)",
                  ":hover": {
                    background: "var(--primary-color)",
                    color: "var(--text-color)",
                  },
                }}
                onClick={submit}
              >
                upload
              </Button>
            </div>
          </div>
        </div>
        {/* <audio src="" autoplay loop controls>????????? ???????????? ?????? ????????????</audio> */}
        {music.loading && <Progress />}
        <MessageHandler onOff={messageState} title={DBdata.title} />
      </div>
    </>
  );
};
