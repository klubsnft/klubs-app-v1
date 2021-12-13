import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { constants } from "ethers";
import Config from "../Config";
import Wallet from "../klaytn/Wallet";
import ArtStoreArtifact from "./abi/klubs/artifacts/contracts/ArtStore.sol/ArtStore.json";
import ArtsContract from "./ArtsContract";
import Contract from "./Contract";
import MixContract from "./MixContract";

interface Sale {
    seller: string,
    price: BigNumber,
}

interface ArtInfo {
    id: number,
    price: BigNumber,
}

interface OfferInfo {
    offeror: string,
    price: BigNumber,
}

class ArtStoreContract extends Contract {

    constructor() {
        super(Config.contracts.ArtStore, ArtStoreArtifact.abi);
    }

    public async sales(id: BigNumberish): Promise<Sale> {
        const results = await this.runMethod("sales", id);
        return {
            seller: results[0],
            price: BigNumber.from(results[1]),
        };
    }

    public async userSellInfo(seller: string, index: BigNumberish): Promise<ArtInfo> {
        const results = await this.runMethod("userSellInfo", seller, index);
        return {
            id: parseInt(results[1], 10),
            price: BigNumber.from(results[2]),
        };
    }

    public async userSellInfoLength(seller: string): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("userSellInfoLength", seller));
    }

    public async sell(ids: BigNumberish[], prices: BigNumberish[]): Promise<void> {
        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {
            if (await ArtsContract.isApprovedForAll(owner, this.address) !== true) {
                await ArtsContract.setApprovalForAll(this.address, true);
            }
            await this.runWalletMethod("sell", ids, prices);
        }
    }

    public async cancelSale(ids: BigNumberish[]): Promise<void> {
        await this.runWalletMethod("cancelSale", ids);
    }

    public async onSalesCount(): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("onSalesCount"));
    }

    public async onSales(index: BigNumberish): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("onSales", index));
    }

    public async buy(ids: BigNumberish[], prices: BigNumberish[], mileages: BigNumberish[]): Promise<void> {
        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {
            if ((await MixContract.allowance(owner, this.address)).lt(constants.MaxUint256.div(2))) {
                await MixContract.approve(this.address, constants.MaxUint256);
                await new Promise<void>((resolve) => {
                    setTimeout(async () => {
                        await this.runWalletMethod("buy", ids, prices, mileages);
                        resolve();
                    }, 2000);
                });
            } else {
                await this.runWalletMethod("buy", ids, prices, mileages);
            }
        }
    }

    public async offers(id: BigNumberish, offerId: BigNumberish): Promise<OfferInfo> {
        const results = await this.runMethod("offers", id, offerId);
        return {
            offeror: results[0],
            price: BigNumber.from(results[1]),
        };
    }

    public async userOfferInfo(offeror: string, index: BigNumberish): Promise<ArtInfo> {
        const results = await this.runMethod("userOfferInfo", offeror, index);
        return {
            id: parseInt(results[1], 10),
            price: BigNumber.from(results[2]),
        };
    }

    public async userOfferInfoLength(offeror: string): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("userOfferInfoLength", offeror));
    }

    public async offerCount(id: BigNumberish): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("offerCount", id));
    }

    public async makeOffer(id: BigNumberish, price: BigNumberish, mileage: BigNumberish): Promise<void> {
        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {
            if ((await MixContract.allowance(owner, this.address)).lt(constants.MaxUint256.div(2))) {
                await MixContract.approve(this.address, constants.MaxUint256);
                await new Promise<void>((resolve) => {
                    setTimeout(async () => {
                        await this.runWalletMethod("makeOffer", id, price, mileage);
                        resolve();
                    }, 2000);
                });
            } else {
                await this.runWalletMethod("makeOffer", id, price, mileage);
            }
        }
    }

    public async cancelOffer(id: BigNumberish, offerId: BigNumberish): Promise<void> {
        await this.runWalletMethod("cancelOffer", id, offerId);
    }

    public async cancelOfferByOwner(ids: BigNumberish[], offerIds: BigNumberish[]): Promise<void> {
        await this.runWalletMethod("cancelOfferByOwner", ids, offerIds);
    }

    public async acceptOffer(id: BigNumberish, offerId: BigNumberish): Promise<void> {
        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {
            if (await ArtsContract.isApprovedForAll(owner, this.address) !== true) {
                await ArtsContract.setApprovalForAll(this.address, true);
            }
            await this.runWalletMethod("acceptOffer", id, offerId);
        }
    }
}

export default new ArtStoreContract();
