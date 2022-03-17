// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Ownable {
  address owner;  // owner : 배포자 

  constructor () {
    owner = msg.sender;
  }

  modifier onlyOwner {
    require(msg.sender == owner);
    _;
  }

  function withdraw () onlyOwner external {
    
  }
}