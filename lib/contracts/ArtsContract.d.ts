import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import KIP17Contract from "./standard/KIP17Contract";
declare class ArtsContract extends KIP17Contract {
    constructor();
    royalties(id: BigNumberish): Promise<BigNumber>;
    setExceptionalRoyalties(ids: BigNumberish[], royalties: BigNumberish[]): Promise<void>;
}
declare const _default: ArtsContract;
export default _default;
//# sourceMappingURL=ArtsContract.d.ts.map