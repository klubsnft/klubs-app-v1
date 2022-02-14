import { BigNumber, BigNumberish } from "ethers";
import Contract from "./Contract";
export interface SaleInfo {
    item: string;
    id: BigNumber;
    saleId: BigNumber;
}
interface Sale {
    seller: string;
    metaverseId: BigNumber;
    item: string;
    id: BigNumber;
    amount: BigNumber;
    unitPrice: BigNumber;
    partialBuying: boolean;
    verificationID: string;
}
declare class ItemStoreSaleContract extends Contract {
    constructor();
    onSalesCount(addr: string): Promise<BigNumber>;
    onSales(addr: string, index: BigNumberish): Promise<string>;
    userSellInfoLength(seller: string): Promise<BigNumber>;
    userSellInfo(seller: string, index: BigNumberish): Promise<string>;
    getSaleInfo(verificationID: string): Promise<SaleInfo>;
    sales(addr: string, id: BigNumberish, saleId: BigNumberish): Promise<Sale>;
    sell(metaverseIds: BigNumberish[], addrs: string[], ids: BigNumberish[], amounts: BigNumberish[], unitPrices: BigNumberish[], partialBuyings: boolean[]): Promise<void>;
    buy(saleVerificationIDs: string[], amounts: BigNumberish[], unitPrices: BigNumberish[], mileages: BigNumberish[]): Promise<void>;
    userOnSaleAmounts(seller: string, item: string, id: BigNumberish): Promise<BigNumber>;
    cancelSale(saleVerificationIDs: string[]): Promise<void>;
}
declare const _default: ItemStoreSaleContract;
export default _default;
//# sourceMappingURL=ItemStoreSaleContract.d.ts.map