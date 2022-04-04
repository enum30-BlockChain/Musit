import React, { useState } from "react";
import axios from "axios";
import "./css/LikeCard.css";

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
                <div className="Myfavorite_artist">
                  <div>
                    <p>title: {ArtistDetail.title}</p>
                    <p>Genre: {ArtistDetail.Genre}</p>
                    <p>ArtistName: {ArtistDetail.Artist.artist_name}</p>
                    <p>Like:{ArtistDetail.Artist.likes}</p>
                  </div>
                  <div>
                    <img
                      src={ArtistDetail.img_file}
                      style={{ width: "100px" }}
                    />
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default LikeCard;
