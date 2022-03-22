// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
  TODO: 토큰 uri 설정 함수, 토큰 uri 출력 함수, 출금 함수
*/

contract MusitNFT is ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;

  event MintMusitNFT (uint256 indexed tokenId, string tokenURI);

  uint256 public mintPrice; // 민팅 가격
  uint256 public totalSupplied; // 현재까지 발행된 총 수량
  uint256 public maxSupply; // 발행 총 수량
  uint256 public maxMintsPerWallet; // 지갑 당 민팅 총 수량
  uint256 public maxMintsPerTx; // 트랜잭션 당 민팅 총 수량
  bool public isMintEnabled;  // 민팅 가능 여부 결정
  Counters.Counter private tokenId; // 발행할 NFT 토큰 Id

  mapping (address => uint256) mintsPerWallet; // 사용자 현재까지 완료한 민팅 개수
  mapping (address => mapping(uint256 => uint256)) ownedNFT; // 주소가 소유한 NFT : 주소 => (tokenId => tokenURI)

  constructor () ERC721("Musit NFT","MUSIT") {
    mintPrice = 1 ether;
    maxSupply = 20;
    maxMintsPerWallet = 2;
    maxMintsPerTx = 1;
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

  function minting (string memory _tokenURI) external payable {
    require(isMintEnabled, "Mint system is not enabled yet.");
    require(msg.value == mintPrice, "Wrong value sent.");
    require(totalSupplied <= maxSupply, " Sold out!");
    require(mintsPerWallet[msg.sender] <= maxMintsPerWallet, "Exceed total supply.");
    
    tokenId.increment();
    uint256 newTokenId = tokenId.current();
    _safeMint(msg.sender, newTokenId);
    _setTokenURI(newTokenId, _tokenURI);
    emit MintMusitNFT(newTokenId, _tokenURI);
    totalSupplied = newTokenId;
  }
}