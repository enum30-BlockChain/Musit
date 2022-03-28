import React, { useState, useEffect,useRef  } from "react";
import Modal from "./Model.jsx";
import axios from "axios";

function MusicCard(props) {
  const audioPlayer = useRef();
  const [modal, setModal] = useState(false);
  const [checkedInputs, setCheckedInputs] = useState();
  const [likeCount, setlikeCount] = useState(props.like);
  const [palyeCount, setpalyeCount] = useState(props.count);
  
  const onPopup = () => {
    setModal(true);
  };

  const onClose = () => {
    setModal(false);
  };

  const palyCountAdd = async () => {
    setpalyeCount(palyeCount + 1);
    const content = { palyeCount: palyeCount, audio: props.audio };
    await axios
      .post("http://localhost:5000/music/add", content)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => alert("노래목록을 불러오지못했습니다.", err));
  };

  const changeHandler = async (checked) => {
    await axios
      .post("http://localhost:5000/music/like", props)
      .then((res) => {})
      .catch((err) => alert("회원가입부터하세용.", err));

    if (checked) {
      setCheckedInputs(true);
      setlikeCount(likeCount + 1);
    } else {
      setCheckedInputs(false);
      setlikeCount(likeCount - 1);
    }
  };

  // let savePoint = 0;
  // const postTime = async(saveTime)=>{
  //   let sendInt = savePoint % 20;   //20으로 나누면 5초정도됨
  //   const content = { time: saveTime, address: props.address, hash:props.audio, title:props.title };
  //   if (!sendInt) {
  //     savePoint++;
  //     await axios
  //     .post("http://localhost:5000/users/recent", content)
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => alert("노래목록을 불러오지못했습니다.", err));
  //   }
  //   savePoint++;
  // }

   useEffect(() => {
     setCheckedInputs(props.checkBox);
   }, [props]);
 
  if (props.address === props.artistAddress) {
    return (
      <>
        <tbody>
          <tr>
            <td>{props.id}</td>
            <td>{props.title}</td>
            <td>{props.artistName}</td>
            <td>
              <img src={props.img} style={{ width: "100px" }} />
            </td>
            <td>
              <audio
                ref={audioPlayer}
                src={`https://ipfs.io/ipfs/${props.audio}`}
                onLoadedData={() => {   //불러올때
                 const getcurrentTime = props.userList.find((adr)=>adr.address===props.address)
                 const arry = getcurrentTime.recent_played.split("-")
                 if (arry[0]===props.audio){
                   audioPlayer.current.currentTime = arry[2];
                 }
                }}
                // onTimeUpdate={(e) => {
                //   const saveTime = Math.floor(e.currentTarget.currentTime);
                //   postTime(saveTime);
                // }}
                onEnded={() => {
                  palyCountAdd();
                }}
                controls
              />
            </td>
            <td>{palyeCount}</td>
            <td>
              <input
                type="checkbox"
                onChange={(e) => {
                  changeHandler(e.currentTarget.checked);
                }}
                checked={checkedInputs}
              />
              {likeCount}
            </td>
            <td>{props.genre}</td>
            <td>
              <button onClick={onPopup}> 수정 </button>
            </td>
          </tr>
        </tbody>
        {modal && <Modal props={props} onClose={onClose} />}
      </>
    );
  } else if (props.address !== props.artistAddress) {
    return (
      <>
        <tbody>
          <tr>
            <td>{props.id}</td>
            <td>{props.title}</td>
            <td>{props.artistName}</td>
            <td>
              <img src={props.img} style={{ width: "100px" }} />
            </td>
            <td>
            <audio
                ref={audioPlayer}
                src={`https://ipfs.io/ipfs/${props.audio}`}
                onLoadedData={() => {   //불러올때
                 const getcurrentTime = props.userList.find((adr)=>adr.address===props.address)
                 const arry = getcurrentTime.recent_played.split("-")
                 if (arry[0]===props.audio){
                   audioPlayer.current.currentTime = arry[2];
                 }
                }}
                // onTimeUpdate={(e) => {
                //   const saveTime = Math.floor(e.currentTarget.currentTime);
                  // postTime(saveTime);
                // }}
                onEnded={() => {
                  palyCountAdd();
                }}
                controls
              />
           </td>
            <td>{palyeCount}</td>
            <td>
              <input
                type="checkbox"
                onChange={(e) => {
                  changeHandler(e.currentTarget.checked);
                }}
                checked={checkedInputs}
              />
              {likeCount}
            </td>
            <td>{props.genre}</td>
            <td>
              <button onClick={onPopup} disabled> 수정 </button>
            </td>
          </tr>
        </tbody>
        {modal && <Modal props={props} onClose={onClose} />}
      </>
    );
  }
}
export default MusicCard;
