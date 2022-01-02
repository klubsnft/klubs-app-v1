import { View, ViewParams } from "skyrouter";
export default class MyArts implements View {
    private container;
    private artistArtsLoading;
    private artistArtsList;
    private sellingLoading;
    private sellingList;
    private auctionLoading;
    private auctionList;
    private offeringLoading;
    private offeringList;
    private myNFTLoading;
    private myNFTList;
    constructor();
    private load;
    private loadArtistArts;
    private loadSelling;
    private loadAuctions;
    private loadOffering;
    private loadMyNFTs;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=MyArts.d.ts.map