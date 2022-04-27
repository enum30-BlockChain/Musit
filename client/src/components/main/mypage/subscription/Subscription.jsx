import "./Subscription.css";
import React, { useEffect, useState } from "react";
import Ethers from "../../../../web3/Ethers";
import SimpleBackdrop from "../../../SimpleBackdrop";
import { useNavigate } from "react-router-dom";

const fakeFetch = (delay = 500) => new Promise((res) => setTimeout(res, delay));

export const Subscription = () => {
  const [lodingState, setLoadingState] = useState(true);
  const nowDate = Date.now();
  const dayAfter30 = new Date(nowDate + 1000 * 60 * 60 * 24 * 30);
  const dayAfter90 = new Date(nowDate + 1000 * 60 * 60 * 24 * 90);
  const dayAfter180 = new Date(nowDate + 1000 * 60 * 60 * 24 * 180);
  const [couponUsedState, setCouponUsedState] = useState(false);
  const navigate = useNavigate();

  const getBuySubscription = async (e) => {
    setLoadingState(true);
    const result = await Ethers.buySubscription(e.target.id);
    setLoadingState(false);
    console.log(result);
    if (result && result.confirmation === 1) {
      window.alert("구매에 성공했습니다");
      navigate("/mypage");
    } else {
      window.alert("구매에 실패했습니다");
    }
  };

  useEffect(async () => {
    const state = await Ethers.getIsFreeCouponUsed();
    setCouponUsedState(state);
    await fakeFetch();
    setLoadingState(false);
  }, []);

  return (
    <>
      {lodingState ? (
        <SimpleBackdrop />
      ) : (
        <div className="wrapper">
          {!couponUsedState && (
            <div className="pricing-table gprice-single">
              <div className="head">
                <h4 className="title">30 days Free Supscription</h4>
              </div>
              <div className="content">
                <div className="price">
                  <h1>Free</h1>
                </div>
                <ul style={{ height: "200px" }}>
                  <li>
                    <h1>첫 가입시 1달무료 쿠폰 증정</h1>
                  </li>
                  <li>
                    <h1>Music free pass</h1>
                  </li>
                  <li>
                    <h1>Music upLoad free</h1>
                  </li>
                  <li>
                    <h1>
                      ~{dayAfter30.getYear() + 1900} .{" "}
                      {dayAfter30.getMonth() + 1} . {dayAfter30.getDate()}
                    </h1>
                  </li>
                </ul>
                <div className="sign-up">
                  <a
                    onClick={getBuySubscription}
                    id="0"
                    className="btn bordered radius"
                  >
                    Buy Now
                  </a>
                </div>
              </div>
            </div>
          )}

          <div className="pricing-table gprice-single">
            <div className="head">
              <h4 className="title">30 days Supscription</h4>
            </div>
            <div className="content">
              <div className="price">
                <h1>0.01eth</h1>
              </div>
              <ul style={{ height: "200px" }}>
                <li>
                  <h1>Music free pass</h1>
                </li>
                <li>
                  <h1>Music upLoad free</h1>
                </li>
                <li>
                  <h1></h1>
                </li>
                <li>
                  <h1>
                    ~{dayAfter30.getYear() + 1900} . {dayAfter30.getMonth() + 1}{" "}
                    . {dayAfter30.getDate()}
                  </h1>
                </li>
              </ul>
              <div className="sign-up">
                <a
                  onClick={getBuySubscription}
                  id="1"
                  className="btn bordered radius"
                >
                  Buy Now
                </a>
              </div>
            </div>
          </div>

          <div className="pricing-table gprice-single">
            <div className="head">
              <h4 className="title">90 days Supscription</h4>
            </div>
            <div className="content">
              <div className="price">
                <h1>0.02eth</h1>
              </div>
              <ul style={{ height: "200px" }}>
                <li>
                  <h1>Music free pass</h1>
                </li>
                <li>
                  <h1>Music upLoad free</h1>
                </li>
                <li>
                  <h1></h1>
                </li>
                <li>
                  <h1>
                    ~{dayAfter90.getYear() + 1900} . {dayAfter90.getMonth() + 1}{" "}
                    . {dayAfter90.getDate()}
                  </h1>
                </li>
              </ul>
              <div className="sign-up">
                <a
                  onClick={getBuySubscription}
                  id="2"
                  className="btn bordered radius"
                >
                  Buy Now
                </a>
              </div>
            </div>
          </div>

          <div className="pricing-table gprice-single">
            <div className="head">
              <h4 className="title">180 days Supscription</h4>
            </div>
            <div className="content">
              <div className="price">
                <h1>0.03eth</h1>
              </div>
              <ul style={{ height: "200px" }}>
                <li>
                  <h1>Music free pass</h1>
                </li>
                <li>
                  <h1>Music upLoad free</h1>
                </li>
                <li>
                  <h1></h1>
                </li>
                <li>
                  <h1>
                    ~{dayAfter180.getYear() + 1900} .{" "}
                    {dayAfter180.getMonth() + 1} . {dayAfter180.getDate()}
                  </h1>
                </li>
              </ul>
              <div className="sign-up">
                <a
                  onClick={getBuySubscription}
                  id="3"
                  className="btn bordered radius"
                >
                  Buy Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
