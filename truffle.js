require("dotenv").config();
const HDWalletProvider = require("truffle-hdwallet-provider-privkey");
const privateKeys = [process.env.PRIVATEKEY];

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "*" // eslint-disable-line camelcase
    },
    ropsten: {
      provider: () =>
        new HDWalletProvider(
          privateKeys,
          "https://ropsten.infura.io/" + process.env.INFURA_API_KEY
        ),
      network_id: 3,
      gas: 4700000
    },
    main: {
      provider: () =>
        new HDWalletProvider(
          privateKeys,
          "https://mainnet.infura.io/" + process.env.INFURA_API_KEY
        ),
      network_id: 1,
      gas: 4700000
    }
  }
};
