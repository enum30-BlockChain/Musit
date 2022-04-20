import React, { useEffect, useState } from "react";
import "./Playbar.css";
import axios from "axios";
import { Stack, Slider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import PlayList from "./PlayList";
import myImage from "./retro.png";

const fakeFetch = (delay = 1000) =>
  new Promise((res) => setTimeout(res, delay));

export const Playbar = () => {
  const [percent, setPercent] = useState(0);
  const [count, setCount] = useState(0);
  const [palyeCount, setpalyeCount] = useState(0);
  const [hash, sethash] = useState("");
  const [tilte, setTilte] = useState("");
  const [currentTime, setcurrentTime] = useState(0);
  const [value, setValue] = useState(100);
  const musicContainer = document.querySelector(".music-container");
  const playBtn = document.querySelector("#play");
  const audio = document.querySelector("#audio");
  const title = document.getElementById("title");
  const cover = document.getElementById("cover");
  const progressContainer = document.getElementById("progress-container");

  // const userList = useSelector((state) => state.userList);
  const likeMusic = useSelector((state) => state.likeMusic).data;
  const user = useSelector((state) => state.user);
  const musicList = useSelector((state) => state.musicList).data;

  useEffect(() => {
    //첫로딩시 리센트 가져와서 세팅
    if (musicList.length > 0 && user.address) {
      //페이지로딩해서 find로 내 좋아요 목록불러오고
      let song = musicList[count];
      if (!user.address) {
        // console.log("유저가아닌사람")
      } else {
        // console.log("유저가 맞는 사람")
        const audio = document.querySelector("#audio");
        const title = document.getElementById("title");
        const cover = document.getElementById("cover");
        if (user.recent_played === null) {
          // console.log("회원인데 리센트없는사람 ")
          //recent_played 없으면 바로 배열 0번째 ㄱ하고
          setpalyeCount(song.play_count);
          sethash(song.ipfs_hash);
          setTilte(song.title);
          title.innerText = song.title;
          audio.src = `https://ipfs.infura.io/ipfs/${song.ipfs_hash}`;
          cover.src = song.img_file;
        } else {
          // console.log("회원인데 리센트있는사람 ")
          // recent_played 있으면
          const arry = user.recent_played.split("-"); //receent찾아와서
          const songs = user.MusicLikes;
          const index = songs.findIndex((i) => i.ipfs_hash == arry[0]); //=한개쓰면 0,1만나오고 ==몇번째인지 나온다.
          setCount(index); //목록맞춰주기 다음으로 넘길때 오류 발생 안함
          if (index === -1) {
            // console.log("회원인데 리센트있는데 못찾는사람 ")
            // setpalyeCount(song.play_count);
            // sethash(song.ipfs_hash);
            // setTilte(song.title);
            // title.innerText = song.title;
            // audio.src = `https://ipfs.infura.io/ipfs/${song.ipfs_hash}`;
            // cover.src = song.img_file;
          } else {
            const firstSetting = songs[index].Music;
            // console.log("회원인데 리센트있는데 찾은사람 ")
            setpalyeCount(firstSetting.play_count);
            sethash(firstSetting.ipfs_hash);
            setTilte(firstSetting.title);
            title.innerText = firstSetting.title;
            audio.src = `https://ipfs.infura.io/ipfs/${firstSetting.ipfs_hash}`;
            cover.src = firstSetting.img_file;
            setcurrentTime(arry[1]);
          }
        }
      }
    }
  }, [user]);

  function loadSong(song) {
    //노래불러올때
    setpalyeCount(song.play_count);
    sethash(song.ipfs_hash);
    setTilte(song.title);
    setcurrentTime(0);
    title.innerText = song.title;
    audio.src = `https://ipfs.infura.io/ipfs/${song.ipfs_hash}`;
    cover.src = song.img_file;
  }

  function playloadSong(song, index) {
    //play list 노래불러올때
 
    setpalyeCount(song.play_count);
    sethash(song.ipfs_hash);
    setTilte(song.title);
    setcurrentTime(0);
    title.innerText = song.title;
    audio.src = `https://ipfs.infura.io/ipfs/${song.ipfs_hash}`;
    cover.src = song.img_file;
    playSong();
    setCount(index);
  }

  function prevSong() {
    let num = count;
    num--;
    if (num < 0) {
      num = likeMusic.length - 1;
    }
    setCount(num);
    loadSong(likeMusic[num]);
    playSong();
  }

  function shuffle(array) {
    //목록 한번 셔플해줄꺼
    array.sort(() => Math.random() - 0.5);
  }

  function nextSong() {
    let num = count;
    num++;
    if (num > likeMusic.length - 1) {
      num = 0;
    }
    setCount(num);
    loadSong(likeMusic[num]);
    playSong();
  }

  function EndNextSong() {
    let num = count;
    if (repeatState) {
      // 여긴 한곡만재생
      console.log("한곡만재생중");
      loadSong(likeMusic[num]);
      playSong();
    } else {
      //한곡재생아닐때
      num++;
      if (num > likeMusic.length - 1) {
        num = 0;
      }
      setCount(num);
      loadSong(likeMusic[num]);
      playSong();
    }
  }

  const [repeatState, setRepeatState] = useState(false);
  const [Shuffle, setShuffle] = useState({ isLoading: false });
  const { isLoading } = Shuffle;

  function changeRepeat() {
    if (repeatState) {
      setRepeatState(false);
    } else {
      setRepeatState(true);
    }
  }
  async function changeRandom() {
    setShuffle({ isLoading: true });
    const firstSong = likeMusic[count]; //넣을꺼
    //지금재생 찾아서 삭제
    likeMusic.splice(
      likeMusic.findIndex((music) => music.ipfs_hash === firstSong.ipfs_hash),
      1
    );
    //섞어주고
    shuffle(likeMusic);
    //넣어주고
    likeMusic.unshift(firstSong);
    setCount(0);
    await fakeFetch();
    setShuffle({ isLoading: false });
  }

  function playSong() {
    const musciCardAudio = document.querySelector("#MusicCardAudio");
    if(musciCardAudio)musciCardAudio.pause();
    musicContainer.classList.add("play");
    playBtn.querySelector("i.fas").classList.add("fa-pause");
    playBtn.querySelector("i.fas").classList.remove("fa-play");
    const musicCardPlaying = document.querySelector(" .music-card.playing")
    if (musicCardPlaying) musicCardPlaying.classList.remove("playing");
    audio.play();
  }
  function pauseSong() {
    musicContainer.classList.remove("play");
    playBtn.querySelector("i.fas").classList.add("fa-play");
    playBtn.querySelector("i.fas").classList.remove("fa-pause");
    audio.pause();
  }

  function playOnClick() {
    const musicCardAudio = document.querySelector("#MusicCardAudio");
    if (musicCardAudio) musicCardAudio.pause();
    const playbarState = document.querySelector("i.fa-play");

    // 뮤직쪽에서 플레이중이면 삭제시켜주자
    const musicCardPlaying = document.querySelector(
      ".music-cards-container .music-card.playing"
    );
    if (musicCardPlaying) musicCardPlaying.classList.remove("playing");

    if (playbarState) {
      playSong();
    } else {
      pauseSong();
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
    const close = document.querySelector(".close");
    let clickX;
    if (close) {
      clickX = e.clientX - 242; //왜170부터시작하는지모르겠넹
    } else {
      clickX = e.clientX - 390; //왜170부터시작하는지모르겠넹
    }
    const width = progressContainer.clientWidth; //300
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
    const content = { play_count: palyeCount + 1 };
    await axios.patch(`http://localhost:5000/music/${hash}`, content);
    // .then((res) => console.log(res))
  };

  const [savePoint, setSavePoint] = useState(0);

  const postTime = async (saveTime) => {
    let sendInt = savePoint % 20; //20으로 나누면 5초정도됨
    const content = [hash, saveTime, tilte];

    if (!sendInt) {
      setSavePoint(savePoint + 1);
      await axios.patch(`http://localhost:5000/users/${user.address}`, {
        recent_played: content.join("-"),
      });
      // .then((res) => console.log(res))
    }
    setSavePoint(savePoint + 1);
  };

  const handleChange = (event, newValue) => {
    audio.volume = newValue * 0.01;
    setValue(newValue);
  };

  return (
    <>
      <div className="music-container">
        <div className="music-info">
          <div
            id="progress-container"
            className="progress-container"
            onClick={(e) => setProgress(e)}
          >
            <div className="progress" style={{ width: `${percent}%` }}></div>
          </div>
        </div>
        <div className="music-control-box">
          <audio
            id="audio"
            onLoadedData={() => {
              //불러올때
              audio.currentTime = currentTime;
            }}
            onTimeUpdate={(e) => {
              if (savePoint > 0) {
                const saveTime = Math.floor(e.currentTarget.currentTime);
                postTime(saveTime);
                DurTime(e);
                updateProgress(e);
              }
              setSavePoint(savePoint + 1);
            }}
            onEnded={() => {
              EndNextSong();
              palyCountAdd();
            }}
          />
          <div className="img-container">
            <img src={myImage} alt="music-cover" id="cover" />
          </div>

          <div className="navigation">
            <button id="prev" className="action-btn" onClick={prevSong}>
              <i className="fas fa-backward"></i>
            </button>
            <button
              id="play"
              className="action-btn action-btn-big"
              onClick={playOnClick}
            >
              <i className="fas fa-play"></i>
            </button>
            <button id="next" className="action-btn" onClick={nextSong}>
              <i className="fas fa-forward"></i>
            </button>
          </div>

          <Stack
            spacing={2}
            direction="row"
            sx={{ mb: 1 }}
            alignItems="center"
          ></Stack>

          <div className="volume-control">
            <Slider
              aria-label="Volume"
              placeholder="Volume"
              value={value}
              onChange={handleChange}
              sx={{ width: 220, height: 5 }}
            />
          </div>
          <div className="nowplaying">
            <h3>Now playing : </h3>
            <h3 id="title"></h3>
          </div>
          <div className="playbaricon">
            {repeatState ? (
              <li>
                <i className="uil uil-repeat" onClick={changeRepeat}></i>
              </li>
            ) : (
              <li>
                <i
                  style={{ color: "#e6e5e5" }}
                  className="uil uil-repeat"
                  onClick={changeRepeat}
                ></i>
              </li>
            )}

            {isLoading ? (
              <li>
                <i className="uil uil-arrow-random" onClick={changeRandom}></i>
              </li>
            ) : (
              <li>
                <i
                  style={{ color: "#e6e5e5" }}
                  className="uil uil-arrow-random"
                  onClick={changeRandom}
                ></i>
              </li>
            )}
          </div>
        </div>
        <PlayList playloadSong={playloadSong} />
      </div>
    </>
  );
};
