import "./Subscription.css";
import React from "react";
import Button from "@mui/material/Button";
import Ethers from "../../../../web3/Ethers"

export const Subscription = () => {
  var now = new Date();
  var year = now.getFullYear();   // 연도
  var month = now.getMonth()+1;   // 월    
  var day = now.getDate();        // 일

  const Subscription = (e) => {
    Ethers.buySubscription(e.target.id)
 }

  return (
    <>
     <div className="wrapper">
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
                        <li><h1>~{year} . {month+1} . {day}</h1></li>
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
                        <li><h1>~{year} . {month+3} . {day}</h1></li>
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
                        <li><h1>~{year} . {month+6} . {day}</h1></li>
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
