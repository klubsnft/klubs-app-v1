import { View, ViewParams } from "skyrouter";
import PFPPage from "../pfp/page/PFPPage";
export default class MyPFPs implements View, PFPPage {
    private container;
    private managingLoading;
    private managingList;
    private sellingLoading;
    private sellingList;
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
    private loadOffering;
    private loadMyNFTs;
    loadNFTs(): Promise<void>;
    goPage(page: number): void;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=MyPFPs.d.ts.map