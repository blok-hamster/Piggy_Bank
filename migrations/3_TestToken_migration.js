const TestToken = artifacts.require("TestToken");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(TestToken);

 
};