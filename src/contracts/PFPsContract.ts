import { BigNumber, BigNumberish } from "ethers";
import Config from "../Config";
import PFPsArtifact from "./abi/klubs/artifacts/contracts/PFPs.sol/PFPs.json";
import Contract from "./Contract";

interface Proposal {
    addr: string,
    manager: string,
}

interface RoyaltyInfo {
    receiver: string,
    royalty: number,
}

class PFPsContract extends Contract {

    constructor() {
        super(Config.contracts.PFPs, PFPsArtifact.abi);
    }

    public async added(addr: string): Promise<boolean> {
        return await this.runMethod("added", addr);
    }

    public async getAddrCount(): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("addrCount"));
    }

    public async addrs(index: BigNumberish): Promise<string> {
        return await this.runMethod("addrs", index);
    }

    public async extras(addr: string): Promise<string> {
        return await this.runMethod("extras", addr);
    }

    public async banned(addr: string): Promise<boolean> {
        return await this.runMethod("banned", addr);
    }

    public async propose(addr: string): Promise<void> {
        await this.runWalletMethod("propose", addr);
    }

    public async addByPFPOwner(addr: string): Promise<void> {
        await this.runWalletMethod("addByPFPOwner", addr);
    }

    public async addByMinter(addr: string): Promise<void> {
        await this.runWalletMethod("addByMinter", addr);
    }

    public async setExtra(addr: string, manager: string): Promise<void> {
        await this.runWalletMethod("setExtra", addr, manager);
    }

    public async existsManager(addr: string, manager: string): Promise<boolean> {
        return await this.runMethod("existsManager", addr, manager);
    }

    public async addManager(addr: string, manager: string): Promise<void> {
        await this.runWalletMethod("addManager", addr, manager);
    }

    public async removeManager(addr: string, manager: string): Promise<void> {
        await this.runWalletMethod("removeManager", addr, manager);
    }

    public async enumerables(addr: string): Promise<boolean> {
        return await this.runMethod("enumerables", addr);
    }

    public async getManagerCount(addr: string): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("managerCount", addr));
    }

    public async getTotalSupply(addr: string): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("getTotalSupply", addr));
    }

    public async proposalCount(): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("proposalCount"));
    }

    public async proposals(index: BigNumberish): Promise<Proposal> {
        const results = await this.runMethod("proposals", index);
        return {
            addr: results[0],
            manager: results[1],
        };
    }

    public async royalties(addr: string): Promise<RoyaltyInfo> {
        const results = await this.runMethod("royalties", addr);
        return {
            receiver: results[0],
            royalty: parseInt(results[1], 10),
        };
    }

    public async managers(addr: string, index: BigNumberish): Promise<string> {
        return await this.runMethod("managers", addr, index);
    }

    public async setEnumerable(addr: string, enumerable: boolean): Promise<void> {
        await this.runWalletMethod("setEnumerable", addr, enumerable);
    }

    public async setTotalSupply(addr: string, totalSupply: BigNumberish): Promise<void> {
        await this.runWalletMethod("setTotalSupply", addr, totalSupply);
    }

    public async passProposal(proposalId: BigNumberish): Promise<void> {
        await this.runWalletMethod("passProposal", proposalId);
    }

    public async setRoyalty(addr: string, receiver: string, royalty: BigNumberish): Promise<void> {
        await this.runWalletMethod("setRoyalty", addr, receiver, royalty);
    }

    public async getManagerPFPCount(addr: string): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("managerPFPCount", addr));
    }

    public async managerPFPs(addr: string, index: BigNumberish): Promise<string> {
        return await this.runMethod("managerPFPs", addr, index);
    }
}

export default new PFPsContract();
