var Migrations = artifacts.require("./Migrations.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  //deployer.deploy(Migrations, { from: accounts[1], gas:6721975, value: 5000000000000000000 });
};



// var WeightWagers = artifacts.require("WeightWagers");

// module.exports = function(deployer, network, accounts) {
//   //Deploy WeightWagers with value because you have to pay for oraclize calls
//   deployer.deploy(WeightWagers, { from: accounts[1], gas:6721975, value: 5000000000000000000 });
// };