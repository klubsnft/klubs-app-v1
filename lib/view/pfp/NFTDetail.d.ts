import { View, ViewParams } from "skyrouter";
export default class NFTDetail implements View {
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
    private offerForm;
    constructor(params: ViewParams);
    private loadPFP;
    private loadTrade;
    private loadInfo;
    private loadSale;
    private loadOffers;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=NFTDetail.d.ts.map