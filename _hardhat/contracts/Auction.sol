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

  enum ItemStatus {
    ENROLLED, 
    AUCTION, 
    END 
  }

  struct Item {
    uint startPrice;
    uint startAt;
    uint endAt;
    IERC721 nft;
    uint tokenId;
    uint topBid;
    address topBidder;
    ItemStatus status;
    address payable seller; 
  }

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

  constructor(uint _feePercent) {
    feePercent = _feePercent;
    feeAccount = payable(msg.sender);
  }

  // 옥션 등록 함수
  function enroll (uint _startPrice, uint _startAt, uint _endAt, IERC721 _nft, uint _tokenId ) external nonReentrant {
    require(msg.sender == _nft.ownerOf(_tokenId));
    ItemCounter.increment();
    uint _itemId = ItemCounter.current();
    items[_itemId] = Item(
      _startPrice, 
      _startAt, 
      _endAt, 
      _nft, 
      _tokenId, 
      _startPrice,  // 처음 topBid == startPrice 
      address(0),
      ItemStatus.ENROLLED, 
      payable(msg.sender)
    );
    _nft.transferFrom(msg.sender, address(this), _tokenId);

    emit Enrolled(_itemId, _startPrice, _startAt, _endAt, address(_nft), _tokenId, msg.sender);
  }
  
  // 옥션 시작 함수
  function start(uint _itemId) external nonReentrant {
    Item storage _item = items[_itemId];
    require(_item.status == ItemStatus.ENROLLED, "Item is not enrolled or already started.");
    require(block.timestamp >= _item.startAt, "It is not time to start");
    
    _item.status = ItemStatus.AUCTION;

    emit Started(_itemId, _item.startPrice, _item.startAt, _item.endAt, address(_item.nft), _item.tokenId, _item.seller);
  }

  //TODO: 옥션 경매 참여 함수
  function bid(uint _itemId) external payable nonReentrant {
    Item storage _item = items[_itemId];
    require(_item.status == ItemStatus.AUCTION, "It is not in auction market");
    require(msg.value > _item.topBid, "Smaller than top bid price");

    if(_item.topBidder != address(0)) {
      pendingBids[_itemId][msg.sender] += msg.value;
    }

    _item.topBid = msg.value;
    _item.topBidder = msg.sender;

    // TODO: Bid 이벤트 만들기
  }


  // 옥션 끝내기 함수
  function end(uint _itemId) external nonReentrant {
    Item storage _item = items[_itemId];
    require(block.timestamp >= _item.endAt, "It is not time to end");
    require(_item.status == ItemStatus.AUCTION, "Can not find items in auction market");

    _item.status = ItemStatus.END;

    // TODO: End 이벤트 만들기
  }

}