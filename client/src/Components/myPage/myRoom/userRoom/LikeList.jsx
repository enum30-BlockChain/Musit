import React, { useEffect, useState } from "react";
import Metamask from "../../../../web3/metamask";
import axios from "axios";

const LikeList = () => {
  const [address, setAddress] = useState("");
  const [atistList, setAtistList] = useState("");

  useEffect(() => {
    const init = async () => {
      const accounts = await Metamask.getAccounts();
      setAddress(accounts[0]);
    };
    init();
    return () => {};
  }, []);

  const LoginOnClick = async () => {
    const url = "http://localhost:5000/artists/likeList";
    const response = await axios.post(url, { address });
    console.log(response.data);
    setAtistList({ atistList: response.data.artist_name });
  };
  return (
    <div>
      <button onClick={LoginOnClick}>LikeList</button>
      <div>Song List : </div>
      <div>Artist List : {atistList.atistList}</div>
    </div>
  );
};

export default LikeList;
