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
    private addr;
    private page;
    constructor(params: ViewParams);
    private load;
    loadNFTs(): Promise<void>;
    goPage(page: number): void;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=PageSelling.d.ts.map