// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Subscription {
  address owner;
  mapping (address => uint) endAt;

  enum Plans {
    OPTION0, // 첫 가입시 옵션
    OPTION1, // 구매권 옵션1
    OPTION2, // 구매권 옵션2
    OPTION3 // 구매권 옵션3
  }

  constructor() {
    owner = msg.sender;
  }

  // 구독권 구매 함수
  function buy (Plans plan) external payable {
    require(msg.value >= getPrice(plan));
    if (endAt[msg.sender] > block.timestamp) { // 이용 중인 경우는 기간 연장
      endAt[msg.sender] += getDuration(plan);
    } else { // 만료 되면 현재 시간에서부터 구독기간 시작
      uint startAt = block.timestamp; // 현재 시간
      endAt[msg.sender] = startAt + getDuration(plan);
    }
    payable(owner).transfer(msg.value); // 구매한 금액 우리가 받아가기
  }
  
  // Plan에 따른 가격
  function getPrice (Plans plan) public pure returns(uint) {
    if(plan == Plans.OPTION0) {
      return 0 ether; // 첫 가입시에는 무료
    } else if (plan == Plans.OPTION1) {
      return 0.01 ether;
    } else if (plan == Plans.OPTION2) {
      return 0.02 ether;
    } else if (plan == Plans.OPTION3) {
      return 0.03 ether;
    } else {
      revert("Cannot get price for wrong plan");
    }
  }

  // Plan에 따른 구독 기간 
  function getDuration (Plans plan) public pure returns(uint) {
    if(plan == Plans.OPTION0) {
      return 30 days;
    } else if (plan == Plans.OPTION1) {
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