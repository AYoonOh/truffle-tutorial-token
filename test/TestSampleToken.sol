pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/SampleToken.sol";

contract TestSampleToken {
  string expectedTokenName = "SampleToken";
  string expectedSymbol = "STK";
  uint8 expectedDecimals = 18;
  uint expectedTotalSupply = 1000000 * 10**uint(expectedDecimals);
  address investor = 0x72ba61f0c5752E2b6E7D2D5005c6A188077Eab39;

  function testSameTokenName() public {
    SampleToken sampleToken = SampleToken(DeployedAddresses.SampleToken());

    Assert.equal(sampleToken.name(), expectedTokenName, "토큰 이름이 다릅니다.");
  }

  function testSameSymbol() public {
    SampleToken sampleToken = SampleToken(DeployedAddresses.SampleToken());

    Assert.equal(sampleToken.symbol(), expectedSymbol, "토큰 심볼이 다릅니다.");
  }

  function testSameDecimals() public {
    SampleToken sampleToken = SampleToken(DeployedAddresses.SampleToken());

    Assert.equal(uint(sampleToken.decimals()), expectedDecimals, "토큰 십진수가 다릅니다.");
  }

  function testSameTotalSupply() public {
    SampleToken sampleToken = SampleToken(DeployedAddresses.SampleToken());

    Assert.equal(sampleToken.totalSupply(), expectedTotalSupply, "토큰 총 발행양이 다릅니다.");
  }

  function testCheckOwnerBalance() public {
    SampleToken sampleToken = SampleToken(DeployedAddresses.SampleToken());

    Assert.equal(sampleToken.balanceOf(sampleToken.owner()), expectedTotalSupply, "Owner의 Balance가 토큰 총 발행양과 다릅니다.");
  }

  // function testTransfer() public {
  //   SampleToken sampleToken = SampleToken(DeployedAddresses.SampleToken());
  //   sampleToken.transferFrom(sampleToken.owner(), investor, 10000000000);

  //   Assert.equal(sampleToken.balanceOf(investor), 10000000000, "transfer 실패하였습니다.");
  // }
}