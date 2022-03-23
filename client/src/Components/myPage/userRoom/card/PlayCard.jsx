import React, { useEffect, useState } from "react";
import axios from "axios";
import PlayDetailCard from "./PlayDetailCard";

const PlayCard = ({
  id,
  name,
  genre,
  title,
  audio,
  select,
  setSelect,
  like,
  address,
  checkBox,
}) => {
  const [detail, setDetail] = useState([]);
  const [likeCount, setLikeCount] = useState(like);
  const [checkedInputs, setCheckedInputs] = useState();

  useEffect(() => {
    setCheckedInputs(checkBox);
  }, []);

  const ArtistOnclick = (e) => {
    setSelect(e.target.name);
  };

  const DetailOnClick = () => {
    const url = "http://localhost:5000/music/likes/likedetail";
    const response = axios.post(url, { select }).then((res) => {
      console.log(res.data);
      setDetail(res.data);
    });
  };

  const changeHandler = async (checked) => {
    const url = "http://localhost:5000/music/like";
    const response = await axios
      .post(url, { address, like, audio })
      .then((res) => {})
      .catch((err) => alert("회원가입부터하세용.", err));
    if (checked) {
      setCheckedInputs(true);
      setLikeCount(likeCount + 1);
    } else {
      setCheckedInputs(false);
      setLikeCount(likeCount - 1);
    }
  };

  return (
    <>
      <div>
        <li>{id}</li>
        <li>
          <button name={audio} onClick={ArtistOnclick}>
            {title}
          </button>
        </li>
        <li>{name}</li>
        <li>{genre}</li>
        <li>
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
        </li>
        <button onClick={DetailOnClick}>상세보기</button>
      </div>
      {detail.map((DetailList, index) => (
        <PlayDetailCard
          id={index}
          key={index}
          name={DetailList.artist_name}
          genre={DetailList.Genre}
          title={DetailList.title}
          img={DetailList.img_file}
        />
      ))}
    </>
  );
};

export default PlayCard;
