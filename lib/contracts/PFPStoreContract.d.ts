import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import Contract from "./Contract";
interface Sale {
    seller: string;
    price: BigNumber;
}
interface PFPInfo {
    pfp: string;
    id: BigNumber;
    price: BigNumber;
}
interface OfferInfo {
    offeror: string;
    price: BigNumber;
}
declare class PFPStoreContract extends Contract {
    constructor();
    sales(addr: string, id: BigNumberish): Promise<Sale>;
    userSellInfo(seller: string, index: BigNumberish): Promise<PFPInfo>;
    userSellInfoLength(seller: string): Promise<BigNumber>;
    sell(addrs: string[], ids: BigNumberish[], prices: BigNumberish[]): Promise<void>;
    cancelSale(addr: string[], ids: BigNumberish[]): Promise<void>;
    buy(addr: string[], ids: BigNumberish[]): Promise<void>;
    offers(addr: string, id: BigNumberish): Promise<OfferInfo>;
    userOfferInfo(offeror: string, index: BigNumberish): Promise<PFPInfo>;
    userOfferInfoLength(offeror: string): Promise<BigNumber>;
    offerCount(addr: string, id: BigNumberish): Promise<BigNumber>;
    makeOffer(addr: string, id: BigNumberish, price: BigNumberish): Promise<void>;
    cancelOffer(addr: string, id: BigNumberish, offerId: BigNumberish): Promise<void>;
    acceptOffer(addr: string, id: BigNumberish, offerId: BigNumberish): Promise<void>;
}
declare const _default: PFPStoreContract;
export default _default;
//# sourceMappingURL=PFPStoreContract.d.ts.map