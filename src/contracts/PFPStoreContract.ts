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
}

export default new PFPStoreContract();
