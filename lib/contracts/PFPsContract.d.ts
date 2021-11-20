import { BigNumber, BigNumberish } from "ethers";
import Contract from "./Contract";
interface Proposal {
    addr: string;
    manager: string;
}
interface RoyaltyInfo {
    receiver: string;
    royalty: number;
}
declare class PFPsContract extends Contract {
    constructor();
    added(addr: string): Promise<boolean>;
    getAddrCount(): Promise<BigNumber>;
    addrs(index: BigNumberish): Promise<string>;
    extras(addr: string): Promise<string>;
    banned(addr: string): Promise<boolean>;
    propose(addr: string): Promise<void>;
    addByPFPOwner(addr: string): Promise<void>;
    addByMinter(addr: string): Promise<void>;
    setExtra(addr: string, manager: string): Promise<void>;
    existsManager(addr: string, manager: string): Promise<boolean>;
    addManager(addr: string, manager: string): Promise<void>;
    removeManager(addr: string, manager: string): Promise<void>;
    enumerables(addr: string): Promise<boolean>;
    getManagerCount(addr: string): Promise<BigNumber>;
    getTotalSupply(addr: string): Promise<BigNumber>;
    proposalCount(): Promise<BigNumber>;
    proposals(index: BigNumberish): Promise<Proposal>;
    royalties(addr: string): Promise<RoyaltyInfo>;
    managers(addr: string, index: BigNumberish): Promise<string>;
    setEnumerable(addr: string, enumerable: boolean): Promise<void>;
    setTotalSupply(addr: string, totalSupply: BigNumberish): Promise<void>;
    passProposal(proposalId: BigNumberish): Promise<void>;
    setRoyalty(addr: string, receiver: string, royalty: BigNumberish): Promise<void>;
    getManagerPFPCount(addr: string): Promise<BigNumber>;
    managerPFPs(addr: string, index: BigNumberish): Promise<string>;
}
declare const _default: PFPsContract;
export default _default;
//# sourceMappingURL=PFPsContract.d.ts.map