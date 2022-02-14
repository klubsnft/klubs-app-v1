import { BigNumber, BigNumberish, constants } from "ethers";
import Config from "../Config";
import Wallet from "../klaytn/Wallet";
import ItemStoreSaleArtifact from "./abi/klubs/artifacts/contracts/ItemStoreSale.sol/ItemStoreSale.json";
import Contract from "./Contract";
import MixContract from "./MixContract";
import KIP37Contract from "./standard/KIP37Contract";

export interface SaleInfo {
    item: string,
    id: BigNumber,
    saleId: BigNumber,
}

interface Sale {
    seller: string,
    metaverseId: BigNumber,
    item: string,
    id: BigNumber,
    amount: BigNumber,
    unitPrice: BigNumber,
    partialBuying: boolean,
    verificationID: string,
}

class ItemStoreSaleContract extends Contract {

    constructor() {
        super(Config.contracts.ItemStoreSale, ItemStoreSaleArtifact.abi);
    }

    public async onSalesCount(addr: string): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("onSalesCount", addr));
    }

    public async onSales(addr: string, index: BigNumberish): Promise<string> {
        return await this.runMethod("onSales", addr, index);
    }

    public async userSellInfoLength(seller: string): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("userSellInfoLength", seller));
    }

    public async userSellInfo(seller: string, index: BigNumberish): Promise<string> {
        return await this.runMethod("userSellInfo", seller, index);
    }

    public async getSaleInfo(verificationID: string): Promise<SaleInfo> {
        const results = await this.runMethod("getSaleInfo", verificationID);
        return {
            item: results[0],
            id: BigNumber.from(results[1]),
            saleId: BigNumber.from(results[2]),
        };
    }

    public async sales(addr: string, id: BigNumberish, saleId: BigNumberish): Promise<Sale> {
        const results = await this.runMethod("sales", addr, id, saleId);
        return {
            seller: results[0],
            metaverseId: BigNumber.from(results[1]),
            item: results[2],
            id: BigNumber.from(results[3]),
            amount: BigNumber.from(results[4]),
            unitPrice: BigNumber.from(results[5]),
            partialBuying: results[6],
            verificationID: results[7],
        };
    }

    public async sell(
        metaverseIds: BigNumberish[],
        addrs: string[],
        ids: BigNumberish[],
        amounts: BigNumberish[],
        unitPrices: BigNumberish[],
        partialBuyings: boolean[],
    ): Promise<void> {
        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {
            for (const addr of addrs) {
                const nftContract = new KIP37Contract(addr);
                if (await nftContract.isApprovedForAll(owner, this.address) !== true) {
                    await nftContract.setApprovalForAll(this.address, true);
                }
            }
            await this.runWalletMethod("sell", metaverseIds, addrs, ids, amounts, unitPrices, partialBuyings);
        }
    }

    public async buy(
        saleVerificationIDs: string[],
        amounts: BigNumberish[],
        unitPrices: BigNumberish[],
        mileages: BigNumberish[],
    ): Promise<void> {
        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {
            if ((await MixContract.allowance(owner, this.address)).lt(constants.MaxUint256.div(2))) {
                await MixContract.approve(this.address, constants.MaxUint256);
                await new Promise<void>((resolve) => {
                    setTimeout(async () => {
                        await this.runWalletMethod("buy", saleVerificationIDs, amounts, unitPrices, mileages);
                        resolve();
                    }, 2000);
                });
            } else {
                await this.runWalletMethod("buy", saleVerificationIDs, amounts, unitPrices, mileages);
            }
        }
    }

    public async userOnSaleAmounts(seller: string, item: string, id: BigNumberish): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("userOnSaleAmounts", seller, item, id));
    }

    public async cancelSale(saleVerificationIDs: string[]): Promise<void> {
        await this.runWalletMethod("cancelSale", saleVerificationIDs);
    }
}

export default new ItemStoreSaleContract();
