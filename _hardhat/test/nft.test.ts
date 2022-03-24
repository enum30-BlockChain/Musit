import {expect} from "chai";
import { ethers } from "hardhat";

interface contractType {
  name: Function;
  symbol: Function;
}

describe("MusitNFT", function () {
  let deployer, addr1, addr2, nft: contractType, marketplace;

  this.beforeEach(async () => {
    const NFT = await ethers.getContractFactory("MusitNFT");

    [deployer, addr1, addr2] = await ethers.getSigners();

    nft = await NFT.deploy();
  })

  describe("Deployment", async () => {
    it("name and symbol test", async () => {
      expect(await nft.name()).to.equal("Musit NFT");
      expect(await nft.symbol()).to.equal("MUSIT");
    })
  })
})