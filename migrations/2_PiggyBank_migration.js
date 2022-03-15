const PiggyBank = artifacts.require("PiggyBank");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(PiggyBank);
};
