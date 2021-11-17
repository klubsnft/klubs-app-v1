import Config from "../Config";
import PFPStoreArtifact from "./abi/artifacts/contracts/PFPStore.sol/PFPStore.json";
import Contract from "./Contract";

class PFPStoreContract extends Contract {

    constructor() {
        super(Config.contracts.PFPStore, PFPStoreArtifact.abi);
    }
}

export default new PFPStoreContract();
