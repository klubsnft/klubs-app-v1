import { View, ViewParams } from "skyrouter";
export default class ItemDetail implements View {
    private contract;
    private container;
    private nftDisplayContainer;
    private pfpDisplay;
    private nameDisplay;
    private ownerDisplay;
    private descriptionDisplay;
    private sendButtonContainer;
    private attributesDisplay;
    private tradeForm;
    private refreshInterval;
    constructor(params: ViewParams);
    private loadPFP;
    private loadTrade;
    private loadInfo;
    private loadSale;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=ItemDetail.d.ts.map