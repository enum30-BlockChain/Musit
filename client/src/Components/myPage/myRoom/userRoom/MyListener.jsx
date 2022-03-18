import React, { useEffect, useState } from "react";
import Metamask from "../../../../web3/metamask";
import LikeList from "./LikeList";
import UserState from "./UserState";

const MyListener = () => {
  const [address, setAddress] = useState("");
  useEffect(() => {
    const init = async () => {
      const accounts = await Metamask.getAccounts();
      setAddress(accounts[0]);
    };
    init();
    return () => {};
  }, []);

  return (
    <>
      <UserState address={address} />
      <div>총 재생시간</div>
      <div>청취 곡수</div>
      <div>Recently played</div>
      <div>나의 재생목록</div>
      <LikeList address={address} />
    </>
  );
};

export default MyListener;
