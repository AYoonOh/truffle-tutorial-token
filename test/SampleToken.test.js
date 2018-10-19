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

  describe("[Testcase 1 : check if the smart contract has been created as set in the variables]", () => {
    it("1.1. Is the token name the same as set in the variable?", async function() {
      (await token.name()).should.eq(_name);
    });

    it("1.2. Is the token symbol is the same as set in the variable?", async function() {
      (await token.symbol()).should.eq(_symbol);
    });

    it("1.3. Is the token decimals is the same as set in the variable?", async function() {
      (await token.decimals()).should.be.bignumber.equal(_decimals);
    });

    it("1.4. Is the total supply of the token the same as set in the variable total supply?", async function() {
      (await token.totalSupply()).should.be.bignumber.equal(
        1000000000000000000000000
      );
    });
  });

  describe("[Testcase 2 : check if the amount of the token supply has been transffered to the token owner]", () => {
    it("2.1. Is the total token amount issued are the same as that of the balance of the token owner?", async function() {
      const totalSupply = await token.totalSupply();
      const ownerBalance = await token.balanceOf(owner);

      ownerBalance.should.be.bignumber.equal(totalSupply);
    });
  });

  describe("[Testcase 3: check if the features implemented work as intended]", () => {
    it("3.1. Transfer feature: after transferring some tokens to a certain address, is the amount of the token transferred the same as that of the address that has received?", async function() {
      await token.transfer(investor, 1000, { from: owner });

      const investorBalance = await token.balanceOf(investor);
      investorBalance.should.be.bignumber.equal(1000);
    });

    it("3.2. When trying to transferring more tokens than the token supply, is it properly ‘reverted’? ", async function() {
      await expectThrow(
        token.transfer(investor, _over_total_supply, {
          from: owner
        }),
        EVMRevert
      );
    });
  });
});
