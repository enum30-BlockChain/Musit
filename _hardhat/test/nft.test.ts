import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

const ethToWei = (eth: number | string) => ethers.utils.parseEther(eth.toString())
const weiToEth = (wei: number | string) => ethers.utils.formatEther(wei.toString())

describe("MusitNFT", function () {
  let deployer: SignerWithAddress, addr1: SignerWithAddress, addr2 : SignerWithAddress, musitNFT: Contract, marketplace: Contract, URI: string;
  let feePercent = 1;
  URI = "Token URI";
  this.beforeEach(async () => {
    // Signer 정보들 받아오기
    [deployer, addr1, addr2] = await ethers.getSigners();
    
    // 컨트랙트 배포
    const MusitNFT = await ethers.getContractFactory("MusitNFT");
    const Marketplace = await ethers.getContractFactory("Marketplace");
    musitNFT = await MusitNFT.deploy();
    marketplace = await Marketplace.deploy(feePercent);
  })

  describe("Deployment", async () => {
    it("Should track name and symbol of MusitNFT contract", async () => {
      expect(await musitNFT.name()).to.equal("Musit NFT");
      expect(await musitNFT.symbol()).to.equal("MUSIT");
    })
    it("Should track feeAccount and feePercent of the marketplace", async() => {
      expect(await marketplace.feeAccount()).to.equal(deployer.address);  // 수수료를 받는 사람이 배포자인지 확인
      expect(await marketplace.feePercent()).to.equal(feePercent);  // 수수료 확인
    })
  })

  describe("Minting NFT", async () => {
    it("Should track each minted NFT", async () => {
      await musitNFT.connect(deployer).setIsMintEnabled(true);
      await musitNFT.connect(addr1).minting(URI, {value: ethToWei(0.01)})
      expect(await musitNFT.balanceOf(addr1.address)).to.equal(1)
      expect(await musitNFT.ownerOf(1)).to.equal(addr1.address)
      expect(await musitNFT.tokenURI(1)).to.equal(URI)
    })
  })
  
  describe("Enroll items into marketplace", async () => {
    let price = 2;
    
    beforeEach(async () => {
      await musitNFT.connect(deployer).setIsMintEnabled(true);
      await musitNFT.connect(addr1).minting(URI, {value: ethToWei(0.01)});
      await musitNFT.connect(addr1).approve(musitNFT.address, 1)
    })

    it("Should track new item's info, transfer NFT from seller to marketplace, and emit Enrolled event", async () => {
      await expect(
        marketplace.connect(addr1).enrollItem(musitNFT.address, 1, ethToWei(price))
      )
        .to.emit(marketplace, "Enrolled")
        .withArgs(1, 1, ethToWei(price), addr1.address, musitNFT.address);
    })
    
  })
})