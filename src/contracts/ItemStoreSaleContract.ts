import Config from "../Config";
import ItemStoreSaleArtifact from "./abi/klubs/artifacts/contracts/ItemStoreSale.sol/ItemStoreSale.json";
import Contract from "./Contract";

class ItemStoreSaleContract extends Contract {

    constructor() {
        super(Config.contracts.ItemStoreSale, ItemStoreSaleArtifact.abi);
    }
}

export default new ItemStoreSaleContract();
