// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./EnglishAuction.sol";

contract AuctionMarketplace {
  using Counters for Counters.Counter;
  Counters.Counter auctionCounter;
  mapping(uint => EnglishAuction) auctionContracts;

  constructor () {

  }

  function enrollAuction(address _nft, uint _nftId, uint _startPrice) external returns(uint) {
    auctionCounter.increment();
    uint auctionId = auctionCounter.current();
    EnglishAuction item = new EnglishAuction(_nft, _nftId, _startPrice);
    auctionContracts[auctionId];
    return auctionId;
  }
}