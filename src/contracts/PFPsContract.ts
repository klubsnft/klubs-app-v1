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
}

export default new PFPsContract();
