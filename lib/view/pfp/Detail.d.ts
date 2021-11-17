import { View, ViewParams } from "skyrouter";
export default class Detail implements View {
    private container;
    private header;
    private iconDisplay;
    private nameDisplay;
    private descriptionDisplay;
    private socialList;
    private saleTab;
    private totalTab;
    private idQueryInput;
    private nftLoading;
    private nftList;
    private prevButton;
    private nextButton;
    private totalSupply;
    private idQuery;
    private page;
    private onlySale;
    constructor(params: ViewParams);
    private loadInfo;
    private order;
    private loadNFTs;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=Detail.d.ts.map