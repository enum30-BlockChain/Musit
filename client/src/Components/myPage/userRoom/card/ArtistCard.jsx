import React from "react";
import axios from "axios";

const ArtistCard = ({ id, name, setSelect, select, artistList, address }) => {
  const selectOnClick = (e) => {
    setSelect(e.target.value);
    console.log(select);
  };
  console.log(select);
  const likeOnClick = async () => {
    if (artistList[select] !== 0) {
      const likeSelect = artistList[select].artist_name;
      alert("가수" + likeSelect + "좋아합니다.");
      const url = "http://localhost:5000/artistlikes/like";
      const response = await axios
        .post(url, { address, likeSelect })
        .then((res) => {
          console.log(res.data);
          console.log(res.data);
        });
    }
  };

  return (
    <>
      <div>
        <div>
          {name}
          <input
            type="checkbox"
            name="likes"
            value={id}
            onClick={selectOnClick}
          ></input>
          <input type="button" onClick={likeOnClick}></input>
        </div>
      </div>
    </>
  );
};

export default ArtistCard;
