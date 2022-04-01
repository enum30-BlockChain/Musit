import { Contract } from "ethers";
import fs from "fs";
import hre, { artifacts, ethers } from "hardhat";

async function main() {
  hre.run("compile")
  
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);
  console.log(`Account balance: ${(await deployer.getBalance()).toString()}`);
  
  
  // We get the contract to deploy
  const MusitNFT = await ethers.getContractFactory("MusitNFT");
  const musitNFT = await (await MusitNFT.deploy()).deployed();

  const Marketplace = await ethers.getContractFactory("Marketplace");
  const marketplace = await (await Marketplace.deploy(1)).deployed();

  console.log("MusitNFT address:", musitNFT.address);
  
  saveJsonFilesToClientFolder(musitNFT, "MusitNFT")
  saveJsonFilesToClientFolder(marketplace, "Marketplace")
}


function saveJsonFilesToClientFolder(contract: Contract, name: string) {
  const contractsDir = __dirname + "/../../client/src/web3/";

  if(!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify({contractAddress: contract.address, ...contractArtifact}, undefined, 4)
  )
}

main()
  .then(() => {
    process.exitCode = 0;
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
