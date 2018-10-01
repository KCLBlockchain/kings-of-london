var KOLogic = artifacts.require("./KOLogic");
var KolStorageV1 = artifacts.require("./KolStorageV1");


module.exports = async function(deployer) {

    const logic = await KOLogic.deployed();
    const storage = await KolStorageV1.deployed();

    console.log("previous storage owner");
    console.log(storage.owner());
    
    /*
    // not currently working, transfer has to be done manually
    
    storage.transferOwnership(logic.address).then(function() {
        console.log("new storage owner");
        console.log(storage.owner());
    });
    */
};