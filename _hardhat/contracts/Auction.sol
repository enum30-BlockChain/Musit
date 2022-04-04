// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";



contract Auction is ReentrancyGuard {
  using Counters for Counters.Counter;

  address payable public immutable feeAccount;
  uint public immutable feePercent;
  Counters.Counter public ItemCounter;

  mapping (uint => Item) public items; // 경매에 올린 아이템 리스트
  mapping (uint => mapping (address => uint )) public pendingBids; // itemId => ( bidder => bid )

  enum StatusType { ENROLLED, STARTED, ENDED }

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
    uint _startAt, 
    uint _endAt, 
    address _nft, 
    uint _tokenId, 
    address indexed seller
  );

  event Started(
    uint indexed itemId,
    uint _startPrice,
    uint _startAt, 
    uint _endAt, 
    address _nft, 
    uint _tokenId, 
    address indexed seller
  );

  event Bid (uint itemId, address indexed topBidder, uint topBid);

  event Withdraw (uint itemId, address indexed bidder, uint amount);

  constructor(uint _feePercent) {
    feePercent = _feePercent;
    feeAccount = payable(msg.sender);
  }

  // 옥션 등록 함수
  function enroll (uint _startPrice, uint _startAt, uint _endAt, IERC721 _nft, uint _tokenId ) external nonReentrant {
    require(msg.sender == _nft.ownerOf(_tokenId), "Only owner can enroll nft");
    require(_startAt < _endAt, "End time should be later than start time");
    require(block.timestamp < _startAt, "Cannot set start time as past time");
    require(block.timestamp < _endAt, "Cannot set end time as past time");
    ItemCounter.increment();
    uint _itemId = ItemCounter.current();
    items[_itemId] = Item(
      _startPrice, 
      _startAt / 1000, 
      _endAt / 1000, 
      _tokenId, 
      payable(msg.sender),
      address(0),
      _startPrice, // 처음엔 top bid를 strat price로 설정
      StatusType.ENROLLED,
      _nft
    );

    _nft.transferFrom(msg.sender, address(this), _tokenId);

    emit Enrolled(_itemId, _startPrice, _startAt, _endAt, address(_nft), _tokenId, msg.sender);
  }
  

  // 옥션 경매 참여 함수
  function bid(uint _itemId) external payable nonReentrant {
    Item storage _item = items[_itemId];
    require(msg.value > _item.topBid, "Smaller than top bid price");
    statusCheck(_item);
    require(_item.status != StatusType.ENDED, "This auction is ended");

    if(_item.topBidder != address(0)) {
      pendingBids[_itemId][msg.sender] += msg.value;
    }

    _item.topBidder = msg.sender;
    _item.topBid = msg.value;

    emit Bid(_itemId, msg.sender, msg.value);
  }

  // pending bids 출금 함수
  function withdraw(uint _itemId) external {
    uint balance = pendingBids[_itemId][msg.sender];
    require(balance != 0, "Nothing to withdraw");
    pendingBids[_itemId][msg.sender] = 0;

    emit Withdraw(_itemId, msg.sender, balance);
  }

  function statusCheck(Item storage _item) internal {
    if(block.timestamp >= _item.startAt) {
      _item.status = StatusType.STARTED;
    } else {
      revert("Auction isn't started yet");
    }

    if (block.timestamp >= _item.endAt) {
      _item.status = StatusType.ENDED;
      revert("Auction is ended");
    }
  }

  function getBlockTimestamp() public view returns (uint) {
    return block.timestamp;
  }
}