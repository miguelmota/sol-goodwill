require('dotenv').config()
const HDWalletProvider = require('truffle-hdwallet-provider')

const mnemonic = process.env.MNEMONIC

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io'),
      network_id: '*',
      gas: 4500000,
      gasPrice: 25000000000,
    },
  }
}
