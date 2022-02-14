"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const Config_1 = __importDefault(require("../Config"));
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
const ItemStoreSale_json_1 = __importDefault(require("./abi/klubs/artifacts/contracts/ItemStoreSale.sol/ItemStoreSale.json"));
const Contract_1 = __importDefault(require("./Contract"));
const MixContract_1 = __importDefault(require("./MixContract"));
const KIP37Contract_1 = __importDefault(require("./standard/KIP37Contract"));
class ItemStoreSaleContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.ItemStoreSale, ItemStoreSale_json_1.default.abi);
    }
    async onSalesCount(addr) {
        return ethers_1.BigNumber.from(await this.runMethod("onSalesCount", addr));
    }
    async onSales(addr, index) {
        return await this.runMethod("onSales", addr, index);
    }
    async userSellInfoLength(seller) {
        return ethers_1.BigNumber.from(await this.runMethod("userSellInfoLength", seller));
    }
    async userSellInfo(seller, index) {
        return await this.runMethod("userSellInfo", seller, index);
    }
    async getSaleInfo(verificationID) {
        const results = await this.runMethod("getSaleInfo", verificationID);
        return {
            item: results[0],
            id: ethers_1.BigNumber.from(results[1]),
            saleId: ethers_1.BigNumber.from(results[2]),
        };
    }
    async sales(addr, id, saleId) {
        const results = await this.runMethod("sales", addr, id, saleId);
        return {
            seller: results[0],
            metaverseId: ethers_1.BigNumber.from(results[1]),
            item: results[2],
            id: ethers_1.BigNumber.from(results[3]),
            amount: ethers_1.BigNumber.from(results[4]),
            unitPrice: ethers_1.BigNumber.from(results[5]),
            partialBuying: results[6],
            verificationID: results[7],
        };
    }
    async sell(metaverseIds, addrs, ids, amounts, unitPrices, partialBuyings) {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            for (const addr of addrs) {
                const nftContract = new KIP37Contract_1.default(addr);
                if (await nftContract.isApprovedForAll(owner, this.address) !== true) {
                    await nftContract.setApprovalForAll(this.address, true);
                }
            }
            await this.runWalletMethod("sell", metaverseIds, addrs, ids, amounts, unitPrices, partialBuyings);
        }
    }
    async buy(saleVerificationIDs, amounts, unitPrices, mileages) {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            if ((await MixContract_1.default.allowance(owner, this.address)).lt(ethers_1.constants.MaxUint256.div(2))) {
                await MixContract_1.default.approve(this.address, ethers_1.constants.MaxUint256);
                await new Promise((resolve) => {
                    setTimeout(async () => {
                        await this.runWalletMethod("buy", saleVerificationIDs, amounts, unitPrices, mileages);
                        resolve();
                    }, 2000);
                });
            }
            else {
                await this.runWalletMethod("buy", saleVerificationIDs, amounts, unitPrices, mileages);
            }
        }
    }
    async userOnSaleAmounts(seller, item, id) {
        return ethers_1.BigNumber.from(await this.runMethod("userOnSaleAmounts", seller, item, id));
    }
    async cancelSale(saleVerificationIDs) {
        await this.runWalletMethod("cancelSale", saleVerificationIDs);
    }
}
exports.default = new ItemStoreSaleContract();
//# sourceMappingURL=ItemStoreSaleContract.js.map