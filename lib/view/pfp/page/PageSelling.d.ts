import { View, ViewParams } from "skyrouter";
import PFPPage from "./PFPPage";
export default class PageSelling implements View, PFPPage {
    private container;
    private sortor;
    private filter;
    private pagination1;
    private pagination2;
    private nftLoading;
    private nftList;
    addr: string;
    private page;
    private rarity;
    private rarityMode;
    private multipleSelector;
    constructor(params: ViewParams);
    private load;
    private loadRarity;
    toggleRarityMode(): void;
    private loadCount;
    private createCard;
    loadNFTs(): Promise<void>;
    goPage(page: number): void;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=PageSelling.d.ts.map