import { View, ViewParams } from "skyrouter";
import ItemPage from "./ItemPage";
export default class ItemPageMine implements View, ItemPage {
    private container;
    private nftLoading;
    private nftList;
    metaverseId: number;
    addr: string;
    constructor(params: ViewParams);
    private load;
    private createCard;
    loadNFTs(): Promise<void>;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=ItemPageMine.d.ts.map