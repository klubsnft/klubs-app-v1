import { View, ViewParams } from "skyrouter";
import ItemPage from "./ItemPage";
export default class ItemPageAll implements View, ItemPage {
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
//# sourceMappingURL=ItemPageAll.d.ts.map