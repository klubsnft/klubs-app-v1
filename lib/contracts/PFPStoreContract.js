"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_1 = require("@ethersproject/bignumber");
const ethers_1 = require("ethers");
const Config_1 = __importDefault(require("../Config"));
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
const PFPStore_json_1 = __importDefault(require("./abi/klubs/artifacts/contracts/PFPStore.sol/PFPStore.json"));
const Contract_1 = __importDefault(require("./Contract"));
const MixContract_1 = __importDefault(require("./MixContract"));
const KIP17Contract_1 = __importDefault(require("./standard/KIP17Contract"));
class PFPStoreContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.PFPStore, PFPStore_json_1.default.abi);
    }
    async sales(addr, id) {
        const results = await this.runMethod("sales", addr, id);
        return {
            seller: results[0],
            price: bignumber_1.BigNumber.from(results[1]),
        };
    }
    async checkSelling(addr, id) {
        return await this.runMethod("checkSelling", addr, id);
    }
    async userSellInfo(seller, index) {
        const results = await this.runMethod("userSellInfo", seller, index);
        return {
            pfp: results[0],
            id: parseInt(results[1], 10),
            price: bignumber_1.BigNumber.from(results[2]),
        };
    }
    async userSellInfoLength(seller) {
        return bignumber_1.BigNumber.from(await this.runMethod("userSellInfoLength", seller));
    }
    async sell(addrs, ids, prices) {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            for (const addr of addrs) {
                const nftContract = new KIP17Contract_1.default(addr);
                if (await nftContract.isApprovedForAll(owner, this.address) !== true) {
                    await nftContract.setApprovalForAll(this.address, true);
                }
            }
            await this.runWalletMethod("sell", addrs, ids, prices);
        }
    }
    async cancelSale(addr, ids) {
        await this.runWalletMethod("cancelSale", addr, ids);
    }
    async onSalesCount(addr) {
        return bignumber_1.BigNumber.from(await this.runMethod("onSalesCount", addr));
    }
    async onSales(addr, index) {
        return bignumber_1.BigNumber.from(await this.runMethod("onSales", addr, index));
    }
    async buy(addr, ids) {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            if ((await MixContract_1.default.allowance(owner, this.address)).lt(ethers_1.constants.MaxUint256.div(2))) {
                await MixContract_1.default.approve(this.address, ethers_1.constants.MaxUint256);
                await new Promise((resolve) => {
                    setTimeout(async () => {
                        await this.runWalletMethod("buy", addr, ids);
                        resolve();
                    }, 2000);
                });
            }
            else {
                await this.runWalletMethod("buy", addr, ids);
            }
        }
    }
    async offers(addr, id, offerId) {
        const results = await this.runMethod("offers", addr, id, offerId);
        return {
            offeror: results[0],
            price: bignumber_1.BigNumber.from(results[1]),
        };
    }
    async userOfferInfo(offeror, index) {
        const results = await this.runMethod("userOfferInfo", offeror, index);
        return {
            pfp: results[0],
            id: parseInt(results[1], 10),
            price: bignumber_1.BigNumber.from(results[2]),
        };
    }
    async userOfferInfoLength(offeror) {
        return bignumber_1.BigNumber.from(await this.runMethod("userOfferInfoLength", offeror));
    }
    async offerCount(addr, id) {
        return bignumber_1.BigNumber.from(await this.runMethod("offerCount", addr, id));
    }
    async makeOffer(addr, id, price) {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            if ((await MixContract_1.default.allowance(owner, this.address)).lt(ethers_1.constants.MaxUint256.div(2))) {
                await MixContract_1.default.approve(this.address, ethers_1.constants.MaxUint256);
                await new Promise((resolve) => {
                    setTimeout(async () => {
                        await this.runWalletMethod("makeOffer", addr, id, price);
                        resolve();
                    }, 2000);
                });
            }
            else {
                await this.runWalletMethod("makeOffer", addr, id, price);
            }
        }
    }
    async cancelOffer(addr, id, offerId) {
        await this.runWalletMethod("cancelOffer", addr, id, offerId);
    }
    async cancelOfferByOwner(addrs, ids, offerIds) {
        await this.runWalletMethod("cancelOfferByOwner", addrs, ids, offerIds);
    }
    async acceptOffer(addr, id, offerId) {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            const nftContract = new KIP17Contract_1.default(addr);
            if (await nftContract.isApprovedForAll(owner, this.address) !== true) {
                await nftContract.setApprovalForAll(this.address, true);
            }
            await this.runWalletMethod("acceptOffer", addr, id, offerId);
        }
    }
    async onAuctionsCount(addr) {
        return bignumber_1.BigNumber.from(await this.runMethod("onAuctionsCount", addr));
    }
    async onAuctions(addr, index) {
        return bignumber_1.BigNumber.from(await this.runMethod("onAuctions", addr, index));
    }
    async auctions(addr, id) {
        const results = await this.runMethod("auctions", addr, id);
        return {
            seller: results[0],
            startPrice: bignumber_1.BigNumber.from(results[1]),
            endBlock: parseInt(results[2], 10),
        };
    }
    async createAuction(addr, id, startPrice, endBlock) {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            const nftContract = new KIP17Contract_1.default(addr);
            if (await nftContract.isApprovedForAll(owner, this.address) !== true) {
                await nftContract.setApprovalForAll(this.address, true);
            }
            await this.runWalletMethod("createAuction", addr, id, startPrice, endBlock);
        }
    }
    async checkAuction(addr, id) {
        return await this.runMethod("checkAuction", addr, id);
    }
    async userAuctionInfoLength(seller) {
        return bignumber_1.BigNumber.from(await this.runMethod("userAuctionInfoLength", seller));
    }
    async userAuctionInfo(seller, index) {
        const results = await this.runMethod("userAuctionInfo", seller, index);
        return {
            pfp: results[0],
            id: parseInt(results[1], 10),
            price: bignumber_1.BigNumber.from(results[2]),
        };
    }
    async biddings(addr, id, biddingId) {
        const results = await this.runMethod("biddings", addr, id, biddingId);
        return {
            bidder: results[0],
            price: bignumber_1.BigNumber.from(results[1]),
        };
    }
    async biddingCount(addr, id) {
        return bignumber_1.BigNumber.from(await this.runMethod("biddingCount", addr, id));
    }
    async userBiddingInfoLength(bidder) {
        return bignumber_1.BigNumber.from(await this.runMethod("userBiddingInfoLength", bidder));
    }
    async claim(addr, id) {
        await this.runWalletMethod("claim", addr, id);
    }
    async cancelAuction(addr, id) {
        await this.runWalletMethod("cancelAuction", addr, id);
    }
    async bid(addr, id, price) {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            if ((await MixContract_1.default.allowance(owner, this.address)).lt(ethers_1.constants.MaxUint256.div(2))) {
                await MixContract_1.default.approve(this.address, ethers_1.constants.MaxUint256);
                await new Promise((resolve) => {
                    setTimeout(async () => {
                        await this.runWalletMethod("bid", addr, id, price);
                        resolve();
                    }, 2000);
                });
            }
            else {
                await this.runWalletMethod("bid", addr, id, price);
            }
        }
    }
}
exports.default = new PFPStoreContract();
//# sourceMappingURL=PFPStoreContract.js.map