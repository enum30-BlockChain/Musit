import React, { useState } from "react";
import axios from "axios";

const LikeCard = ({ id, name, address }) => {
  const [song, setSong] = useState([]);
  const [artist, setArtist] = useState([]);
  const [likedetail, setLikedetail] = useState([]);

  const SongOnClick = async () => {
    const url = "http://localhost:5000/files/likesong";
    const response = await axios.post(url, { address, name }).then((res) => {
      console.log(res.data);
      setLikedetail(res.data);
    });
  };

  return (
    <>
      <div name="ArtistLikeList" value={id}>
        <p name="likes" value={id}>
          <button onClick={SongOnClick}>{name}</button>
        </p>
        <div name="LikeCard">
          {likedetail.map((ArtistDetail, index) => {
            return (
              <>
                <th>{ArtistDetail.title}</th>
                <th>{ArtistDetail.Genre}</th>
                <th>{ArtistDetail.Artist.artist_name}</th>
                <th>{ArtistDetail.Artist.likes}</th>
                <img src={ArtistDetail.img_file} style={{ width: "100px" }} />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default LikeCard;
