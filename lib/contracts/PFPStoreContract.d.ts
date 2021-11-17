import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import Contract from "./Contract";
interface Sale {
    seller: string;
    price: BigNumber;
}
declare class PFPStoreContract extends Contract {
    constructor();
    sales(addr: string, index: BigNumberish): Promise<Sale>;
}
declare const _default: PFPStoreContract;
export default _default;
//# sourceMappingURL=PFPStoreContract.d.ts.map