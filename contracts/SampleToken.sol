pragma solidity ^0.4.25;

import "openzeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract SampleToken is DetailedERC20, StandardToken {
  constructor(string _name, string _symbol, uint8 _decimals, uint256 _totalSupply)
  DetailedERC20(_name, _symbol, _decimals)
  public {
    totalSupply_ = _totalSupply;
  }
}