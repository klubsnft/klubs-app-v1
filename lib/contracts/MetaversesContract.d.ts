import { BigNumber, BigNumberish } from "ethers";
import Contract from "./Contract";
declare enum ItemType {
    ERC1155 = 0,
    ERC721 = 1
}
declare class MetaversesContract extends Contract {
    constructor();
    addMetaverse(extra: string): Promise<void>;
    getMetaverseCount(): Promise<BigNumber>;
    banned(id: BigNumberish): Promise<boolean>;
    extras(id: BigNumberish): Promise<string>;
    existsManager(id: BigNumberish, manager: string): Promise<boolean>;
    addManager(id: BigNumberish, manager: string): Promise<void>;
    removeManager(id: BigNumberish, manager: string): Promise<void>;
    getManagerCount(id: BigNumberish): Promise<BigNumber>;
    addItem(id: BigNumberish, item: string, itemType: ItemType, extra: string): Promise<void>;
    itemAdded(id: BigNumberish, addr: string): Promise<boolean>;
    itemAddrs(id: BigNumberish, index: number): Promise<string>;
    itemExtras(id: BigNumberish, addr: string): Promise<string>;
    getItemAddrCount(id: BigNumberish): Promise<BigNumber>;
}
declare const _default: MetaversesContract;
export default _default;
//# sourceMappingURL=MetaversesContract.d.ts.map