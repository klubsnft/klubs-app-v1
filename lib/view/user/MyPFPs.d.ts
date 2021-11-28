import { View, ViewParams } from "skyrouter";
export default class MyPFPs implements View {
    private container;
    private managingLoading;
    private managingList;
    private sellingLoading;
    private sellingList;
    private offeringLoading;
    private offeringList;
    private myNFTLoading;
    private myNFTList;
    private prevButton;
    private nextButton;
    private page;
    private totalPage;
    constructor();
    private load;
    private loadManaging;
    private loadSelling;
    private loadOffering;
    private loadMyNFTs;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=MyPFPs.d.ts.map