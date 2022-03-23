import React, { useEffect, useState } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

const UserSubscription = () => {
  const [subscriptiontext, setSubscriptiontext] = useState();

  const [address, response, setResponse] = useOutletContext();

  useEffect(() => {
    if (!response.subscription) {
      setSubscriptiontext("");
    } else {
      setSubscriptiontext("1개월 이용권이 있어요");
    }
  }, []);

  const BuyOnclick = async () => {
    const url = "http://localhost:5000/users/buy";
    const response = await axios.post(url, { address });
    setResponse({ ...response, subscription: true });
  };
  return (
    <div>
      <div>
        <button onClick={BuyOnclick}>이용권 구매하기</button>
      </div>
      <div>나의 이용권 상태는 : {subscriptiontext}</div>
    </div>
  );
};

export default UserSubscription;
