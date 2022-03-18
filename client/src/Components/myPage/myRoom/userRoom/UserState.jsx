import React, { useState } from "react";
import axios from "axios";

const UserState = ({ address }) => {
  const [subscription, setSubscription] = useState("");
  const [subscriptiontext, setSubscriptiontext] = useState("");

  const CheckOnClick = async () => {
    const url = "http://localhost:5000/users/signin";
    const response = await axios.post(url, { address });
    console.log(response.data);
    setSubscription({
      subscription: response.data.subscription,
    });
    if (!subscription.subscription) {
      setSubscriptiontext("나는 이용권이 없어요");
    } else {
      setSubscriptiontext("이용권이 있어요");
    }
  };

  const BuyOnclick = async () => {
    const url = "http://localhost:5000/users/buy";
    const response = await axios.post(url, { address });
    console.log(response.data);
    setSubscription({
      subscription: response.data.subscription,
    });
  };
  return (
    <div>
      <div>나의 주소는 : {address}</div>
      <div>
        <button onClick={CheckOnClick}>이용권 정보 조회</button>
        <button onClick={BuyOnclick}>이용권 구매하기</button>
      </div>
      <div>나의 이용권 상태는 : {subscriptiontext}</div>
    </div>
  );
};

export default UserState;
