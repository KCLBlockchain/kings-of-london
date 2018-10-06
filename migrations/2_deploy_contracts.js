var Escrow = artifacts.require("./Escrow");
var KOLogic = artifacts.require("./KOLogic");
var KolStorageV1 = artifacts.require("./KolStorageV1");
var OwnableLogic = artifacts.require("./Ownable");
var OwnableStorage = artifacts.require("./Ownable");
var PullPayment = artifacts.require("./PullPayment");
var SafeMath = artifacts.require("./SafeMath");

module.exports = function(deployer) {

  deployer.deploy([
    Escrow,
    OwnableLogic,
    OwnableStorage,
    PullPayment,
    SafeMath
  ]);
  
  deployer.link(OwnableStorage, KolStorageV1);
  deployer.link(OwnableLogic, KOLogic);
  
  deployer.deploy(KolStorageV1).then(function() {
    return deployer.deploy(KOLogic, 1, KolStorageV1.address)    
  });
  
};
