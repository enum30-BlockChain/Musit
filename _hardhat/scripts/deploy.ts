import fs from "fs";
import hre, { artifacts, ethers } from "hardhat";

async function main() {
  console.log("[First step] Compile")
  await hre.run("compile");
  console.log("Compile done");
  
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);
  console.log(`Account balance : ${(await deployer.getBalance()).toString()}`);
  
  
  // We get the contract to deploy
  const MusitNFT = await ethers.getContractFactory("MusitNFT");
  console.log("getContractFactoty done..");
  const musitNFT = await MusitNFT.deploy();
  console.log("deploy done..");

  await musitNFT.deployed();
  console.log("deployed done..");

  console.log("MusitNFT deployed to:", musitNFT.address);

  saveJsonFilesToClientFolder("contract..", "MusitNFT")
}

interface Contract {
  address: string;
}

function saveJsonFilesToClientFolder(contract: Contract, name: string) {
  const contractsDir = __dirname + "/../../client/src/web3/";

  if(!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({address: contract.address}, undefined, 2)
  )

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, undefined, 2)
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
