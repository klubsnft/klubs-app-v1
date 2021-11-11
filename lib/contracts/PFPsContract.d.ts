import { BigNumber, BigNumberish } from "ethers";
import Contract from "./Contract";
declare class PFPsContract extends Contract {
    constructor();
    added(addr: string): Promise<boolean>;
    getAddrCount(): Promise<BigNumber>;
    addrs(index: BigNumberish): Promise<string>;
    extras(addr: string): Promise<string>;
    propose(addr: string): Promise<void>;
    addByPFPOwner(addr: string): Promise<void>;
    addByMinter(addr: string): Promise<void>;
}
declare const _default: PFPsContract;
export default _default;
//# sourceMappingURL=PFPsContract.d.ts.map