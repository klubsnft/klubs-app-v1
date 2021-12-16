import { View, ViewParams } from "skyrouter";
export default class ArtDetail implements View {
    private container;
    private nftDisplayContainer;
    private nameDisplay;
    private artistDisplay;
    private ownerDisplay;
    private descriptionDisplay;
    private sendButtonContainer;
    private updateButtonContainer;
    private tradeForm;
    private offerForm;
    constructor(params: ViewParams);
    private loadArtist;
    private loadTrade;
    private loadInfo;
    private loadSale;
    private loadOffers;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=ArtDetail.d.ts.map