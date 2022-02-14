import { BigNumber, BigNumberish } from "ethers";
import Config from "../Config";
import MetaversesArtifact from "./abi/klubs/artifacts/contracts/Metaverses.sol/Metaverses.json";
import Contract from "./Contract";

export enum ItemType {
    ERC1155,
    ERC721
}

interface RoyaltyInfo {
    receiver: string,
    royalty: number,
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

    public async managers(id: BigNumberish, index: BigNumberish): Promise<string> {
        return await this.runMethod("managers", id, index);
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

    public async setExtra(id: BigNumberish, extra: string): Promise<void> {
        await this.runWalletMethod("setExtra", id, extra);
    }

    public async setRoyalty(id: BigNumberish, receiver: string, royalty: BigNumberish): Promise<void> {
        await this.runWalletMethod("setRoyalty", id, receiver, royalty);
    }

    public async royalties(id: BigNumberish): Promise<RoyaltyInfo> {
        const results = await this.runMethod("royalties", id);
        return {
            receiver: results[0],
            royalty: parseInt(results[1], 10),
        };
    }

    public async addItem(id: BigNumberish, item: string, itemType: ItemType, extra: string): Promise<void> {
        await this.runWalletMethod("addItem", id, item, itemType, extra);
    }

    public async itemAdded(id: BigNumberish, addr: string): Promise<boolean> {
        return await this.runMethod("itemAdded", id, addr);
    }

    public async itemTypes(id: BigNumberish, addr: string): Promise<ItemType> {
        return parseInt(await this.runMethod("itemTypes", id, addr), 10);
    }

    public async itemAddrs(id: BigNumberish, index: number): Promise<string> {
        return await this.runMethod("itemAddrs", id, index);
    }

    public async itemExtras(id: BigNumberish, addr: string): Promise<string> {
        return await this.runMethod("itemExtras", id, addr);
    }

    public async itemEnumerables(id: BigNumberish, addr: string): Promise<boolean> {
        return await this.runMethod("itemEnumerables", id, addr);
    }

    public async getItemTotalSupply(id: BigNumberish, addr: string): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("getItemTotalSupply", id, addr));
    }

    public async getItemAddrCount(id: BigNumberish): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("itemAddrCount", id));
    }

    public async setItemEnumerable(id: BigNumberish, item: string, enumerable: boolean): Promise<void> {
        await this.runWalletMethod("setItemEnumerable", id, item, enumerable);
    }

    public async setItemTotalSupply(id: BigNumberish, item: string, totalSupply: BigNumberish): Promise<void> {
        await this.runWalletMethod("setItemTotalSupply", id, item, totalSupply);
    }

    public async setItemExtra(id: BigNumberish, item: string, extra: string): Promise<void> {
        await this.runWalletMethod("setItemExtra", id, item, extra);
    }

    public async updateItemType(id: BigNumberish, item: string, itemType: ItemType): Promise<void> {
        await this.runWalletMethod("updateItemType", id, item, itemType);
    }
}

export default new MetaversesContract();
