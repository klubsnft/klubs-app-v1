import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import Config from "../Config";
import ArtsArtifact from "./abi/klubs/artifacts/contracts/Arts.sol/Arts.json";
import KIP17Contract from "./standard/KIP17Contract";

class ArtsContract extends KIP17Contract {

    constructor() {
        super(Config.contracts.Arts, ArtsArtifact.abi);
    }

    public async royalties(id: BigNumberish): Promise<BigNumber> {
        return await this.runMethod("royalties", id);
    }

    public async setExceptionalRoyalties(ids: BigNumberish[], royalties: BigNumberish[]): Promise<void> {
        await this.runWalletMethod("setExceptionalRoyalties", ids, royalties);
    }
}

export default new ArtsContract();
