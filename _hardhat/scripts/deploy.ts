// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import hre, { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  await hre.run("compile");
  console.log("Compile done");
  
  // We get the contract to deploy
  const MusitNFT = await ethers.getContractFactory("MusitNFT");
  console.log("getContractFactoty done..");
  const musitNFT = await MusitNFT.deploy();
  console.log("deploy done..");

  await musitNFT.deployed();
  console.log("deployed done..");

  console.log("MusitNFT deployed to:", musitNFT.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => {
    process.exitCode = 0;
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
