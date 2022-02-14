import { BigNumber, BigNumberish } from "ethers";
import Contract from "./Contract";
export declare enum ItemType {
    ERC1155 = 0,
    ERC721 = 1
}
interface RoyaltyInfo {
    receiver: string;
    royalty: number;
}
declare class MetaversesContract extends Contract {
    constructor();
    addMetaverse(extra: string): Promise<void>;
    getMetaverseCount(): Promise<BigNumber>;
    banned(id: BigNumberish): Promise<boolean>;
    extras(id: BigNumberish): Promise<string>;
    managers(id: BigNumberish, index: BigNumberish): Promise<string>;
    existsManager(id: BigNumberish, manager: string): Promise<boolean>;
    addManager(id: BigNumberish, manager: string): Promise<void>;
    removeManager(id: BigNumberish, manager: string): Promise<void>;
    getManagerCount(id: BigNumberish): Promise<BigNumber>;
    setExtra(id: BigNumberish, extra: string): Promise<void>;
    setRoyalty(id: BigNumberish, receiver: string, royalty: BigNumberish): Promise<void>;
    royalties(id: BigNumberish): Promise<RoyaltyInfo>;
    addItem(id: BigNumberish, item: string, itemType: ItemType, extra: string): Promise<void>;
    itemAdded(id: BigNumberish, addr: string): Promise<boolean>;
    itemTypes(id: BigNumberish, addr: string): Promise<ItemType>;
    itemAddrs(id: BigNumberish, index: number): Promise<string>;
    itemExtras(id: BigNumberish, addr: string): Promise<string>;
    itemEnumerables(id: BigNumberish, addr: string): Promise<boolean>;
    getItemTotalSupply(id: BigNumberish, addr: string): Promise<BigNumber>;
    getItemAddrCount(id: BigNumberish): Promise<BigNumber>;
    setItemEnumerable(id: BigNumberish, item: string, enumerable: boolean): Promise<void>;
    setItemTotalSupply(id: BigNumberish, item: string, totalSupply: BigNumberish): Promise<void>;
    setItemExtra(id: BigNumberish, item: string, extra: string): Promise<void>;
    updateItemType(id: BigNumberish, item: string, itemType: ItemType): Promise<void>;
}
declare const _default: MetaversesContract;
export default _default;
//# sourceMappingURL=MetaversesContract.d.ts.map