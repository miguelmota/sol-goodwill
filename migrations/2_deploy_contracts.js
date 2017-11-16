const Goodwill = artifacts.require('./Goodwill.sol');

module.exports = function(deployer) {
  deployer.deploy(Goodwill)
}
