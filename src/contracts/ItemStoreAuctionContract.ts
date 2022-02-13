import Config from "../Config";
import ItemStoreAuctionArtifact from "./abi/klubs/artifacts/contracts/ItemStoreAuction.sol/ItemStoreAuction.json";
import Contract from "./Contract";

class ItemStoreAuctionContract extends Contract {

    constructor() {
        super(Config.contracts.ItemStoreAuction, ItemStoreAuctionArtifact.abi);
    }
}

export default new ItemStoreAuctionContract();
