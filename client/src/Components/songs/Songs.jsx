import React, { component,useEffect,useState } from "react";
import "./Songs.scss";
import bts from "./music/bts.mp3";
import axios from "axios";
import {Box,Stack,Slider  } from '@mui/material';
{/* <props likeList address userList/> */}
export const Songs = (props) => {
  const [state, setstate] = useState("pause");
  const [percent, setPercent] = useState("0");
  const musicContainer = document.querySelector(".music-container");
  const playBtn = document.querySelector("#play");
  const audio = document.querySelector("#audio");
  const progressContainer = document.getElementById("progress-container");
  const title = document.getElementById("title");
  const cover = document.getElementById("cover");
  const [count,setCount] =useState(0);
  const [palyeCount, setpalyeCount] = useState("");
  const [hash, sethash] = useState("");
  const [tilte, setTilte] = useState("");
  const [currentTime, setcurrentTime] = useState(0);
  const [value, setValue] = useState(100);
  let song = props.songList[count]
  useEffect(() => {
    
    if (song) {
      const getcurrentTime = props.userList.find(
        (adr) => adr.address === props.address
      );
      if (getcurrentTime.recent_played == null) {
        setpalyeCount(song.play_count);
        sethash(song.ipfs_hash);
        setTilte(song.title);
        console.log(song.ipfs_hash);
        title.innerText = song.title;
        audio.src = `https://ipfs.io/ipfs/${song.ipfs_hash}`;
        cover.src = song.img_file;
      } else {
        const arry = getcurrentTime.recent_played.split("-"); //receent찾아와서
        const songs = props.songList;
        const index = songs.findIndex((i) => i.ipfs_hash == arry[0]); //=한개쓰면 0,1만나오고 ==몇번째인지 나온다.
        if (index === -1) {
          setpalyeCount(song.play_count);
          sethash(song.ipfs_hash);
          setTilte(song.title);
          title.innerText = song.title;
          audio.src = `https://ipfs.io/ipfs/${song.ipfs_hash}`;
          cover.src = song.img_file;
        } else {
          setpalyeCount(songs[index].play_count);
          sethash(songs[index].ipfs_hash);
          setTilte(songs[index].title);
          title.innerText = songs[index].title;
          audio.src = `https://ipfs.io/ipfs/${songs[index].ipfs_hash}`;
          cover.src = songs[index].img_file;
          setcurrentTime(arry[2]);
        }
      }
    }
  }, [props])

  function loadSong(song) {  //노래불러올때
    setpalyeCount(song.play_count)
    sethash(song.ipfs_hash)
    setTilte(song.title)
    setcurrentTime(0)
    title.innerText = song.title;
    audio.src = `https://ipfs.io/ipfs/${song.ipfs_hash}`;
    cover.src = song.img_file;
  }

  function prevSong() {
    let num = count
    num --;
    if (num < 0) {
      num = props.songList.length - 1;
    }
    setCount(num)
    loadSong(props.songList[num]);
    playSong();
  }
  function nextSong() {
    let num = count
    num ++;
    if (num > props.songList.length - 1) {
      num = 0;
    }
    setCount(num)
    loadSong(props.songList[num]);
    playSong();
  }


  function playSong() {
    setstate("palying");
    musicContainer.classList.add("play");
    playBtn.querySelector("i.fas").classList.remove("fa-play");
    playBtn.querySelector("i.fas").classList.add("fa-pause");
    audio.play();
  }
  function pauseSong() {
    setstate("pause");
    musicContainer.classList.remove("play");
    playBtn.querySelector("i.fas").classList.add("fa-play");
    playBtn.querySelector("i.fas").classList.remove("fa-pause");
    audio.pause();
  }

  function playOnClikc() {
    if (state === "pause") {
      playSong()
    } else if (state === "palying") {
      pauseSong()
    }
  }

  // Update progress bar
  function updateProgress(e) {
    const { duration, currentTime } = e.currentTarget;
    const progressPercent = (currentTime / duration) * 100;
    setPercent(progressPercent);
  }

  // Set progress bar
  function setProgress(e) {
    const width = progressContainer.clientWidth;  //300
    const clickX = e.clientX-170; //왜170부터시작하는지모르겠넹
    const duration = audio.duration;
  
    audio.currentTime = (clickX / width) * duration;
  }

  // 시간표시해주는건데 지금어디에 넣지는못함
function DurTime(e) {
  const { duration, currentTime } = e.currentTarget;
  var sec;
  var sec_d;

  // define minutes currentTime
  let min = currentTime == null ? 0 : Math.floor(currentTime / 60);
  min = min < 10 ? "0" + min : min;

  // define seconds currentTime
  function get_sec(x) {
    if (Math.floor(x) >= 60) {
      for (var i = 1; i <= 60; i++) {
        if (Math.floor(x) >= 60 * i && Math.floor(x) < 60 * (i + 1)) {
          sec = Math.floor(x) - 60 * i;
          sec = sec < 10 ? "0" + sec : sec;
        }
      }
    } else {
      sec = Math.floor(x);
      sec = sec < 10 ? "0" + sec : sec;
    }
  }

  get_sec(currentTime, sec);

  // change currentTime DOM
  // currTime.innerHTML = min + ":" + sec;

  // define minutes duration
  let min_d = isNaN(duration) === true ? "0" : Math.floor(duration / 60);
  min_d = min_d < 10 ? "0" + min_d : min_d;

  function get_sec_d(x) {
    if (Math.floor(x) >= 60) {
      for (var i = 1; i <= 60; i++) {
        if (Math.floor(x) >= 60 * i && Math.floor(x) < 60 * (i + 1)) {
          sec_d = Math.floor(x) - 60 * i;
          sec_d = sec_d < 10 ? "0" + sec_d : sec_d;
        }
      }
    } else {
      sec_d = isNaN(duration) === true ? "0" : Math.floor(x);
      sec_d = sec_d < 10 ? "0" + sec_d : sec_d;
    }
  }
  // define seconds duration
  get_sec_d(duration);
  // change duration DOM
  // durTime.innerHTML = min_d + ":" + sec_d;
  // console.log(min_d + ":" + sec_d)
}

const palyCountAdd = async () => {
  setpalyeCount(palyeCount + 1);
  const content = { palyeCount: palyeCount, audio: hash };
  await axios
    .post("http://localhost:5000/music/add", content)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => alert("노래목록을 불러오지못했습니다.", err));
};

const [savePoint,setSavePoint] =useState(0);
const postTime = async(saveTime)=>{
  let sendInt = savePoint % 20;   //20으로 나누면 5초정도됨
  const content = { time: saveTime, address: props.address, hash:hash, title:tilte };
  if (!sendInt) {
    setSavePoint(savePoint+1);
    await axios
    .post("http://localhost:5000/users/recent", content)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => alert("노래목록을 불러오지못했습니다.", err));
  }
  setSavePoint(savePoint+1);
}

  const handleChange = (event, newValue) => {
    audio.volume = newValue*0.01;
    setValue(newValue);
  };
  return (
    <>
      {/* <Helmet>
        <title>My Title</title>
        <meta name="description" content="Helmet application" />
      </Helmet> */}
      <h1>Music Player</h1>

      <div className="music-container">
        <div className="music-info">
          <h4 id="title"></h4>
          <div
            id="progress-container"
            className="progress-container"
            onClick={(e) => setProgress(e)}
          >
            <div className="progress" style={{ width: `${percent}%` }}></div>
          </div>
        </div>
        <audio
          id="audio"
          src={bts}
          onLoadedData={() => {
            //불러올때
            audio.currentTime = currentTime;
          }}
          onTimeUpdate={(e) => {
            if(savePoint>0){
              const saveTime = Math.floor(e.currentTarget.currentTime);
              postTime(saveTime);
              DurTime(e);
              updateProgress(e);
            }
            setSavePoint(savePoint+1);

          }}
          onEnded={() => {
            nextSong();
            palyCountAdd();
          }}
        />
        <div className="img-container">
          <img
            src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=1260/uploads/users/114/posts/34296/final_image/Final-image.jpg"
            alt="music-cover"
            id="cover"
          />
        </div>
        <div className="navigation">
          <button id="prev" className="action-btn" onClick={prevSong}>
            <i className="fas fa-backward"></i>
          </button>
          <button
            id="play"
            className="action-btn action-btn-big"
            onClick={playOnClikc}
          >
            <i className="fas fa-play"></i>
          </button>
          <button id="next" className="action-btn" onClick={nextSong}>
            <i className="fas fa-forward"></i>
          </button>
          <Box sx={{ width: 100 }}>
            <Stack
              spacing={2}
              direction="row"
              sx={{ mb: 1 }}
              alignItems="center"
            >
              <Slider
                aria-label="Volume"
                value={value}
                onChange={handleChange}
              />
            </Stack>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Songs;
