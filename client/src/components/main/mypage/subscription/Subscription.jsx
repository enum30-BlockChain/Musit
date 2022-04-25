import "./Subscription.css";
import React from "react";
import Button from "@mui/material/Button";
import Ethers from "../../../../web3/Ethers"

export const Subscription = () => {
  var now = new Date();
  var year = now.getFullYear();   // 연도
  var month = now.getMonth()+1;   // 월    
  var day = now.getDate();        // 일

  const onClick = () => {
    Ethers.buySubscription(1, 1)
  }

  return (
    <>
     <div class="wrapper">
        <div class="pricing-table gprice-single">
            <div class="head">
                 <h4 class="title">30 days Supscription</h4> 
            </div>
            <div class="content">
                <div class="price">
                    <h1>1eth</h1>
                </div>
                <ul style={{height:"200px"}}>
                        <li><h1>Music free pass</h1></li>
                        <li><h1>Music upLoad free</h1></li>
                        <li><h1></h1></li>
                        <li><h1>~{year} . {month+1} . {day}</h1></li>
                    </ul>
                <div class="sign-up">
                    <a href="#" class="btn bordered radius">Signup Now</a>
                </div>
            </div>
        </div>
            <div class="pricing-table gprice-single">
                <div class="head">
                    <h4 class="title">60 days Supscription</h4>
                </div>
                <div class="content">
                    <div class="price">
                      <h1>2eth</h1>
                    </div>
                    <ul style={{height:"200px"}}>
                        <li><h1>Music free pass</h1></li>
                        <li><h1>Music upLoad free</h1></li>
                        <li><h1></h1></li>
                        <li><h1>~{year} . {month+3} . {day}</h1></li>
                    </ul>
                    <div class="sign-up">
                        <a href="#" class="btn bordered radius">Signup Now</a>
                    </div>
                </div>
            </div>
                <div class="pricing-table gprice-single">
                    <div class="head">
                        <h4 class="title">90 days Supscription</h4>
                    </div>
                    <div class="content">
                        <div class="price">
                            <h1>3eth</h1>
                        </div>
                        <ul style={{height:"200px"}}>
                        <li><h1>Music free pass</h1></li>
                        <li><h1>Music upLoad free</h1></li>
                        <li><h1></h1></li>
                        <li><h1>~{year} . {month+6} . {day}</h1></li>
                    </ul>
                        <div class="sign-up">
                            <a href="#" class="btn bordered radius">Signup Now</a>
                        </div>
                    </div>
                </div>
    </div>
    </>
  );
};
