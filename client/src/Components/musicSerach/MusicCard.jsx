import React ,{useState} from 'react'
import Modal from './Modal';

 function MusicCard(props) {
  const [modal, setModal] = useState(false);
  const onPopup = () => {
    setModal(true);
  };

  const onClose = () => {
    setModal(false);
  };
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
          <td>{props.like}</td>
          <td>{props.genre}</td>
          <td><button onClick={onPopup}> 수정 </button> </td>
        </tr>
      </tbody>
      {modal && <Modal props={props} onClose={onClose} />}
    </>
  );
}
export default MusicCard;