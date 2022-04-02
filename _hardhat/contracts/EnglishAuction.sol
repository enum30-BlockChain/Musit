// SPDX-License-Identifier : MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract EnglishAuction {
  event Start(uint indexed nftId, address indexed seller, uint endAt);
  event Bid(address indexed sender, uint amount);
  event Withdraw(address indexed bidder, uint amount);
  event End(address highestBidder, uint amount);

  // 경매에 올릴 nft 정보
  IERC721 public immutable nft;
  uint public immutable nftId;
  
  // 경매 올릴 때 필요한 정보
  address payable public immutable seller;
  uint public endAt;
  uint public duration;
  bool public started;
  bool public ended;

  // 경매 낙찰가 정보
  address public highestBidder;
  uint public highestBid;

  mapping (address => uint) public bids;
  
  constructor (
    address _nft,
    uint _nftId,
    uint _startingBid
  ) {
    nft = IERC721(_nft);
    nftId = _nftId;
    seller = payable(msg.sender);
    highestBid = _startingBid;
    duration = 1 hours;
  }

  function start() external {
    require(msg.sender == seller, "Only onwer can access");
    require(!started, "This item is already enrolled");
  
    started = true;
    endAt = uint32(block.timestamp +  duration);
    nft.transferFrom(seller, address(this), nftId);

    emit Start(nftId, msg.sender, endAt);
  }

  function bid() external payable {
    require(started, "This item is not on the auction list");
    require(block.timestamp < endAt, "ended");
    require(msg.value > highestBid, "value < highest bid");
    
    if (highestBidder != address(0)) {
      bids[highestBidder] += highestBid;
    }

    highestBid = msg.value;
    highestBidder = msg.sender;

    emit Bid(msg.sender, msg.value);
  }

  function withdraw() external {
    uint bal = bids[msg.sender];
    bids[msg.sender] = 0;
    payable(msg.sender).transfer(bal);
    emit Withdraw(msg.sender, bal);
  }

  function end() external {
    require(started, "not started");
    require(!ended, "ended");
    require(block.timestamp >= endAt, "not ended");

    ended = true;
    if (highestBidder != address(0)) {  
      nft.transferFrom(address(this), highestBidder, nftId);
      seller.transfer(highestBid);
    } else {
      nft.transferFrom(address(this), seller, nftId);
    }

    emit End(highestBidder, highestBid);
  }
}