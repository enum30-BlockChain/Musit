import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber, BigNumberish, ContractFactory } from "ethers";
import { ethers } from "hardhat";
import { Auction, MusitNFT } from "../typechain";

const ethToWei = (eth: number | string): BigNumber => ethers.utils.parseEther(eth.toString())
const weiToEth = (wei: BigNumberish): string => ethers.utils.formatEther(wei)

describe("Auction contract", () => {
  let deployer: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let musitNFT: MusitNFT;
  let auction: Auction;
  let feePercent = 1;

  beforeEach(async () => {
    [deployer, addr1, addr2] = await ethers.getSigners();

    const MusitNFT = await ethers.getContractFactory("MusitNFT");
    const Auction = await ethers.getContractFactory("Auction");
    musitNFT = await MusitNFT.deploy();
    auction = await Auction.deploy(feePercent);
  })

  describe("Deployment", async () => {
    it("MusitNFT Contract's name and symbol test", async () => {
      expect(await musitNFT.name()).to.equal("Musit NFT")
      expect(await musitNFT.symbol()).to.equal("MUSIT")
    })
    it("Auction Contract's feeAccount and feePercent test", async () => {
      expect(await auction.feeAccount()).to.equal(deployer.address)
      expect(await auction.feePercent()).to.equal(feePercent)
    })
  })

  describe("Function tests", async () => {
    let startPrice: number,
      startAt: number,
      endAt: number,
      nft: string;

    let tokenURI: string = "tokenURI";
    let mintPrice: number = 0.001;

    beforeEach(async ()=> {
      await musitNFT.connect(addr1).minting(tokenURI, {value : ethToWei(mintPrice)})
      await musitNFT.connect(addr1).approve(auction.address, 1);
      startPrice = 100
      startAt = Date.now();
      endAt = startAt + 60000 // 시작후 1분 뒤 종료
      nft = musitNFT.address;
    })

    describe("enroll",async () => {
      it("New enrolled item attributes test", async () => {
        expect(await musitNFT.ownerOf(1)).to.equal(addr1.address)
  
        await expect(await auction.connect(addr1).enroll(startPrice, startAt, endAt, nft, 1))
          .emit(auction, "Enrolled")
          .withArgs(1, startPrice, startAt, endAt, musitNFT.address, 1, addr1.address);
        
        const item = await auction.items(1)
        expect(item.startPrice).to.equal(startPrice);
        expect(item.startAt).to.equal(Math.floor(startAt / 1000));
        expect(item.endAt).to.equal(Math.floor(endAt / 1000));
        expect(item.nft).to.equal(musitNFT.address);
        expect(item.tokenId).to.equal(1);
        expect(item.seller).to.equal(addr1.address);
        expect(item.status).to.equal(0);
      })
    })

    describe("bid", async() => {

      beforeEach(async () => {
        await auction.connect(addr1).enroll(startPrice, startAt, endAt, nft, 1)
        startAt = Date.now();
        endAt = startAt + 10000 // 시작후 10초 뒤 종료
      })

      it("status change", async () => {
        // expect(await auction.getBlockTimestamp()).to.equal(Math.floor(startAt / 1000))
        expect((await auction.items(1)).status).to.equal(0)
        expect((await auction.items(1)).topBid).to.equal(startPrice);

        await auction.connect(addr1).start(1);
        expect(((await auction.items(1)).status)).to.equal(1);

        expect(await auction.connect(addr1).end(1)).to.be.revertedWith("It is not the time to close auction");
        // expect(((await auction.items(1)).status)).to.equal(1);

        // await auction.connect(addr2).bid(1, { value : 110})
        // expect((await auction.items(1)).topBid).to.equal(110);
        // expect((await auction.items(1)).topBidder).to.equal(addr2.address);
        // expect((await auction.items(1)).status).to.equal(1)
        
        // setTimeout(()=>{
        // }, 15000)
        // await auction.connect(deployer).bid(1, { value : 200})
        // expect((await auction.items(1)).status).to.equal(2)
        // expect((await auction.items(1)).topBid).to.equal(200);
        // expect((await auction.items(1)).topBidder).to.equal(deployer.address);
      })
    })
    
  })
})