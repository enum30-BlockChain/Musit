import React, { useEffect, useState } from "react";
import axios from "axios";
import ArtistCard from "./card/ArtistCard";
import LikeCard from "./card/LikeCard";

export const ArtistsTest = ({ address }) => {
  const [likelist, setLikelist] = useState([""]);
  const [artistList, setAtistList] = useState([]);
  const [select, setSelect] = useState("");

  useEffect(() => {
    const LoginOnClick = async () => {
      const url = "http://localhost:5000/artists/list";
      const response = await axios.get(url);
      setAtistList(response.data);
    };
    const LikeListOnClick = () => {
      const url = "http://localhost:5000/artists/likes/list";
      const response = axios.post(url, { address }).then((res) => {
        setLikelist(res.data);
      });
    };
    LikeListOnClick();
    LoginOnClick();
  }, []);

  console.log(likelist);
  //내가 좋아하는 아티스트를 불러오는 핸들러
  return (
    <>
      <div>
        <div>
          ArtistLikeList
          {likelist.map((LikeList, index) => (
            <LikeCard
              id={index}
              key={index}
              name={LikeList.artist_artist_name}
              likes={LikeList.likes}
              address={address}
            />
          ))}
        </div>
      </div>
      <div>
        ArtistList
        <div>
          {artistList.map((list, index) => (
            <ArtistCard
              id={index}
              key={index}
              name={list.artist_name}
              setSelect={setSelect}
              select={select}
              artistList={artistList}
              address={address}
            />
          ))}
        </div>
      </div>
    </>
  );
};
