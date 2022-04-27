import "./Subscription.css";
import React from "react";
import Ethers from "../../../../web3/Ethers"

export const Subscription = () => {
    const nowDate = Date.now()
    const dayAfter30 = new Date(nowDate + 1000 * 60 * 60 * 24 * 30)
    const dayAfter90 = new Date(nowDate + 1000 * 60 * 60 * 24 * 90)
    const dayAfter180 = new Date(nowDate + 1000 * 60 * 60 * 24 * 180)
  
  const Subscription = (e) => {
    Ethers.buySubscription(e.target.id)
 }

  return (
    <>
     <div className="wrapper">
         
        <div className="pricing-table gprice-single">
            <div className="head">
                 <h4 className="title">30 days Free Supscription</h4> 
            </div>
            <div className="content">
                <div className="price">
                    <h1>Free</h1>
                </div>
                <ul style={{height:"200px"}}>
                        <li><h1>첫 가입시 1달무료 쿠폰 증정</h1></li>
                        <li><h1>Music free pass</h1></li>
                        <li><h1>Music upLoad free</h1></li>
                        <li><h1>~{dayAfter30.getYear()+1900} . {dayAfter30.getMonth() + 1} . {dayAfter30.getDate()}</h1></li>
                    </ul>
                <div className="sign-up">
                    <a onClick={Subscription} id='0' className="btn bordered radius">Buy Now</a>
                </div>
            </div>
        </div>

        <div className="pricing-table gprice-single">
            <div className="head">
                 <h4 className="title">30 days Supscription</h4> 
            </div>
            <div className="content">
                <div className="price">
                    <h1>0.01eth</h1>
                </div>
                <ul style={{height:"200px"}}>
                        <li><h1>Music free pass</h1></li>
                        <li><h1>Music upLoad free</h1></li>
                        <li><h1></h1></li>
                        <li><h1>~{dayAfter30.getYear()+1900} . {dayAfter30.getMonth() + 1} . {dayAfter30.getDate()}</h1></li>
                    </ul>
                <div className="sign-up">
                    <a onClick={Subscription} id='1' className="btn bordered radius">Buy Now</a>
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
                <ul style={{height:"200px"}}>
                    <li><h1>Music free pass</h1></li>
                    <li><h1>Music upLoad free</h1></li>
                    <li><h1></h1></li>
                    <li><h1>~{dayAfter90.getYear()+1900} . {dayAfter90.getMonth() + 1} . {dayAfter90.getDate()}</h1></li>
                </ul>
                <div className="sign-up">
                    <a onClick={Subscription} id='2' className="btn bordered radius">Buy Now</a>
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
                <ul style={{height:"200px"}}>
                <li><h1>Music free pass</h1></li>
                <li><h1>Music upLoad free</h1></li>
                <li><h1></h1></li>
                <li><h1>~{dayAfter180.getYear()+1900} . {dayAfter180.getMonth() + 1} . {dayAfter180.getDate()}</h1></li>
            </ul>
                <div className="sign-up">
                    <a onClick={Subscription} id='3' className="btn bordered radius">Buy Now</a>
                </div>
            </div>
        </div>
    </div>
    </>
  );
};
