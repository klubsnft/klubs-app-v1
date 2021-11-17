import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import Config from "../Config";
import PFPStoreArtifact from "./abi/artifacts/contracts/PFPStore.sol/PFPStore.json";
import Contract from "./Contract";

interface Sale {
    seller: string,
    price: BigNumber,
}

class PFPStoreContract extends Contract {

    constructor() {
        super(Config.contracts.PFPStore, PFPStoreArtifact.abi);
    }

    public async sales(addr: string, index: BigNumberish): Promise<Sale> {
        const results = await this.runMethod("sales", addr, index);
        return {
            seller: results[0],
            price: BigNumber.from(results[1]),
        };
    }
}

export default new PFPStoreContract();
