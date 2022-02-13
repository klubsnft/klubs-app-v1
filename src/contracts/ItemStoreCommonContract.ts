import Config from "../Config";
import ItemStoreCommonArtifact from "./abi/klubs/artifacts/contracts/ItemStoreCommon.sol/ItemStoreCommon.json";
import Contract from "./Contract";

class ItemStoreCommonContract extends Contract {

    constructor() {
        super(Config.contracts.ItemStoreCommon, ItemStoreCommonArtifact.abi);
    }
}

export default new ItemStoreCommonContract();
