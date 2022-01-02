import { View, ViewParams } from "skyrouter";
import PFPPage from "../pfp/page/PFPPage";
export default class MyPFPs implements View, PFPPage {
    private container;
    private managingLoading;
    private managingList;
    private sellingLoading;
    private sellingList;
    private auctionLoading;
    private auctionList;
    private offeringLoading;
    private offeringList;
    private myNFTLoading;
    private myNFTList;
    private pagination1;
    private pagination2;
    private page;
    constructor(params: ViewParams);
    private load;
    private loadManaging;
    private loadSelling;
    private loadAuctions;
    private loadOffering;
    private loadMyNFTs;
    loadNFTs(): Promise<void>;
    goPage(page: number): void;
    toggleRarityMode(): void;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=MyPFPs.d.ts.map