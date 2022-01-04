"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_1 = require("@ethersproject/bignumber");
const ethers_1 = require("ethers");
const Config_1 = __importDefault(require("../Config"));
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
const ArtStore_json_1 = __importDefault(require("./abi/klubs/artifacts/contracts/ArtStore.sol/ArtStore.json"));
const ArtsContract_1 = __importDefault(require("./ArtsContract"));
const Contract_1 = __importDefault(require("./Contract"));
const MixContract_1 = __importDefault(require("./MixContract"));
class ArtStoreContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.ArtStore, ArtStore_json_1.default.abi);
    }
    async sales(id) {
        const results = await this.runMethod("sales", id);
        return {
            seller: results[0],
            price: bignumber_1.BigNumber.from(results[1]),
        };
    }
    async checkSelling(id) {
        return await this.runMethod("checkSelling", id);
    }
    async userSellInfo(seller, index) {
        const results = await this.runMethod("userSellInfo", seller, index);
        return {
            id: parseInt(results[1], 10),
            price: bignumber_1.BigNumber.from(results[2]),
        };
    }
    async userSellInfoLength(seller) {
        return bignumber_1.BigNumber.from(await this.runMethod("userSellInfoLength", seller));
    }
    async sell(ids, prices) {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            if (await ArtsContract_1.default.isApprovedForAll(owner, this.address) !== true) {
                await ArtsContract_1.default.setApprovalForAll(this.address, true);
            }
            await this.runWalletMethod("sell", ids, prices);
        }
    }
    async cancelSale(ids) {
        await this.runWalletMethod("cancelSale", ids);
    }
    async onSalesCount() {
        return bignumber_1.BigNumber.from(await this.runMethod("onSalesCount"));
    }
    async onSales(index) {
        return bignumber_1.BigNumber.from(await this.runMethod("onSales", index));
    }
    async buy(ids, prices, mileages) {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            if ((await MixContract_1.default.allowance(owner, this.address)).lt(ethers_1.constants.MaxUint256.div(2))) {
                await MixContract_1.default.approve(this.address, ethers_1.constants.MaxUint256);
                await new Promise((resolve) => {
                    setTimeout(async () => {
                        await this.runWalletMethod("buy", ids, prices, mileages);
                        resolve();
                    }, 2000);
                });
            }
            else {
                await this.runWalletMethod("buy", ids, prices, mileages);
            }
        }
    }
    async offers(id, offerId) {
        const results = await this.runMethod("offers", id, offerId);
        return {
            offeror: results[0],
            price: bignumber_1.BigNumber.from(results[1]),
        };
    }
    async userOfferInfo(offeror, index) {
        const results = await this.runMethod("userOfferInfo", offeror, index);
        return {
            id: parseInt(results[1], 10),
            price: bignumber_1.BigNumber.from(results[2]),
        };
    }
    async userOfferInfoLength(offeror) {
        return bignumber_1.BigNumber.from(await this.runMethod("userOfferInfoLength", offeror));
    }
    async offerCount(id) {
        return bignumber_1.BigNumber.from(await this.runMethod("offerCount", id));
    }
    async makeOffer(id, price, mileage) {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            if ((await MixContract_1.default.allowance(owner, this.address)).lt(ethers_1.constants.MaxUint256.div(2))) {
                await MixContract_1.default.approve(this.address, ethers_1.constants.MaxUint256);
                await new Promise((resolve) => {
                    setTimeout(async () => {
                        await this.runWalletMethod("makeOffer", id, price, mileage);
                        resolve();
                    }, 2000);
                });
            }
            else {
                await this.runWalletMethod("makeOffer", id, price, mileage);
            }
        }
    }
    async cancelOffer(id, offerId) {
        await this.runWalletMethod("cancelOffer", id, offerId);
    }
    async cancelOfferByOwner(ids, offerIds) {
        await this.runWalletMethod("cancelOfferByOwner", ids, offerIds);
    }
    async onAuctionsCount() {
        return bignumber_1.BigNumber.from(await this.runMethod("onAuctionsCount"));
    }
    async onAuctions(index) {
        return bignumber_1.BigNumber.from(await this.runMethod("onAuctions", index));
    }
    async acceptOffer(id, offerId) {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            if (await ArtsContract_1.default.isApprovedForAll(owner, this.address) !== true) {
                await ArtsContract_1.default.setApprovalForAll(this.address, true);
            }
            await this.runWalletMethod("acceptOffer", id, offerId);
        }
    }
    async auctions(id) {
        const results = await this.runMethod("auctions", id);
        return {
            seller: results[0],
            startPrice: bignumber_1.BigNumber.from(results[1]),
            endBlock: parseInt(results[2], 10),
        };
    }
    async createAuction(id, startPrice, endBlock) {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            if (await ArtsContract_1.default.isApprovedForAll(owner, this.address) !== true) {
                await ArtsContract_1.default.setApprovalForAll(this.address, true);
            }
            await this.runWalletMethod("createAuction", id, startPrice, endBlock);
        }
    }
    async checkAuction(id) {
        return await this.runMethod("checkAuction", id);
    }
    async userAuctionInfoLength(seller) {
        return bignumber_1.BigNumber.from(await this.runMethod("userAuctionInfoLength", seller));
    }
    async userAuctionInfo(seller, index) {
        const results = await this.runMethod("userAuctionInfo", seller, index);
        return {
            id: parseInt(results[0], 10),
            price: bignumber_1.BigNumber.from(results[1]),
        };
    }
    async biddings(id, biddingId) {
        const results = await this.runMethod("biddings", id, biddingId);
        return {
            bidder: results[0],
            price: bignumber_1.BigNumber.from(results[1]),
        };
    }
    async biddingCount(id) {
        return bignumber_1.BigNumber.from(await this.runMethod("biddingCount", id));
    }
    async userBiddingInfoLength(bidder) {
        return bignumber_1.BigNumber.from(await this.runMethod("userBiddingInfoLength", bidder));
    }
    async claim(id) {
        await this.runWalletMethod("claim", id);
    }
    async cancelAuction(id) {
        await this.runWalletMethod("cancelAuction", id);
    }
    async bid(id, price, mileage) {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            if ((await MixContract_1.default.allowance(owner, this.address)).lt(ethers_1.constants.MaxUint256.div(2))) {
                await MixContract_1.default.approve(this.address, ethers_1.constants.MaxUint256);
                await new Promise((resolve) => {
                    setTimeout(async () => {
                        await this.runWalletMethod("bid", id, price, mileage);
                        resolve();
                    }, 2000);
                });
            }
            else {
                await this.runWalletMethod("bid", id, price, mileage);
            }
        }
    }
}
exports.default = new ArtStoreContract();
//# sourceMappingURL=ArtStoreContract.js.map