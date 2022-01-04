import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { constants } from "ethers";
import Config from "../Config";
import Wallet from "../klaytn/Wallet";
import PFPStoreArtifact from "./abi/klubs/artifacts/contracts/PFPStore.sol/PFPStore.json";
import Contract from "./Contract";
import MixContract from "./MixContract";
import KIP17Contract from "./standard/KIP17Contract";

interface Sale {
    seller: string,
    price: BigNumber,
}

interface PFPInfo {
    pfp: string,
    id: number,
    price: BigNumber,
}

interface OfferInfo {
    offeror: string,
    price: BigNumber,
}

interface Auction {
    seller: string,
    startPrice: BigNumber,
    endBlock: number,
}

interface Bidding {
    bidder: string,
    price: BigNumber,
}

class PFPStoreContract extends Contract {

    constructor() {
        super(Config.contracts.PFPStore, PFPStoreArtifact.abi);
    }

    public async sales(addr: string, id: BigNumberish): Promise<Sale> {
        const results = await this.runMethod("sales", addr, id);
        return {
            seller: results[0],
            price: BigNumber.from(results[1]),
        };
    }

    public async checkSelling(addr: string, id: BigNumberish): Promise<boolean> {
        return await this.runMethod("checkSelling", addr, id);
    }

    public async userSellInfo(seller: string, index: BigNumberish): Promise<PFPInfo> {
        const results = await this.runMethod("userSellInfo", seller, index);
        return {
            pfp: results[0],
            id: parseInt(results[1], 10),
            price: BigNumber.from(results[2]),
        };
    }

    public async userSellInfoLength(seller: string): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("userSellInfoLength", seller));
    }

    public async sell(addrs: string[], ids: BigNumberish[], prices: BigNumberish[]): Promise<void> {
        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {
            for (const addr of addrs) {
                const nftContract = new KIP17Contract(addr);
                if (await nftContract.isApprovedForAll(owner, this.address) !== true) {
                    await nftContract.setApprovalForAll(this.address, true);
                }
            }
            await this.runWalletMethod("sell", addrs, ids, prices);
        }
    }

    public async cancelSale(addr: string[], ids: BigNumberish[]): Promise<void> {
        await this.runWalletMethod("cancelSale", addr, ids);
    }

    public async onSalesCount(addr: string): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("onSalesCount", addr));
    }

    public async onSales(addr: string, index: BigNumberish): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("onSales", addr, index));
    }

    public async buy(addr: string[], ids: BigNumberish[]): Promise<void> {
        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {
            if ((await MixContract.allowance(owner, this.address)).lt(constants.MaxUint256.div(2))) {
                await MixContract.approve(this.address, constants.MaxUint256);
                await new Promise<void>((resolve) => {
                    setTimeout(async () => {
                        await this.runWalletMethod("buy", addr, ids);
                        resolve();
                    }, 2000);
                });
            } else {
                await this.runWalletMethod("buy", addr, ids);
            }
        }
    }

    public async offers(addr: string, id: BigNumberish, offerId: BigNumberish): Promise<OfferInfo> {
        const results = await this.runMethod("offers", addr, id, offerId);
        return {
            offeror: results[0],
            price: BigNumber.from(results[1]),
        };
    }

    public async userOfferInfo(offeror: string, index: BigNumberish): Promise<PFPInfo> {
        const results = await this.runMethod("userOfferInfo", offeror, index);
        return {
            pfp: results[0],
            id: parseInt(results[1], 10),
            price: BigNumber.from(results[2]),
        };
    }

    public async userOfferInfoLength(offeror: string): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("userOfferInfoLength", offeror));
    }

    public async offerCount(addr: string, id: BigNumberish): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("offerCount", addr, id));
    }

    public async makeOffer(addr: string, id: BigNumberish, price: BigNumberish): Promise<void> {
        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {
            if ((await MixContract.allowance(owner, this.address)).lt(constants.MaxUint256.div(2))) {
                await MixContract.approve(this.address, constants.MaxUint256);
                await new Promise<void>((resolve) => {
                    setTimeout(async () => {
                        await this.runWalletMethod("makeOffer", addr, id, price);
                        resolve();
                    }, 2000);
                });
            } else {
                await this.runWalletMethod("makeOffer", addr, id, price);
            }
        }
    }

    public async cancelOffer(addr: string, id: BigNumberish, offerId: BigNumberish): Promise<void> {
        await this.runWalletMethod("cancelOffer", addr, id, offerId);
    }

    public async cancelOfferByOwner(addrs: string[], ids: BigNumberish[], offerIds: BigNumberish[]): Promise<void> {
        await this.runWalletMethod("cancelOfferByOwner", addrs, ids, offerIds);
    }

    public async acceptOffer(addr: string, id: BigNumberish, offerId: BigNumberish): Promise<void> {
        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {
            const nftContract = new KIP17Contract(addr);
            if (await nftContract.isApprovedForAll(owner, this.address) !== true) {
                await nftContract.setApprovalForAll(this.address, true);
            }
            await this.runWalletMethod("acceptOffer", addr, id, offerId);
        }
    }

    public async onAuctionsCount(addr: string): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("onAuctionsCount", addr));
    }

    public async onAuctions(addr: string, index: BigNumberish): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("onAuctions", addr, index));
    }

    public async auctions(addr: string, id: BigNumberish): Promise<Auction> {
        const results = await this.runMethod("auctions", addr, id);
        return {
            seller: results[0],
            startPrice: BigNumber.from(results[1]),
            endBlock: parseInt(results[2], 10),
        };
    }

    public async createAuction(addr: string, id: BigNumberish, startPrice: BigNumberish, endBlock: BigNumberish): Promise<void> {
        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {
            const nftContract = new KIP17Contract(addr);
            if (await nftContract.isApprovedForAll(owner, this.address) !== true) {
                await nftContract.setApprovalForAll(this.address, true);
            }
            await this.runWalletMethod("createAuction", addr, id, startPrice, endBlock);
        }
    }

    public async checkAuction(addr: string, id: BigNumberish): Promise<boolean> {
        return await this.runMethod("checkAuction", addr, id);
    }

    public async userAuctionInfoLength(seller: string): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("userAuctionInfoLength", seller));
    }
    
    public async userAuctionInfo(seller: string, index: BigNumberish): Promise<PFPInfo> {
        const results = await this.runMethod("userAuctionInfo", seller, index);
        return {
            pfp: results[0],
            id: parseInt(results[1], 10),
            price: BigNumber.from(results[2]),
        };
    }

    public async biddings(addr: string, id: BigNumberish, biddingId: BigNumberish): Promise<Bidding> {
        const results = await this.runMethod("biddings", addr, id, biddingId);
        return {
            bidder: results[0],
            price: BigNumber.from(results[1]),
        };
    }

    public async biddingCount(addr: string, id: BigNumberish): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("biddingCount", addr, id));
    }

    public async userBiddingInfoLength(bidder: string): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("userBiddingInfoLength", bidder));
    }

    public async claim(addr: string, id: BigNumberish): Promise<void> {
        await this.runWalletMethod("claim", addr, id);
    }

    public async cancelAuction(addr: string, id: BigNumberish): Promise<void> {
        await this.runWalletMethod("cancelAuction", addr, id);
    }

    public async bid(addr: string, id: BigNumberish, price: BigNumberish): Promise<void> {
        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {
            if ((await MixContract.allowance(owner, this.address)).lt(constants.MaxUint256.div(2))) {
                await MixContract.approve(this.address, constants.MaxUint256);
                await new Promise<void>((resolve) => {
                    setTimeout(async () => {
                        await this.runWalletMethod("bid", addr, id, price);
                        resolve();
                    }, 2000);
                });
            } else {
                await this.runWalletMethod("bid", addr, id, price);
            }
        }
    }
}

export default new PFPStoreContract();
