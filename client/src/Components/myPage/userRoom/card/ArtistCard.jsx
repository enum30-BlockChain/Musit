import React, { useState } from "react";
import axios from "axios";

const ArtistCard = ({ id, name, setSelect, select, artistList, address }) => {
  const [artist, setArtist] = useState([]);

  const selectOnClick = (e) => {
    setSelect(e.target.value);
  };

  const likeOnClick = async () => {
    if (artistList[select] !== 0) {
      const likeSelect = artistList[select].artist_name;
      alert("가수" + likeSelect + "좋아합니다.");
      console.log(likeSelect);
      console.log(address);
      const url = "http://localhost:5000/artists/likes/like";
      const response = await axios
        .post(url, { address, likeSelect })
        .then((res) => {});
    }
  };

  const SongOnClick = async () => {
    const url = "http://localhost:5000/files/likesong";
    const response = await axios.post(url, { address, name }).then((res) => {
      console.log(res.data);
      setArtist(res.data);
      return false;
    });
  };

  return (
    <>
      <div>
        <div>
          <button onClick={SongOnClick}>{name}</button>
          <div name="LikeCard">
            {artist.map((setArtist, index) => {
              return (
                <>
                  <div className="Myfavorite_artist">
                    <p>title: {setArtist.title}</p>
                    <p>Genre: {setArtist.Genre}</p>
                    <p>ArtistName: {setArtist.Artist.artist_name}</p>
                    <p>Like:{setArtist.Artist.likes}</p>
                    <img src={setArtist.img_file} style={{ width: "100px" }} />
                  </div>
                </>
              );
            })}
          </div>
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
