import React, { useEffect, useState } from "react";
import axios from "axios";
const { create } = require("ipfs-http-client");

function FileUpload({ address }) {
  const [genre, setgenre] = useState(["Pop", "k-pop", "Trot"]);
  const [checkedInputs, setCheckedInputs] = useState([]);
  const [albumCoverImgFile, setAlbumCoverImgFile] = useState("");
  const [audiofile, setaudiofile] = useState("");
  const [duration, setDuration] = useState("");
  const [musicTitle, setMusicTitle] = useState("");
  // const [currentTime, setCurrentTime] = useState(""); //TODO : 나중에 스트리밍할때쓸려고나둠
  const [artistList, setartistList] = useState("");
  const [DBdata, setDBdata] = useState({
    cover_img_link: "",
    music_link: "",
    music_title: "",
    music_duration: "",
    artist_name: "",
    music_genre: "",
  });

  const formData = new FormData(); //server로 img파일 보내기위해 사용

  async function ipfsClient() {
    //ipfs 서버연결
    const ipfs = await create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
    });
    return ipfs;
  }

  const getImg = (e) => {
    setAlbumCoverImgFile(e.target.files[0]);
  };
  const getAudio = (e) => {
    setaudiofile(e.target.files[0]);
  };
  const getTitle = (e) => {
    setMusicTitle(e.target.value);
  };

  const postImg = async () => {
    //multer하고 s3저장후 링크가져오기
    formData.append("img", albumCoverImgFile);
    await axios
      .post("http://localhost:5000/files/imgupload", formData) //formData multer가읽을수있다.
      .then((res) => (DBdata.cover_img_link = res.data.downLoadLink))
      .catch((err) => alert(err));
    return DBdata;
  };

  const postAudio = async () => {
    //multer하고 s3저장후 링크가져오기
    let ipfs = await ipfsClient();
    let result = await ipfs.add(audiofile);
    DBdata.music_link = result.path;
  };

  const changeHandler = (checked, value) => {
    if (checked) {
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
    } else if (checkedInputs.length == 0) {
      alert("장르를 체크해주세요");
      return false;
    }
    return true;
  };

  const submit = async () => {
    await findArtist();
    if (isValidDBdata()) {
      await postImg();
      await postAudio();
      DBdata.music_duration = duration;
      DBdata.music_title = musicTitle;
      DBdata.music_genre = checkedInputs;
      //TODO : 아티스트 이름은 useEffect로 처음에 불러와서 보낼꺼니깐있는거어서 상관 x
      //TODO : 지금은 안불러와서 있는 아티스트 이름넣어줘야 db저장가능
      await axios
        .post("http://localhost:5000/files/create", DBdata)
        .then((res) => {
          if ((res.data.result = 0)) {
            alert(res.data.message);
            window.location.href = "/musicsearch";
          } else if ((res.data.result = 1)) {
            alert(res.data.message);
            window.location.href = "/musicsearch";
          } else if ((res.data.result = 2)) {
            alert(res.data.message);
            window.location.href = "/fileupload";
          }
        })
        .catch((err) => alert(err));
    }
  };

  const getArtist = async () => {
    await axios
      .get("http://localhost:5000/artists/list") //formData multer가읽을수있다.
      .then((res) => {
        setartistList(res.data);
      })
      .catch((err) => alert(err));
  };

  const findArtist = async () => {
    artistList.map((a) => {
      if (a.user_address === address) {
        DBdata.artist_name = a.artist_name;
        return DBdata;
      }
    });
  };

  useEffect(() => {
    const init = async () => {
      await getArtist();
    };
    init();
  }, []);

  return (
    <>
      <p>albumCoverImg</p>
      <input name="imgUpload" type="file" accept="image/*" onChange={getImg} />
      {albumCoverImgFile && (
        <img
          src={URL.createObjectURL(albumCoverImgFile)}
          style={{ width: "200px" }}
        ></img>
      )}
      <p>music</p>
      <input type="file" accept="audio/*" onChange={getAudio} />
      {audiofile && (
        <audio
          src={URL.createObjectURL(audiofile)}
          onLoadedData={(e) => {
            setDuration(e.currentTarget.duration);
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
      <p>title</p>
      <input onChange={getTitle} value={musicTitle} />
      <p>genre</p>
      <form>
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
      </form>
      {/* <audio src="" autoplay loop controls>오디오 지원되지 않는 브라우저</audio> */}
      <p />
      <button onClick={submit}> submit </button>
    </>
  );
}
export default FileUpload;
