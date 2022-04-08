import hre, { ethers } from "hardhat";

async function main() {
  hre.run("compile")
  
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);
  console.log(`Account balance: ${(await deployer.getBalance()).toString()}`);
  
  
  // We get the contract to deploy
  const MusitNFT = await ethers.getContractFactory("MusitNFT");
  const musitNFT = await MusitNFT.deploy();

  await musitNFT.deployed();
  console.log("MusitNFT address:", musitNFT.address);
}

main()
  .then(() => {
    process.exitCode = 0;
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
