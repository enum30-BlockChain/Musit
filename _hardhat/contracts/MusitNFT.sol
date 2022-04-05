// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";



contract MusitNFT is ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;

  event Minted (uint256 tokenId, string tokenURI, address indexed minter);

  uint256 public mintPrice; // 민팅 가격
  uint256 public totalSupplied; // 현재까지 발행된 총 수량
  Counters.Counter public tokenCount; // 발행할 NFT 토큰 Id

  constructor () ERC721("Musit NFT","MUSIT") {
    mintPrice = 0.001 ether;
  }

  function setMintPrice (uint256 _mintPrice) external onlyOwner {
    mintPrice = _mintPrice;
  }

  function minting (string memory _tokenURI) external payable returns (uint256) {
    require(msg.value == mintPrice, "Wrong value sent.");
    
    tokenCount.increment();
    uint256 newTokenId = tokenCount.current();
    _safeMint(msg.sender, newTokenId);
    _setTokenURI(newTokenId, _tokenURI);
    emit Minted(newTokenId, _tokenURI, msg.sender);
    totalSupplied = newTokenId;

    return newTokenId;
  }
}