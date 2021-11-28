import { View, ViewParams } from "skyrouter";
import PFPPage from "./PFPPage";
export default class PageMine implements View, PFPPage {
    private container;
    private sortor;
    private filter;
    private pagination1;
    private pagination2;
    private nftLoading;
    private nftList;
    private addr;
    private page;
    private multipleSelector;
    constructor(params: ViewParams);
    private load;
    private createCard;
    loadNFTs(): Promise<void>;
    goPage(page: number): void;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=PageMine.d.ts.map