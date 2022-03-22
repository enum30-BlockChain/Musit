import React ,{useState,useEffect} from 'react'
import Modal from './Modal';
import axios from 'axios'

 function MusicCard(props) {
  const [modal, setModal] = useState(false);
  const [checkedInputs, setCheckedInputs] = useState(props.checkBox);
  const [likeCount, setlikeCount] = useState(props.like);
  
  const onPopup = () => {
    setModal(true);
  };

  const onClose = () => {
    console.log(props.artist)
    setModal(false);
  };

  const changeHandler = async (checked) => {
    await axios
    .post("http://localhost:5000/music/like",props)
    .then((res) => {
    })
    .catch((err) => alert("노래목록을 불러오지못했습니다.", err));

    if (checked) {
      console.log("체크")
      setCheckedInputs(true);
      setlikeCount(likeCount+1);
    } else {
      setCheckedInputs(false);
      setlikeCount(likeCount-1);
    }
  };
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
              <audio src={`https://ipfs.io/ipfs/${props.audio}`} controls />
            </td>
            <td>{props.count}</td>
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
              <button onClick={onPopup}> 수정 </button>{" "}
            </td>
          </tr>
        </tbody>
        {modal && <Modal props={props} onClose={onClose} />}
      </>
    );
  }else if(props.address!==props.artistAddress){
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
              <audio src={`https://ipfs.io/ipfs/${props.audio}`} controls />
            </td>
            <td>{props.count}</td>
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
              <td><button onClick={onPopup} disabled > 수정 </button> </td>
          </tr>
        </tbody>
        {modal && <Modal props={props} onClose={onClose} />}
      </>
    );
  }
  
}
export default MusicCard;