import { BigNumber, BigNumberish } from "ethers";
import Config from "../Config";
import ArtistsArtifact from "./abi/klubs/artifacts/contracts/Artists.sol/Artists.json";
import Contract from "./Contract";

class ArtistsContract extends Contract {

    constructor() {
        super(Config.contracts.Artists, ArtistsArtifact.abi);
    }

    public async added(addr: string): Promise<boolean> {
        return await this.runMethod("added", addr);
    }

    public async add(): Promise<void> {
        await this.runWalletMethod("add");
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

    public async setExtra(manager: string): Promise<void> {
        await this.runWalletMethod("setExtra", manager);
    }

    public async baseRoyalty(addr: string): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("baseRoyalty", addr));
    }

    public async setBaseRoyalty(royalty: BigNumberish): Promise<void> {
        await this.runWalletMethod("setBaseRoyalty", royalty);
    }
}

export default new ArtistsContract();
