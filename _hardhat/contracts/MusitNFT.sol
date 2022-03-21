// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
  TODO: 토큰 uri 설정 함수, 토큰 uri 출력 함수, 출금 함수
*/

contract MusitNFT is ERC721, Ownable {
  using Counters for Counters.Counter;

  uint256 public mintPrice; // 민팅 가격
  uint256 public totalSupplied; // 현재까지 발행된 총 수량
  uint256 public maxSupply; // 발행 총 수량
  uint256 public maxMintsPerWallet; // 지갑 당 민팅 총 수량
  uint256 public maxMintsPerTx; // 트랜잭션 당 민팅 총 수량
  bool public isMintEnabled;  // 민팅 가능 여부 결정
  Counters.Counter private tokenId;

  mapping (address => uint) mintsPerWallet;

  constructor () ERC721("Musit NFT","MUSIT") {
    mintPrice = 0.01 ether;
    maxSupply = 20;
    maxMintsPerWallet = 2;
    maxMintsPerTx = 1;
    _baseURI();
  }

  function setMintPrice (uint256 _mintPrice) external onlyOwner{
    mintPrice = _mintPrice;
  }

  function setMaxSupply (uint256 _maxSupply) external onlyOwner{
    maxSupply = _maxSupply;
  }

  function setMaxMintsPerWallet (uint256 _maxMintsPerWallet) external onlyOwner {
    maxMintsPerWallet = _maxMintsPerWallet;
  }

  function setMaxMintsPerTx (uint256 _maxMintPerTx) external onlyOwner {
    maxMintsPerTx = _maxMintPerTx;
  }

  function setIsMintEnabled (bool _isMintEnabled) external onlyOwner {
    isMintEnabled = _isMintEnabled;
  }

  function minting (uint256 _amount) external payable returns (uint256[] memory) {
    require(isMintEnabled, "Mint system is not enabled yet.");
    require(msg.value == mintPrice, "Wrong value sent.");
    require(_amount <= maxMintsPerTx);
    require(totalSupplied + _amount <= maxSupply, "Exceed total supply. Please adjust mint amount and try again.");
    require(mintsPerWallet[msg.sender] + _amount <= maxMintsPerWallet);

    uint256[] memory newTokenIdList;
    
    for(uint256 i = 0; i < _amount; i++) {
      tokenId.increment();
      uint256 newTokenId = tokenId.current();
      newTokenIdList[i] = newTokenId;
      _safeMint(msg.sender, newTokenId);
    }

    return newTokenIdList;
  }
}