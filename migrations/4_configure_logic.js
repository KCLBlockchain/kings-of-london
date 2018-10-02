var KOLogic = artifacts.require("./KOLogic");

module.exports = async function(deployer) {

    const logic = await KOLogic.deployed();

    logic.addValidUniversity("KCL");
    logic.addValidUniversity("UCL");
    logic.addValidUniversity("LSE");
    logic.addValidUniversity("IMP");
};