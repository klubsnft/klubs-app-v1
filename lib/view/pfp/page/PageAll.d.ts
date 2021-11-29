import { View, ViewParams } from "skyrouter";
import PFPPage from "./PFPPage";
export default class PageAll implements View, PFPPage {
    private container;
    private sortor;
    private filter;
    private pagination1;
    private pagination2;
    private nftLoading;
    private nftList;
    private addr;
    private page;
    private rarity;
    private rarityMode;
    constructor(params: ViewParams);
    private load;
    private loadRarity;
    toggleRarityMode(): void;
    private createCard;
    loadNFTs(): Promise<void>;
    goPage(page: number): void;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=PageAll.d.ts.map