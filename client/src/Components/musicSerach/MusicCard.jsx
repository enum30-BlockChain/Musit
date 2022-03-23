import React ,{useState,useEffect} from 'react'
import Modal from './Modal';
import axios from 'axios'

 function MusicCard(props) {
  const [modal, setModal] = useState(false);
  const [checkedInputs, setCheckedInputs] = useState();
  const [likeCount, setlikeCount] = useState(props.like);
  const [palyeCount, setpalyeCount] = useState(props.count);

  const onPopup = () => {
    setModal(true);
  };

  const onClose = () => {
    console.log(props.artist)
    setModal(false);
  };

  const palyCountAdd = async ()=>{
    setpalyeCount(palyeCount+1)
    const content = {palyeCount:palyeCount,
                    audio:props.audio}
    await axios
      .post("http://localhost:5000/music/add",content)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => alert("노래목록을 불러오지못했습니다.", err));
  }

  const changeHandler = async (checked) => {
    await axios
    .post("http://localhost:5000/music/like",props)
    .then((res) => {
    })
    .catch((err) => alert("회원가입부터하세용.", err));
    if (checked) {
      setCheckedInputs(true);
      setlikeCount(likeCount+1);
    } else {
      setCheckedInputs(false);
      setlikeCount(likeCount-1);
    }
  };

  const postTime = async()=>{
    console.log("전송")
  }

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
                src={`https://ipfs.io/ipfs/${props.audio}`}
                onPlay={()=>{
                  setInterval(postTime, 1000);
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
            <td>{props.genre}</td>
            <td>
              <button onClick={onPopup}> 수정 </button>
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
          <audio
              src={`https://ipfs.io/ipfs/${props.audio}`}
              onEnded={()=>{
                palyCountAdd()
              }}
              onPlay={()=>{
                setInterval(postTime, 1000);
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