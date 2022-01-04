import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import Contract from "./Contract";
interface Sale {
    seller: string;
    price: BigNumber;
}
interface PFPInfo {
    pfp: string;
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
declare class PFPStoreContract extends Contract {
    constructor();
    sales(addr: string, id: BigNumberish): Promise<Sale>;
    checkSelling(addr: string, id: BigNumberish): Promise<boolean>;
    userSellInfo(seller: string, index: BigNumberish): Promise<PFPInfo>;
    userSellInfoLength(seller: string): Promise<BigNumber>;
    sell(addrs: string[], ids: BigNumberish[], prices: BigNumberish[]): Promise<void>;
    cancelSale(addr: string[], ids: BigNumberish[]): Promise<void>;
    onSalesCount(addr: string): Promise<BigNumber>;
    onSales(addr: string, index: BigNumberish): Promise<BigNumber>;
    buy(addr: string[], ids: BigNumberish[]): Promise<void>;
    offers(addr: string, id: BigNumberish, offerId: BigNumberish): Promise<OfferInfo>;
    userOfferInfo(offeror: string, index: BigNumberish): Promise<PFPInfo>;
    userOfferInfoLength(offeror: string): Promise<BigNumber>;
    offerCount(addr: string, id: BigNumberish): Promise<BigNumber>;
    makeOffer(addr: string, id: BigNumberish, price: BigNumberish): Promise<void>;
    cancelOffer(addr: string, id: BigNumberish, offerId: BigNumberish): Promise<void>;
    cancelOfferByOwner(addrs: string[], ids: BigNumberish[], offerIds: BigNumberish[]): Promise<void>;
    acceptOffer(addr: string, id: BigNumberish, offerId: BigNumberish): Promise<void>;
    onAuctionsCount(addr: string): Promise<BigNumber>;
    onAuctions(addr: string, index: BigNumberish): Promise<BigNumber>;
    auctions(addr: string, id: BigNumberish): Promise<Auction>;
    createAuction(addr: string, id: BigNumberish, startPrice: BigNumberish, endBlock: BigNumberish): Promise<void>;
    checkAuction(addr: string, id: BigNumberish): Promise<boolean>;
    userAuctionInfoLength(seller: string): Promise<BigNumber>;
    userAuctionInfo(seller: string, index: BigNumberish): Promise<PFPInfo>;
    biddings(addr: string, id: BigNumberish, biddingId: BigNumberish): Promise<Bidding>;
    biddingCount(addr: string, id: BigNumberish): Promise<BigNumber>;
    userBiddingInfoLength(bidder: string): Promise<BigNumber>;
    claim(addr: string, id: BigNumberish): Promise<void>;
    cancelAuction(addr: string, id: BigNumberish): Promise<void>;
    bid(addr: string, id: BigNumberish, price: BigNumberish): Promise<void>;
}
declare const _default: PFPStoreContract;
export default _default;
//# sourceMappingURL=PFPStoreContract.d.ts.map