// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Ownable {
  address internal _owner;  // owner : 배포자 

  event OwnershipTransferred(address oldOwner,address newOwner);

  constructor () {
    _transferOwnership(msg.sender);
  }

  modifier onlyOwner {
    require(msg.sender == _owner, "Ownable: This is for only owner!");
    _;
  }

  // 컨트랙트 주소에 담긴 이더를 소유자에게 출금 
  function withdraw () onlyOwner external {
    payable(_owner).transfer(address(this).balance);
  }

  // 소유권 출력 함수
  function owner() public view returns(address) {
    return _owner;
  }

  // 소유권 포기 함수
  function _renounceOwnership() public onlyOwner {
    _transferOwnership(address(this));
  }

  // 소유자 이전 함수 (소유자가 address(0)가 아닌 경우)
  function transferOwnership(address _newOwner) public onlyOwner {
    require(_newOwner != address(0), "Ownable: new owner is the zero address");
    _transferOwnership(_newOwner);
  }

  // 소유자 이전 함수
  function _transferOwnership(address _newOwner) internal {
    address oldOwner = _owner;
    _owner = _newOwner;
    emit OwnershipTransferred(oldOwner, _newOwner);
  }
}