import React, { useEffect, useState } from "react";
import axios from "axios";

const UserState = ({ address, response, setResponse }) => {
  const [subscriptiontext, setSubscriptiontext] = useState(
    response.subscription
  );

  useEffect(() => {
    if (!response.subscription) {
      setSubscriptiontext("");
    } else {
      setSubscriptiontext("1개월 이용권이 있어요");
    }
  }, [response]);

  const BuyOnclick = async () => {
    const url = "http://localhost:5000/users/buy";
    const response = await axios.post(url, { address });
    console.log(response.data);
    setResponse({ ...response, subscription: true });
  };
  return (
    <div>
      <div>나의 주소는 : {address}</div>
      <div>
        <button onClick={BuyOnclick}>이용권 구매하기</button>
      </div>
      <div>나의 이용권 상태는 : {subscriptiontext}</div>
    </div>
  );
};

export default UserState;
