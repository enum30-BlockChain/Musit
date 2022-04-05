import React, { useState, useEffect, useRef } from "react";
import Modal from "./Model.jsx";
import axios from "axios";
import {Provider, useSelector, useDispatch} from 'react-redux';
import { fetchLikeListData } from "../../../redux/likeList/likeListAction"

// props
function MusicCard(props) {
  const audioPlayer = useRef("");
  const [modal, setModal] = useState(false);
  const [checkedInputs, setCheckedInputs] = useState("");
  const [likeCount, setlikeCount] = useState("");
  const [palyeCount, setpalyeCount] = useState("");
  
  const dispatch = useDispatch();  
  const likeList = useSelector((state) => state.likeList.likeList);
  
  useEffect(() => {
    setlikeCount(props.music.MusicLikes.length)
    setpalyeCount(props.music.play_count)
  }, [props])
  
  useEffect(() => {
    setCheckedInputs(likeList.find((music)=>music.ipfs_hash===props.music.ipfs_hash));
  }, []); 
  const onPopup = () => {
    setModal(true);
  };

  const onClose = () => {
    setModal(false);
  };

  const palyCountAdd = async () => {
    setpalyeCount(palyeCount + 1);
    const content = { palyeCount: palyeCount, ipfs_hash: props.music.ipfs_hash };
    await axios
      .post("http://localhost:5000/music/add", content)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => alert("노래목록을 불러오지못했습니다.", err));
  };

  const changeHandler = async (checked) => {
    await axios
      .post("http://localhost:5000/music/like", {address:props.address,ipfs_hash:props.music.ipfs_hash})
      .then((res) => {})
      .catch((err) => alert("회원가입부터하세용.", err));

    if (checked) {
      likeList.push(props.music)
      console.log(likeList)
      dispatch(fetchLikeListData(likeList))
      setCheckedInputs(true);
      setlikeCount(likeCount + 1);
    } else {
     const newMySonglist = likeList.filter((song)=>{
        return song.ipfs_hash.indexOf(props.music.ipfs_hash)<0;
       }) 
      dispatch(fetchLikeListData(newMySonglist))
      setCheckedInputs(false);
      setlikeCount(likeCount - 1);
    }
  };

 
 
 
    return (
      <>
          <tr>
            <td>{props.id}</td>
            <td>{props.music.title}</td>
            <td>{props.music.artist_name}</td>
            <td>
              <img src={props.music.img_file} style={{ width: "100px" }} />
            </td>
            <td>
              <audio
                ref={audioPlayer}
                src={`https://ipfs.infura.io/ipfs/${props.music.ipfs_hash}`}
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
            <td>{props.music.Genre}</td>
            <td>
              {props.address === props.music.Artist.user_address
              ? <button onClick={onPopup}> 수정 </button>
              : <button onClick={onPopup} disabled> 수정 </button> }
            </td>
          </tr>
        {modal && <Modal props={props.music} onClose={onClose} />}
      </>
    );
 
}
export default MusicCard;
