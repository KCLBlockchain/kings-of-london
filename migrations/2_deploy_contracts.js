var Escrow = artifacts.require("./Escrow");
var KOLogic = artifacts.require("./KOLogic");
var KolStorageV1 = artifacts.require("./KolStorageV1");
var OwnableLogic = artifacts.require("./OwnableLogic");
var OwnableStorage = artifacts.require("./OwnableStorage");
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
  deployer.link(PullPayment, KOLogic);

  deployer.deploy(KolStorageV1).then(function() {
    return deployer.deploy(KOLogic, 1, KolStorageV1.address)    
  });
  
};
