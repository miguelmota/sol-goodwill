pragma solidity ^0.4.4;

contract Goodwill {
  uint256 public limit = 1 ether;

  function getBalance() returns (uint256) {
    return this.balance;
  }

  function receive(uint256 amount) public {
    if (amount > limit) {
      amount = limit;
    }

    if (this.balance > 0) {
      msg.sender.transfer(limit);
    }
  }

  function donate() public payable {}
  function() payable {}
}
