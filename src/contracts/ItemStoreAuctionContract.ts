import { BigNumber } from "ethers";
import Config from "../Config";
import ItemStoreAuctionArtifact from "./abi/klubs/artifacts/contracts/ItemStoreAuction.sol/ItemStoreAuction.json";
import Contract from "./Contract";

class ItemStoreAuctionContract extends Contract {

    constructor() {
        super(Config.contracts.ItemStoreAuction, ItemStoreAuctionArtifact.abi);
    }

    public async onAuctionsCount(addr: string): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("onAuctionsCount", addr));
    }
}

export default new ItemStoreAuctionContract();
