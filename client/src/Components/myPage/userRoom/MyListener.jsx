import React, { useEffect, useState } from "react";
import Metamask from "../../../web3/Matamask";
import UserList from "./page/UserList";
<<<<<<< HEAD
// import UserState from "./page/UserState";
import axios from "axios";
import RecentPlayed from "./page/RecentPlayed";
import MyPlayed from "./page/MyPlayed";
import ListenCount from "./page/ListenCount";
import TotalTime from "./page/TotalTime";
import Sidebar from "./../Sidebar";
=======
import UserSubscription from "./page/UserSubscription";
import axios from "axios";
import { Route, Link, Outlet } from "react-router-dom";
>>>>>>> main

const MyListener = () => {
  // const [address, setAddress] = useState("");
  // const [response, setResponse] = useState("");

  // useEffect(() => {
  //   const init = async () => {
  //     const metamaskResponse = await Metamask.getAccounts();
  //     setAddress(metamaskResponse.data[0]);
  //     const url = "http://localhost:5000/users/signin";
  //     const response = await axios.post(url, { address });
  //     setResponse(response.data);
  //   };
  //   init();
  //   return () => {};
  // }, [address]);

  return (
    <>
<<<<<<< HEAD
      <Sidebar />
      {/* <div>나의 주소는 : {address}</div>
      <UserState
        address={address}
        response={response}
        setResponse={setResponse}
      /> */}
      <TotalTime />
      <ListenCount />
      <RecentPlayed />
      <MyPlayed />
      {/* <UserList address={address} /> */}
=======
      <sidebar>
        <p>
          <Link to="/MyListener/UserSubscription">UserSubscription</Link>
        </p>
        <p>
          <Link to="/MyListener/UserList">UserList</Link>
        </p>
        <p>
          <Link to="/MyListener/myplaylist">MyPlayList</Link>
        </p>
      </sidebar>
      <Outlet context={[address, response, setResponse]} />

      {/* <div>
        <UserSubscription
          address={address}
          response={response}
          setResponse={setResponse}
        />
        <UserList address={address} />
      </div> */}
>>>>>>> main
    </>
  );
};

export default MyListener;
