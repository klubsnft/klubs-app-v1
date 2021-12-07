import { BigNumber, BigNumberish } from "ethers";
import Contract from "./Contract";
declare class ArtistsContract extends Contract {
    constructor();
    added(addr: string): Promise<boolean>;
    add(): Promise<void>;
    getAddrCount(): Promise<BigNumber>;
    addrs(index: BigNumberish): Promise<string>;
    extras(addr: string): Promise<string>;
    banned(addr: string): Promise<boolean>;
    setExtra(manager: string): Promise<void>;
    baseRoyalty(addr: string): Promise<BigNumber>;
    setBaseRoyalty(royalty: BigNumberish): Promise<void>;
}
declare const _default: ArtistsContract;
export default _default;
//# sourceMappingURL=ArtistsContract.d.ts.map