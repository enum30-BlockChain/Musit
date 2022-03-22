// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// TODO: ERC721, Ownable 컨트랙트 불러오기
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SongNFT { // 불러온 컨트랙트들 상속하기
  uint256 public mintPrice; // 민팅가격
  uint256 public maxSupply; // 발행 총 수량
  uint256 public totalSupplied; // 현재까지 발행된 NFT 수량
  uint256 public maxMintsPerWallet; // 지갑 당 민팅 최대 수량
  uint256 public maxMintsPerTx; // 트랜잭션 당 민팅 최대 수량
  bool public isMintEnabled;  // 민팅 시작 결정
  string public baseTokenUri; // 토큰 URI

  mapping (address => uint256) mintsPerWallet;

  constructor () payable ERC721("Musit","MUSIT") {
    mintPrice = 0.01 ether;
    maxSupply = 1000;
    maxMintsPerWallet = 3;
    maxMintsPerTx = 1;
    _setBaseURI("https://ipfs.io/ipfs/");
  }

  function minting(uint256 _amount) external payable {
    require(isMintEnabled, "Minting is not enabled");
    require(msg.value == mintPrice, "Wrong mint value");
    require(totalSupplied + _amount <= maxSupply, "Exceed total supply. Adjust minting amount and retry it.");
    require(_amount <= maxMintsPerTx, "");
    require(_amount + mintsPerWallet[msg.sender] <= maxMintsPerWallet);

    for (uint256 i = 0; i < _amount; i++) {
      uint256 newTokenId = ++totalSupplied;
      _safeMint(msg.sender, newTokenId);
    }
  }
  function setMintPrice(uint256 _mintPrice) external onlyOwner {
    mintPrice = _mintPrice;
  }
  function setMaxSupply(uint256 _maxSupply) external onlyOwner {
    maxSupply = _maxSupply;
  }
  function setMaxMintsPerWallet(uint256 _maxMintsPerWallet) external onlyOwner {
    maxMintsPerWallet = _maxMintsPerWallet;
  }
  function setMaxMintsPerTx(uint256 _maxMintsPerTx) external onlyOwner {
    maxMintsPerTx = _maxMintsPerTx;
  }

  function setMintEnable(bool _isMintEnabled) external onlyOwner {
    isMintEnabled = _isMintEnabled;
  }
}