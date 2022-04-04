import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber, BigNumberish, ContractFactory } from "ethers";
import { ethers } from "hardhat";
import { Auction, MusitNFT } from "../typechain";

const ethToWei = (eth: number | string): BigNumber => ethers.utils.parseEther(eth.toString())
const weiToEth = (wei: BigNumberish): string => ethers.utils.formatEther(wei)
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe("Auction contract", () => {
  let deployer: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addr3: SignerWithAddress;
  let musitNFT: MusitNFT;
  let auction: Auction;
  let feePercent = 1;

  beforeEach(async () => {
    [deployer, addr1, addr2, addr3] = await ethers.getSigners();

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
      startPrice = 1000
      startAt = Math.floor(Date.now() / 1000)
      endAt =  startAt + 120 // 시작후 1분 뒤 종료
      nft = musitNFT.address;
    })

    describe("enroll",async () => {
      it("New enrolled item attributes test", async () => {
        expect(await musitNFT.ownerOf(1)).to.equal(addr1.address)
  
        await expect(await await auction.connect(addr1).enroll(startPrice, endAt, nft, 1))
          .emit(auction, "Enrolled")
          .withArgs(1, startPrice, musitNFT.address, 1, addr1.address);
        
        const item = await auction.items(1)
        expect(item.startPrice).to.equal(startPrice);
        // expect(item.startAt).to.equal(startAt); // 블록 타임스탬프와 현재 시간과 차이가 있음 : hardhat에서는 보통 10초 내외
        expect(item.endAt).to.equal(endAt);
        expect(item.tokenId).to.equal(1);
        expect(item.seller).to.equal(addr1.address);
        expect(item.topBidder).to.equal(ethers.constants.AddressZero);
        expect(item.topBid).to.equal(startPrice);
        expect(item.status).to.equal(0);
        expect(item.nft).to.equal(musitNFT.address);
      })
    })

    describe("bid", async() => {

      beforeEach(async () => {
        startPrice = 1000
        endAt = Math.floor(Date.now() / 1000) +  60 // 시작후 60초 뒤 종료
        await auction.connect(addr1).enroll(startPrice, endAt, nft, 1)
      })
      
      describe("status test", async () => {
        it("cancel status", async () => {
          expect((await auction.items(1)).status).to.equal(0); // enrolled
          await expect(auction.connect(addr2).cancel(1)).revertedWith("Only seller can cancel it")

          await expect(await auction.connect(addr1).cancel(1))
            .emit(auction, "Cancel")
            .withArgs(1, addr1.address);
            
          await expect(
            auction
              .connect(addr2)
              .bid(1, { value: auction.calPriceWithFee(startPrice) })
          ).revertedWith("This auction is ended or cancelled");
          
          expect((await auction.items(1)).status).to.equal(2); // cancelled
        });

        // it("end status", async () => {
        //   expect((await auction.items(1)).status).to.equal(0);
        //   expect((await auction.items(1)).topBid).to.equal(startPrice);

        //   await expect(auction.connect(addr1).end(1)).to.be.revertedWith(
        //     "It is not the time to close auction"
        //   );
        //   expect((await auction.items(1)).status).to.equal(0);

        //   await delay(15000);

        //   await auction.connect(addr1).end(1);
        //   expect((await auction.items(1)).status).to.equal(1);
        // });
      })
      
      describe("Bidding test", async() => {
        it("top bid and to bidder",async () => {
          // expect(await (await auction.items(1)).endAt).to.equal(await auction.connect(addr1).getBlockTimestamp())
          await auction.connect(addr2).bid(1, {value: auction.calPriceWithFee(3000)});
          expect((await auction.items(1)).topBid).to.equal(3000)
          expect((await auction.items(1)).topBidder).to.equal(addr2.address)
          await auction.connect(addr3).bid(1, {value: auction.calPriceWithFee(4000)});
          expect((await auction.items(1)).topBid).to.equal(4000)
          expect((await auction.items(1)).topBidder).to.equal(addr3.address)
        })
        it("revert test", async() => {
          
        })
      })
      
    })
    
  })
})