import { expect } from "chai";
import hre from "hardhat";
import { ethers } from "ethers";
const Musit = require("../artifacts/contracts/MusitNFT.sol/MusitNFT.json");


describe("MusitNFT", function () {
  this.beforeEach(async () => {
    const signers = await hre.ethers.getSigners();
  })
  // it("Deploy test", async function () {
    // const MusitNFT = await hre.ethers.getContractFactory("MusitNFT", signers[0]);
    //   const musitNFT = await MusitNFT.deploy();
    //   await musitNFT.deployed();
    //   expect(typeof musitNFT.address).to.equal("string");
  // });
  it("Function Test", async () => {
    const contractAddress = "0x6BC1A163881d4db2c8713fC5DbC6C8f690ef1B02";
    const AlchemyAPIKey = process.env.ALCHEMY_API_KEY;
    const provider = new ethers.providers.AlchemyProvider("ropsten", AlchemyAPIKey);
    const contract = new ethers.Contract(contractAddress, Musit.abi, provider);
    expect(contract.address).to.equal(contractAddress);
  })
});
