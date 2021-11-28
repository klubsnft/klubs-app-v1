import { BigNumber } from "@ethersproject/bignumber";
import Config from "../Config";
import MixPriceEstimatorArtifact from "./abi/mix/artifacts/contracts/MixPriceEstimator.sol/MixPriceEstimator.json";
import Contract from "./Contract";

class MixPriceEstimatorContract extends Contract {

    constructor() {
        super(Config.contracts.MixPriceEstimator, MixPriceEstimatorArtifact.abi);
    }

    public async estimatePos(amountIn: BigNumber): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("estimatePos", amountIn));
    }
}

export default new MixPriceEstimatorContract();
