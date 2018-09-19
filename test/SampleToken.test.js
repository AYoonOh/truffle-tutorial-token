const { expectThrow } = require("../helpers/expectThrow");
const { EVMRevert } = require("../helpers/EVMRevert");
const BigNumber = web3.BigNumber;

require("chai")
  .use(require("chai-bignumber")(BigNumber))
  .should();

const SampleToken = artifacts.require("SampleToken");

contract("SampleToken", function([_, owner, investor]) {
  let token;

  const _name = "SampleToken";
  const _symbol = "STK";
  const _decimals = 18;
  const _total_supply = new BigNumber(1000000);
  const _over_total_supply = new BigNumber(1100000000000000000000000);

  beforeEach(async function() {
    token = await SampleToken.new(_name, _symbol, _decimals, _total_supply, {
      from: owner
    });
  });

  describe("[테스트케이스 1 : 스마트컨트랙트가 선언된 변수에 맞게 정확히 생성되었는지 점검]", () => {
    it("1.1. 토큰 이름은 지정한 이름으로 생성되었는가?", async function() {
      (await token.name()).should.eq(_name);
    });

    it("1.2. 토큰 심볼은 지정한 심볼로 생성되었는가?", async function() {
      (await token.symbol()).should.eq(_symbol);
    });

    it("1.3. 토큰 decimals은 지정한 decimals로 생성되었는가?", async function() {
      (await token.decimals()).should.be.bignumber.equal(_decimals);
    });

    it("1.4. 토큰 총발행양은 지정한 total supply에 맞게 생성되었는가?", async function() {
      (await token.totalSupply()).should.be.bignumber.equal(
        1000000000000000000000000
      );
    });
  });

  describe("[테스트케이스 2 : 토큰 총발행양이 owner에게 제대로 transfer 되었는지 점검]", () => {
    it("2.1. 발행된 전체 토큰양과 owner가 가지고 있는 토큰 balance가 동일한가?", async function() {
      const totalSupply = await token.totalSupply();
      const ownerBalance = await token.balanceOf(owner);

      ownerBalance.should.be.bignumber.equal(totalSupply);
    });
  });

  describe("[테스트케이스 3: 구현된 기능이 제대로 동작하는지 점검]", () => {
    it("3.1. transfer 기능 점검 : 특정 address로 토큰 전송(transfer) 실행 후, 해당 address가 가지고 있는 토큰 balance가 전송된 토큰양과 일치 하는가?", async function() {
      await token.transfer(investor, 1000, { from: owner });

      const investorBalance = await token.balanceOf(investor);
      investorBalance.should.be.bignumber.equal(1000);
    });

    it("3.2. 토큰 총발행양보다 더 많은 토큰을 전송하려고 할때, revert가 되는가?", async function() {
      await expectThrow(
        token.transfer(investor, _over_total_supply, { from: owner }),
        EVMRevert
      );
    });
  });
});
