import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber, BigNumberish, ContractFactory, Transaction } from "ethers";
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
  let addr4: SignerWithAddress;
  let musitNFT: MusitNFT;
  let mintPrice: BigNumber;
  let auction: Auction;
  let feePercent = 1;

  beforeEach(async () => {
    [deployer, addr1, addr2, addr3, addr4] = await ethers.getSigners();
    mintPrice = ethToWei(0.0001)
    const MusitNFT = await ethers.getContractFactory("MusitNFT");
    const Auction = await ethers.getContractFactory("Auction");
    musitNFT = await MusitNFT.deploy(mintPrice);
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
    let startPrice: number;
    let startAt: number;
    let endAt: number;
    let nft: string;
    let tokenURI: string = "tokenURI";

    beforeEach(async ()=> {
      await musitNFT.connect(addr1).minting(tokenURI, {value : mintPrice})
      await musitNFT.connect(addr1).approve(auction.address, 1);
      startPrice = 1000
      startAt = Date.now()
      endAt =  startAt + 60000 // 시작후 1분 뒤 종료
      nft = musitNFT.address;
    })

    describe("enroll",async () => {
      it("New enrolled item attributes test", async () => {
        expect(await musitNFT.ownerOf(1)).to.equal(addr1.address)
  
        await expect(await auction.connect(addr1).enroll(startPrice, endAt, nft, 1))
          .emit(auction, "Enrolled")
          .withArgs(1, startPrice, musitNFT.address, 1, addr1.address);
        
        const item = await auction.items(1)
        expect(item.startPrice).to.equal(startPrice);
        // expect(item.startAt).to.equal(startAt); // 블록 타임스탬프와 현재 시간과 차이가 있음 : hardhat에서는 보통 10초 내외
        expect(item.endAt).to.equal(Math.floor(endAt/1000));
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

        it("end status", async () => {
          expect((await auction.items(1)).status).to.equal(0);
          expect((await auction.items(1)).topBid).to.equal(startPrice);

          await expect(auction.connect(addr1).end(1)).to.be.revertedWith(
            "It is not the time to close auction"
          );
          expect((await auction.items(1)).status).to.equal(0);

          await auction.connect(deployer).forceEnd(1);
          expect((await auction.items(1)).status).to.equal(1);
        });
      })
      
      describe("Multi-Bidding test", async() => {
        let initDeployerBalance: BigNumber;
        let initAddr1Balance: BigNumber;
        let finalDeployerBalance: BigNumber;
        let finalAddr1Balance: BigNumber;

        
        beforeEach(async () => {
          initDeployerBalance = await deployer.getBalance()
          initAddr1Balance = await addr1.getBalance()
          await (await auction.connect(addr2).bid(1, {value: await auction.calPriceWithFee(2000)})).wait();
          await (await auction.connect(addr3).bid(1, {value: await auction.calPriceWithFee(3000)})).wait();
          await (await auction.connect(addr4).bid(1, {value: await auction.calPriceWithFee(4000)})).wait();
        })

        it("top bid and to bidder",async () => {
          // 입찰 테스트
          // addr2: 2000 / addr3: 3000 / addr4: 4000
          // => topBidder: addr4 / topBid: 4000
          expect(await auction.pendingBids(1, addr2.address)).to.equal(2000);
          expect(await auction.pendingBids(1, addr3.address)).to.equal(3000);
          expect(await auction.pendingBids(1, addr4.address)).to.equal(4000);
          expect((await auction.items(1)).topBid).to.equal(4000);
          expect((await auction.items(1)).topBidder).to.equal(addr4.address);
          
          // addr2가 추가로 3000 더 입찰
          // addr2: 2000 + 3000 / addr3: 3000 / addr4: 4000
          // => topBidder: addr2 / topBid: 5000
          await auction.connect(addr2).bid(1, {value: auction.calPriceWithFee(3000)})
          expect(await auction.pendingBids(1, addr2.address)).to.equal(5000);
          expect(await auction.pendingBids(1, addr3.address)).to.equal(3000);
          expect(await auction.pendingBids(1, addr4.address)).to.equal(4000);
          expect((await auction.items(1)).topBid).to.equal(5000);
          expect((await auction.items(1)).topBidder).to.equal(addr2.address);
          
          // 도중 출금 가능
          await auction.connect(addr4).withdraw(1)
          expect(await auction.pendingBids(1, addr4.address)).to.equal(0);
          
          // Top bidder는 도중 출금 불가능
          await expect(auction.connect(addr2).withdraw(1)).revertedWith("Top bidder cannot withdraw")

          // 경매 강제 종료: topBid => 0
          await auction.connect(deployer).forceEnd(1);
          expect(await auction.pendingBids(1, addr2.address)).to.equal(0);
          expect(await auction.pendingBids(1, addr3.address)).to.equal(3000);

          // 경매 종료 시 top bidder 팬딩 금액 => 0 : 출금 불가능
          await expect(auction.connect(addr2).withdraw(1)).revertedWith("Nothing to withdraw")

          // 경매 종료 후 판매자 잔고 증가 확인
          finalAddr1Balance = initAddr1Balance.add((await auction.items(1)).topBid);
          expect(await addr1.getBalance()).to.equal(finalAddr1Balance);

          // 출금 후 팬딩 금액 변화 확인
          expect(await auction.pendingBids(1, addr3.address)).to.equal(3000)
          await auction.connect(addr3).withdraw(1)
          expect(await auction.pendingBids(1, addr3.address)).to.equal(0)

          // 수수료 체크 
          // : deployer가 forceEnd 해서 에러 남 => 다른 주소로 forceEnd 해줘야함
          // finalDeployerBalance = await deployer.getBalance();
          // let sumFee = await auction.getFee(2000 + 3000)
          // expect(finalDeployerBalance.sub(initDeployerBalance)).to.equal(sumFee)
        })
        
        it("Bid revert test", async() => {
          await expect(auction.connect(addr2).bid(2, {value: await auction.calPriceWithFee(2000)})).revertedWith("This item is not enrolled")
          await expect(auction.connect(addr2).bid(1, {value: await auction.calPriceWithFee(1100)})).revertedWith("Bid amount should be bigger than prev top bid as much as minumum bid amount")
          await expect(auction.connect(addr2).bid(1, {value: await auction.calPriceWithFee(900)})).revertedWith("Bid amount should be bigger than prev top bid as much as minumum bid amount")
          await expect(auction.connect(addr2).bid(1, {value: await auction.calPriceWithFee(900)})).revertedWith("Bid amount should be bigger than prev top bid as much as minumum bid amount")
          await auction.connect(deployer).forceCancel(1);
          await expect(auction.connect(addr2).bid(1, {value: await auction.calPriceWithFee(2000)})).revertedWith("This auction is ended or cancelled")
        })
      })
      
    })
    
  })
})