import { expect } from "chai";
import { ethers } from "hardhat";
const Musit = require("../artifacts/contracts/MusitNFT.sol/MusitNFT.json");


describe("MusitNFT", function () {
  // it("Deploy test", async function () {
  //   // const signer = await ethers.getSigners();
  //   // expect(signer).to.equal([]);

  //   const MusitNFT = await ethers.getContractFactory("MusitNFT");
  //   const musitNFT = await MusitNFT.deploy();
  //   await musitNFT.deployed();

  //   expect(typeof musitNFT.address).to.equal("string");
  // });
  it("", async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    // const abi = Musit.abi;
    // const contractAddress = "0xb712342eFf565b50289aE1090239f24D239D92a1";
    // const MusitNFT = new ethers.Contract(contractAddress, abi, signer);
    const txt = "asdf"
    expect(txt).to.be.a('string');
  })
});
