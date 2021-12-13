import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import Contract from "./Contract";
interface Sale {
    seller: string;
    price: BigNumber;
}
interface ArtInfo {
    id: number;
    price: BigNumber;
}
interface OfferInfo {
    offeror: string;
    price: BigNumber;
}
declare class ArtStoreContract extends Contract {
    constructor();
    sales(id: BigNumberish): Promise<Sale>;
    userSellInfo(seller: string, index: BigNumberish): Promise<ArtInfo>;
    userSellInfoLength(seller: string): Promise<BigNumber>;
    sell(ids: BigNumberish[], prices: BigNumberish[]): Promise<void>;
    cancelSale(ids: BigNumberish[]): Promise<void>;
    onSalesCount(): Promise<BigNumber>;
    onSales(index: BigNumberish): Promise<BigNumber>;
    buy(ids: BigNumberish[], prices: BigNumberish[], mileages: BigNumberish[]): Promise<void>;
    offers(id: BigNumberish, offerId: BigNumberish): Promise<OfferInfo>;
    userOfferInfo(offeror: string, index: BigNumberish): Promise<ArtInfo>;
    userOfferInfoLength(offeror: string): Promise<BigNumber>;
    offerCount(id: BigNumberish): Promise<BigNumber>;
    makeOffer(id: BigNumberish, price: BigNumberish, mileage: BigNumberish): Promise<void>;
    cancelOffer(id: BigNumberish, offerId: BigNumberish): Promise<void>;
    cancelOfferByOwner(ids: BigNumberish[], offerIds: BigNumberish[]): Promise<void>;
    acceptOffer(id: BigNumberish, offerId: BigNumberish): Promise<void>;
}
declare const _default: ArtStoreContract;
export default _default;
//# sourceMappingURL=ArtStoreContract.d.ts.map