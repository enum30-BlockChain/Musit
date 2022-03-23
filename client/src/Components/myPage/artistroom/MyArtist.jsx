import React, { useEffect, useState } from "react";
import Metamask from "../../../web3/Matamask";
import axios from "axios";

const MyArtist = () => {
  const [address, setAddress] = useState("");
  const [nickname, setNickname] = useState("");
  const [totallike, setTotalLike] = useState("");

  useEffect(() => {
    const init = async () => {
      const metamaskResponse = await Metamask.getAccounts();
      setAddress(metamaskResponse.data[0]);
      const url = "http://localhost:5000/artists/signin";
      const response = await axios.post(url, { address });
      setNickname(response.data.artist_name);
    };
    init();
    return () => {};
  }, [address]);

  const TotalLikeOnClick = () => {
    const url = "http://localhost:5000/artists/like";
    const response = axios.post(url, { address }).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <>
      <div>나의 주소는 : {address}</div>
      <div>나의 닉네임 : {nickname}</div>
      <div>
        <button onClick={TotalLikeOnClick}>총 좋아요</button>
      </div>
      <div>{totallike.length}</div>
      <div>등록한음원 NFT 조회</div>
      <div>곡별 재생시간</div>
      <div>총 재생시간</div>
      <div>청취 곡수</div>
      <div>Recently played</div>
      <div>My favorite</div>
      <div>나의 재생목록</div>
    </>
  );
};

export default MyArtist;
