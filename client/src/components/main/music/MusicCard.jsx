import React, { useState, useEffect, useRef } from "react";
import Modal from "./Model.jsx";
import axios from "axios";
import {useSelector, useDispatch} from 'react-redux';
import { toggleLikeMusic } from "../../../redux/actions/musicActions"

// props
function MusicCard(props) {
  const audioPlayer = useRef("");
  const [modal, setModal] = useState(false);
  const [checkedInputs, setCheckedInputs] = useState("");
  const [likeCount, setlikeCount] = useState("");
  const [palyeCount, setpalyeCount] = useState("");
  
  const dispatch = useDispatch();  
  useEffect(() => {
    setlikeCount(props.music.MusicLikes.length)
    setpalyeCount(props.music.play_count)
    setCheckedInputs(props.checkBox);
  }, [props.checkBox])
  
  const onPopup = () => {
    setModal(true);
  };

  const onClose = () => {
    setModal(false);
  };

  const palyCountAdd = async () => {
    setpalyeCount(palyeCount + 1);
    const content = { play_count: palyeCount, ipfs_hash: props.music.ipfs_hash };
    await axios
      .post("http://localhost:5000/music/add", content)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => alert("노래목록을 불러오지못했습니다.", err));
  };

  const changeHandler = async (checked) => {
    dispatch(toggleLikeMusic(props.music))
    if (checked) {
      setCheckedInputs(true);
      setlikeCount(likeCount + 1);
    } else {
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
