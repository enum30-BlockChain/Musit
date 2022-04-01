import React, { useState, useEffect,useRef  } from "react";
import Modal from "./Model.jsx";
import axios from "axios";
import {Provider, useSelector, useDispatch} from 'react-redux';

// props
function MusicCard(props) {
  const audioPlayer = useRef("");
  const [modal, setModal] = useState(false);
  const [checkedInputs, setCheckedInputs] = useState("");
  const [likeCount, setlikeCount] = useState("");
  const [palyeCount, setpalyeCount] = useState("");
  
  const dispatch = useDispatch();  
  const mySonglist = useSelector((state)=>{return state.mySonglist}); 

  useEffect(() => {
    setlikeCount(props.MusicLikes)
    setpalyeCount(props.play_count)
  }, [props])
  
  const onPopup = () => {
    setModal(true);
  };

  const onClose = () => {
    setModal(false);
  };

  const palyCountAdd = async () => {
    setpalyeCount(palyeCount + 1);
    const content = { palyeCount: palyeCount, ipfs_hash: props.ipfs_hash };
    await axios
      .post("http://localhost:5000/music/add", content)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => alert("노래목록을 불러오지못했습니다.", err));
  };

  const changeHandler = async (checked) => {
    console.log(props)
    await axios
      .post("http://localhost:5000/music/like", props)
      .then((res) => {})
      .catch((err) => alert("회원가입부터하세용.", err));

    if (checked) {
      dispatch({type:'SONG_LIST_ADD', payload: props})
      setCheckedInputs(true);
      setlikeCount(likeCount + 1);
    } else {
     const newMySonglist = mySonglist.filter((song)=>{
        return song.ipfs_hash.indexOf(props.ipfs_hash)<0;
       }) 
      dispatch({type:'SONG_LIST_POP', payload: newMySonglist})
      setCheckedInputs(false);
      setlikeCount(likeCount - 1);
    }
  };

   useEffect(() => {
     setCheckedInputs(props.checkBox);
   }, [props]);
 
 
    return (
      <>
          <tr>
            <td>{props.id}</td>
            <td>{props.title}</td>
            <td>{props.artist_name}</td>
            <td>
              <img src={props.img_file} style={{ width: "100px" }} />
            </td>
            <td>
              <audio
                ref={audioPlayer}
                src={`https://ipfs.infura.io/ipfs/${props.ipfs_hash}`}
                onLoadedData={() => {   //불러올때
                 const getcurrentTime = props.userList.find((adr)=>adr.address===props.address)
                 const arry = getcurrentTime.recent_played.split("-")
                 if (arry[0]===props.ipfs_hash){
                   audioPlayer.current.currentTime = arry[2];
                 }
                }}
               
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
            <td>{props.Genre}</td>
            <td>
              {props.address === props.artistAddress 
              ? <button onClick={onPopup}> 수정 </button>
              : <button onClick={onPopup} disabled> 수정 </button> }
            </td>
          </tr>
        {modal && <Modal props={props} onClose={onClose} />}
      </>
    );
 
}
export default MusicCard;
