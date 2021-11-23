import { View, ViewParams } from "skyrouter";
export default class Detail implements View {
    private contract;
    private container;
    private header;
    private iconDisplay;
    private nameDisplay;
    private descriptionDisplay;
    private miningInfoDisplay;
    private socialList;
    private totalTab;
    private mineTab;
    private saleTab;
    private idQueryInput;
    private nftLoading;
    private nftList;
    private prevButton;
    private nextButton;
    private totalSupply;
    private idQuery;
    private page;
    private listType;
    private sort;
    constructor(params: ViewParams);
    private loadInfo;
    private loadUpdateButton;
    private order;
    private loadNFTs;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=Detail.d.ts.map