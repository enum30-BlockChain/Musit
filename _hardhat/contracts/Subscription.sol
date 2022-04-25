// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Subscription {
  address owner;
  mapping (address => uint) endAt;

  enum Plans {
    OPTION0,
    OPTION1,
    OPTION2,
    OPTION3
  }

  constructor() {
    owner = msg.sender;
  }

  // 구독권 구매 함수
  function buy (Plans plan) external payable {
    require(msg.value >= getPrice(plan));
    uint startAt = block.timestamp; // 현재 시간
    endAt[msg.sender] = startAt + getDuration(plan);
    payable(owner).transfer(msg.value); // 구매한 금액 우리가 받아가기
  }
  
  // Plan에 따른 가격
  function getPrice (Plans plan) public pure returns(uint) {
    if(plan == Plans.OPTION1) {
      return 1 ether;
    } else if (plan == Plans.OPTION2) {
      return 2 ether;
    } else if (plan == Plans.OPTION3) {
      return 3 ether;
    } else {
      revert("Cannot get price for wrong plan");
    }
  }

  // Plan에 따른 구독 기간 
  function getDuration (Plans plan) public pure returns(uint) {
    if(plan == Plans.OPTION1) {
      return 30 days;
    } else if (plan == Plans.OPTION2) {
      return 60 days;
    } else if (plan == Plans.OPTION3) {
      return 90 days;
    } else {
      revert("Cannot get duration for wrong plan");
    }
  }
}