import { BigNumber, BigNumberish } from "ethers";
import Config from "../Config";
import MetaversesArtifact from "./abi/klubs/artifacts/contracts/Metaverses.sol/Metaverses.json";
import Contract from "./Contract";

enum ItemType {
    ERC1155,
    ERC721
}

class MetaversesContract extends Contract {

    constructor() {
        super(Config.contracts.Metaverses, MetaversesArtifact.abi);
    }

    public async addMetaverse(extra: string): Promise<void> {
        await this.runWalletMethod("addMetaverse", extra);
    }

    public async getMetaverseCount(): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("metaverseCount"));
    }

    public async banned(id: BigNumberish): Promise<boolean> {
        return await this.runMethod("banned", id);
    }

    public async extras(id: BigNumberish): Promise<string> {
        return await this.runMethod("extras", id);
    }

    public async existsManager(id: BigNumberish, manager: string): Promise<boolean> {
        return await this.runMethod("existsManager", id, manager);
    }

    public async addManager(id: BigNumberish, manager: string): Promise<void> {
        await this.runWalletMethod("addManager", id, manager);
    }

    public async removeManager(id: BigNumberish, manager: string): Promise<void> {
        await this.runWalletMethod("removeManager", id, manager);
    }

    public async getManagerCount(id: BigNumberish): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("managerCount", id));
    }

    public async addItem(id: BigNumberish, item: string, itemType: ItemType, extra: string): Promise<void> {
        await this.runWalletMethod("addItem", id, item, itemType, extra);
    }

    public async itemAdded(id: BigNumberish, addr: string): Promise<boolean> {
        return await this.runMethod("itemAdded", id, addr);
    }

    public async itemAddrs(id: BigNumberish, index: number): Promise<string> {
        return await this.runMethod("itemAddrs", id, index);
    }

    public async itemExtras(id: BigNumberish, addr: string): Promise<string> {
        return await this.runMethod("itemExtras", id, addr);
    }

    public async getItemAddrCount(id: BigNumberish): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("itemAddrCount", id));
    }
}

export default new MetaversesContract();
