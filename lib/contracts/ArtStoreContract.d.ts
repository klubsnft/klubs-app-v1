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
interface Auction {
    seller: string;
    startPrice: BigNumber;
    endBlock: number;
}
interface Bidding {
    bidder: string;
    price: BigNumber;
}
declare class ArtStoreContract extends Contract {
    constructor();
    sales(id: BigNumberish): Promise<Sale>;
    checkSelling(id: BigNumberish): Promise<boolean>;
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
    onAuctionsCount(): Promise<BigNumber>;
    onAuctions(index: BigNumberish): Promise<BigNumber>;
    acceptOffer(id: BigNumberish, offerId: BigNumberish): Promise<void>;
    auctions(id: BigNumberish): Promise<Auction>;
    createAuction(id: BigNumberish, startPrice: BigNumberish, endBlock: BigNumberish): Promise<void>;
    checkAuction(id: BigNumberish): Promise<boolean>;
    userAuctionInfoLength(seller: string): Promise<BigNumber>;
    userAuctionInfo(seller: string, index: BigNumberish): Promise<ArtInfo>;
    biddings(id: BigNumberish, biddingId: BigNumberish): Promise<Bidding>;
    biddingCount(id: BigNumberish): Promise<BigNumber>;
    userBiddingInfoLength(bidder: string): Promise<BigNumber>;
    claim(id: BigNumberish): Promise<void>;
    cancelAuction(id: BigNumberish): Promise<void>;
    bid(id: BigNumberish, price: BigNumberish, mileage: BigNumberish): Promise<void>;
}
declare const _default: ArtStoreContract;
export default _default;
//# sourceMappingURL=ArtStoreContract.d.ts.map