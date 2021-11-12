import { BigNumber, BigNumberish } from "ethers";
import Config from "../Config";
import PFPsArtifact from "./abi/artifacts/contracts/PFPs.sol/PFPs.json";
import Contract from "./Contract";

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

    public async getManagerCount(addr: string): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("managerCount", addr));
    }

    public async getTotalSupply(addr: string): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("getTotalSupply", addr));
    }

    public async managers(addr: string, index: BigNumberish): Promise<string> {
        return await this.runMethod("managers", addr, index);
    }
}

export default new PFPsContract();
