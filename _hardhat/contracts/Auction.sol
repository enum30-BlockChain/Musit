// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Auction is ReentrancyGuard, Ownable {
  using Counters for Counters.Counter;

  Counters.Counter public itemCounter;
  address payable public immutable feeAccount;
  uint public immutable feePercent;
  uint public minBidAmount;

  mapping (uint => Item) public items; // itemId => 경매아이템 : 경매에 올린 아이템 리스트
  mapping (uint => mapping (address => uint)) public pendingBids; // itemId => ( bidder => bid ) : 입찰하려고 올린 금액들

  enum StatusType { ENROLLED, CLOSED, CANCELLED }

  struct Item {
    uint startPrice;
    uint startAt;
    uint endAt;
    uint tokenId;
    address payable seller;
    address topBidder;
    uint topBid;
    StatusType status;
    IERC721 nft;
  }

  /* Event declaration */
  event Enrolled(
    uint indexed itemId,
    uint _startPrice,
    address _nft, 
    uint _tokenId, 
    address indexed seller
  );

  event Bid (uint indexed itemId, address indexed topBidder, uint topBid);
  event End(uint indexed itemId, address indexed buyer, uint buyingPrice);
  event Cancel(uint indexed itemId, address indexed seller);
  event Withdraw (uint indexed itemId, address indexed bidder, uint balance);

/* Constructor */
  constructor(uint _feePercent) {
    feePercent = _feePercent; // 수수료 
    feeAccount = payable(msg.sender); // 수수료를 받을 지갑 주소
    minBidAmount = 1000 wei;
  }

  /* Modifier declaration */
  modifier onlyNftOwner (IERC721 _nft, uint _tokenId) {
    require(msg.sender == _nft.ownerOf(_tokenId), "Only owner can enroll nft");
    _;
  }
  modifier onlySeller (uint _itemId) {
    require(msg.sender == items[_itemId].seller, "Only seller can end it.");
    _;
  }

  /* Function declaration */
  // 경매 아이템 등록 및 경매 시작 함수
  function enroll(uint _startPrice, uint _endAt, IERC721 _nft, uint _tokenId ) 
    external nonReentrant onlyNftOwner(_nft, _tokenId) {
    require(_startPrice >= minBidAmount, "Should start price is bigger than mininum bid amount");
    require(block.timestamp < _endAt, "Cannot set end time as past time");
    itemCounter.increment();
    uint _itemId = itemCounter.current();
    items[_itemId] = Item(
      _startPrice, 
      block.timestamp,
      _endAt/1000, 
      _tokenId, 
      payable(msg.sender),
      address(0),
      _startPrice,
      StatusType.ENROLLED,
      _nft
    );

    _nft.transferFrom(msg.sender, address(this), _tokenId);

    emit Enrolled(_itemId, _startPrice, address(_nft), _tokenId, msg.sender);
  }  

  // 경매 참여 함수
  function bid(uint _itemId) external payable nonReentrant {
    require(_itemId <= itemCounter.current(), "This item is not enrolled");
    Item storage auctionItem = items[_itemId];
    require(block.timestamp < auctionItem.endAt, "Auction is ended");
    require(auctionItem.status == StatusType.ENROLLED, "This auction is ended or cancelled");
    require(removeFee(msg.value) + pendingBids[_itemId][msg.sender] >= auctionItem.topBid + minBidAmount,
      "Bid amount should be bigger than prev top bid as much as minumum bid amount");

    if(auctionItem.topBidder != address(0)) {
      pendingBids[_itemId][auctionItem.topBidder] += auctionItem.topBid;
    }

    if(pendingBids[_itemId][msg.sender] > 0) {
      // 입찰을 이미 했던 사람은 총 입찰가격에 더해줌
      auctionItem.topBid = pendingBids[_itemId][msg.sender] + removeFee(msg.value);
    } else {
      auctionItem.topBid = removeFee(msg.value);
    }
    auctionItem.topBidder = msg.sender;

    emit Bid(_itemId, msg.sender, auctionItem.topBid);
  }

  // 경매 종료 함수
  function end(uint _itemId) external nonReentrant onlySeller(_itemId) {
    Item storage auctionItem = items[_itemId];
    require(auctionItem.status == StatusType.ENROLLED, "This item hasn't been enrolled");
    require(block.timestamp > auctionItem.endAt, "It is not the time to close auction");
    auctionItem.status = StatusType.CLOSED;

    if (auctionItem.topBidder != address(0)) {
      auctionItem.nft.transferFrom(address(this), auctionItem.topBidder, auctionItem.tokenId);
      auctionItem.seller.transfer(auctionItem.topBid); // 수수료 제외한 나머지 판매자에게 전송
      feeAccount.transfer((auctionItem.topBid * feePercent) / 100); // 수수료는 배포자에게 전송
      pendingBids[_itemId][auctionItem.topBidder] = 0;  // 입찰자는 출금을 못하도록 0으로 바꿈
    } else {
      auctionItem.nft.transferFrom(address(this), auctionItem.seller, auctionItem.tokenId);
    }
    
    emit End(_itemId, auctionItem.topBidder, auctionItem.topBid);
  }

  // 경매 강제 종료 함수
  function forceEnd(uint _itemId)  external nonReentrant onlyOwner  {
    Item storage auctionItem = items[_itemId];
    require(auctionItem.status == StatusType.ENROLLED, "This item hasn't been enrolled");
    auctionItem.status = StatusType.CLOSED;

    if (auctionItem.topBidder != address(0)) {
      auctionItem.nft.transferFrom(address(this), auctionItem.topBidder, auctionItem.tokenId);
      auctionItem.seller.transfer(auctionItem.topBid); // 수수료 제외한 나머지 판매자에게 전송
      feeAccount.transfer((auctionItem.topBid * feePercent) / 100); // 수수료는 배포자에게 전송
      pendingBids[_itemId][auctionItem.topBidder] = 0;  // 입찰자는 출금을 못하도록 0으로 바꿈
    } else {
      auctionItem.nft.transferFrom(address(this), auctionItem.seller, auctionItem.tokenId);
    }
    
    emit End(_itemId, auctionItem.topBidder, auctionItem.topBid);
  }

  // 경매 입찰 참여자가 없으면 경매 취소할 수 있는 함수
  function cancel(uint _itemId) external nonReentrant {
    Item storage auctionItem = items[_itemId];
    require(msg.sender == auctionItem.seller, "Only seller can cancel it");
    require(auctionItem.status == StatusType.ENROLLED , "It is already started or ended");
    require(auctionItem.topBidder == address(0), "Cannot cancel the item that is bidden");
    auctionItem.status = StatusType.CANCELLED;

    auctionItem.nft.transferFrom(address(this), auctionItem.seller, auctionItem.tokenId);

    emit Cancel(_itemId, msg.sender);
  }

  // 강제 취소 함수
  function forceCancel(uint _itemId) external nonReentrant onlyOwner {
    Item storage auctionItem = items[_itemId];
    require(auctionItem.status == StatusType.ENROLLED , "It is already started or ended");
    auctionItem.status = StatusType.CANCELLED;

    payable(auctionItem.topBidder).transfer(auctionItem.topBid);
    auctionItem.nft.transferFrom(address(this), auctionItem.seller, auctionItem.tokenId);

    emit Cancel(_itemId, msg.sender);
  }

  // pending bids 출금 함수
  function withdraw(uint _itemId) external nonReentrant {
    require(msg.sender != items[_itemId].topBidder);
    uint balance = pendingBids[_itemId][msg.sender];
    require(balance != 0, "Nothing to withdraw");
    pendingBids[_itemId][msg.sender] = 0;

    payable(msg.sender).transfer(balance);

    emit Withdraw(_itemId, msg.sender, balance);
  }
  
  function calPriceWithFee(uint _price) public view returns(uint) {
    return _price + getFee(_price);
  }

  function removeFee(uint _priceWithFee) public view returns (uint) {
    return _priceWithFee - getFee(_priceWithFee);
  }

  function getFee(uint _price) public view returns (uint) {
    return (_price * feePercent) / 100;
  }

  function getBlockTimestamp() public view returns (uint) {
    return block.timestamp;
  }
}