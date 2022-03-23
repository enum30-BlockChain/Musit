import React, { useEffect, useState } from "react";
import Metamask from "../../../web3/Matamask";
import UserList from "./page/UserList";
import UserSubscription from "./page/UserSubscription";
import axios from "axios";
import { Route, Link } from "react-router-dom";

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
      <sidebar>
        <p>
          <Link to="/UserSubscription">UserSubscription</Link>
        </p>
        <p>
          <Link to="/UserList">UserList</Link>
        </p>
      </sidebar>
      <div>
        {/* <Route
          path="UserSubscription"
          element={
            <UserSubscription
              address={address}
              response={response}
              setResponse={setResponse}
            />
          }
        ></Route>
        <Route path="UserList" element={<UserList address={address} />}></Route> */}
        <UserSubscription
          address={address}
          response={response}
          setResponse={setResponse}
        />
        <UserList address={address} />
      </div>
    </>
  );
};

export default MyListener;
