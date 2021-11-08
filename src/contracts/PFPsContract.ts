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
