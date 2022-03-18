import React, { useEffect, useState } from "react";
import Metamask from "../../../../web3/Metamask";
import UserList from "./page/UserList";
import UserState from "./page/UserState";
import axios from "axios";
import RecentPlayed from "./page/RecentPlayed";
import MyPlayed from "./page/MyPlayed";
import ListenCount from "./page/ListenCount";
import TotalTime from "./page/TotalTime";

const MyListener = () => {
  const [address, setAddress] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    const init = async () => {
      const responseMetamask = await Metamask.getAccounts();
      const accounts = responseMetamask.data;
      console.log(responseMetamask.message);
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
      <div>나의 주소는 : {address}</div>
      <UserState
        address={address}
        response={response}
        setResponse={setResponse}
      />
      <TotalTime />
      <ListenCount />
      <RecentPlayed />
      <MyPlayed />
      <UserList address={address} />
    </>
  );
};

export default MyListener;
