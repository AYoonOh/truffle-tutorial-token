pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "openzeppelin-solidity/contracts/token/ERC20/PausableToken.sol";
import "openzeppelin-solidity/contracts/token/ERC20/StandardBurnableToken.sol";

contract SampleToken is DetailedERC20, MintableToken, PausableToken, StandardBurnableToken {
  constructor(string _name, string _symbol, uint8 _decimals, uint256 _totalSupply)
  DetailedERC20(_name, _symbol, _decimals)
  public {
    totalSupply_ = _totalSupply * 10**uint(decimals);
    balances[owner] = totalSupply_;
    emit Transfer(address(0), owner, totalSupply_);
  }
}