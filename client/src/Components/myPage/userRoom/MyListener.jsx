import React, { useEffect, useState } from "react";
import Metamask from "../../../web3/Matamask";
import UserList from "./page/UserList";
import UserState from "./page/UserState";
import axios from "axios";

const MyListener = () => {
  const [address, setAddress] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    const init = async () => {
      const metamaskResponse = await Metamask.getAccounts();
      setAddress(metamaskResponse.data[0]);
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
      <UserList address={address} />
    </>
  );
};

export default MyListener;
