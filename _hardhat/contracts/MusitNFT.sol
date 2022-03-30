// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";



contract MusitNFT is ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;

  event MintMusitNFT (uint256 indexed tokenId, string tokenURI);

  uint256 public mintPrice; // 민팅 가격
  uint256 public totalSupplied; // 현재까지 발행된 총 수량
  uint256 public maxSupply; // 발행 총 수량
  uint256 public maxMintsPerWallet; // 지갑 당 민팅 총 수량
  Counters.Counter public tokenCount; // 발행할 NFT 토큰 Id

  mapping (address => uint256) mintsPerWallet; // 주소 => 현재까지 완료한 민팅 개수

  constructor () ERC721("Musit NFT","MUSIT") {
    mintPrice = 0.01 ether;
    maxSupply = 20;
    maxMintsPerWallet = 2;
  }

  function setMintPrice (uint256 _mintPrice) external onlyOwner {
    mintPrice = _mintPrice;
  }

  function setMaxSupply (uint256 _maxSupply) external onlyOwner {
    maxSupply = _maxSupply;
  }

  function setMaxMintsPerWallet (uint256 _maxMintsPerWallet) external onlyOwner {
    maxMintsPerWallet = _maxMintsPerWallet;
  }

  function getMintsPerWallet () external view returns (uint256) {
    return mintsPerWallet[msg.sender];
  }

  function minting (string memory _tokenURI) external payable returns (uint256) {
    require(msg.value == mintPrice, "Wrong value sent.");
    require(totalSupplied <= maxSupply, " Sold out!");
    require(mintsPerWallet[msg.sender] <= maxMintsPerWallet, "Exceed total supply.");
    
    tokenCount.increment();
    uint256 newTokenId = tokenCount.current();
    _safeMint(msg.sender, newTokenId);
    _setTokenURI(newTokenId, _tokenURI);
    emit MintMusitNFT(newTokenId, _tokenURI);
    mintsPerWallet[msg.sender]++;
    totalSupplied = newTokenId;

    return newTokenId;
  }
}