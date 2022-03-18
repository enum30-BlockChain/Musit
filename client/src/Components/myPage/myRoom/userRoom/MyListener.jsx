import React, { useEffect, useState } from "react";
import Metamask from "../../../../web3/metamask";
import UserList from "./page/UserList";
import UserState from "./page/UserState";
import axios from "axios";
import RecentPlayed from "./page/RecentPlayed";

const MyListener = () => {
  const [address, setAddress] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    const init = async () => {
      const accounts = await Metamask.getAccounts();
      setAddress(accounts[0]);
      const url = "http://localhost:5000/users/signin";
      const response = await axios.post(url, { address });
      setResponse(response.data);
    };
    init();
    return () => {};
  }, [address]);

  return (
    <>
      <UserState
        address={address}
        response={response}
        setResponse={setResponse}
      />
      <div>총 재생시간</div>
      <div>청취 곡수</div>
      <RecentPlayed />
      <div>나의 재생목록</div>
      <UserList address={address} />
    </>
  );
};

export default MyListener;
