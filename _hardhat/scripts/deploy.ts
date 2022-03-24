import fs from "fs";
import hre, { artifacts, ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);
  console.log(`Account balance : ${(await deployer.getBalance()).toString()}`);
  
  
  // We get the contract to deploy
  const MusitNFT = await ethers.getContractFactory("MusitNFT");
  const musitNFT = await MusitNFT.deploy();

  await musitNFT.deployed();
  console.log("MusitNFT deployed to:", musitNFT.address);

  saveJsonFilesToClientFolder(musitNFT, "MusitNFT")
}

interface Contract {
  address: string;
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
