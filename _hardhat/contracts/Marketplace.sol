// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Marketplace is ReentrancyGuard {
  using Counters for Counters.Counter;

  address payable public immutable feeAccount; // 수수료를 받을 주소
  uint256 public immutable feePercent; // 팔때 받을 수수료
  Counters.Counter public itemCount;
  
  struct Item {
    uint256 itemId; // 판매 등록한 아이템 id
    uint256 tokenId;  // 판매할 토큰 id
    uint256 price;
    address payable seller;
    IERC721 nft;
    bool sold;
  }
  
  event Enrolled (
    uint256 itemId,
    uint256 tokenId,
    uint256 price,
    address indexed seller,
    address indexed nft
  );

  event Bought (
    uint256 itemId,
    uint256 tokenId,
    uint256 price,
    address indexed seller,
    address indexed buyer,
    address indexed nft
  );

  mapping(uint256 => Item) public items; // itemId => Item

  constructor (uint256 _feePercent) {
    feeAccount = payable(msg.sender);
    feePercent = _feePercent;
  }

  function enrollItem(IERC721 _nft, uint256 _tokenId, uint256 _price) external nonReentrant {
    require(_price > 0, "Price must be greater than zero");
    require(msg.sender == _nft.ownerOf(_tokenId), "Only owner can enroll");


    itemCount.increment();
    uint256 itemId = itemCount.current();
    _nft.transferFrom(msg.sender, address(this), _tokenId);

    items[itemId] = Item (
      itemId,
      _tokenId,
      _price,
      payable(msg.sender),
      _nft,
      false
    );

    emit Enrolled (
      itemId,
      _tokenId,
      _price,
      msg.sender,
      address(_nft)
    );
  }

  function purchaseItem(uint256 _itemId) external payable nonReentrant {
    uint256 _totalPrice = getTotalPrice(_itemId);
    Item storage item = items[_itemId];
    require(_itemId > 0 && _itemId <= itemCount.current(), "Item doesn't exist");
    require(msg.value >= _totalPrice , "Not enough ether to cover item price and market fee");
    require(!item.sold, "Sold out!");

    // pay seller and fee account
    item.seller.transfer(item.price);
    feeAccount.transfer(_totalPrice - item.price);

    // update item to sold
    item.sold = true;

    // transfer nft to buyer
    item.nft.transferFrom(address(this), msg.sender, item.tokenId);

    // emit Bought event
    emit Bought(
      _itemId, 
      item.tokenId, 
      item.price, 
      item.seller, 
      msg.sender, 
      address(item.nft)
    );
  }

  function getTotalPrice(uint256 _itemId) view public returns (uint256) {
    return (items[_itemId].price * (100 + feePercent)) /100;
  }
}