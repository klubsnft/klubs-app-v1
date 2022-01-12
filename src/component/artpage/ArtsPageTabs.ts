import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import ArtsContract from "../../contracts/ArtsContract";
import ArtStoreContract from "../../contracts/ArtStoreContract";
import Wallet from "../../klaytn/Wallet";
import ViewUtil from "../../view/ViewUtil";

export default class ArtsPageTabs extends DomNode {

    private mineTab: DomNode;
    private saleTab: DomNode;
    private auctionTab: DomNode;

    constructor(type: string) {
        super(".arts-page-tabs");
        this.append(
            el(`a.tab${type === "all" ? ".on" : ""}`, msg("ALL_TAB"), {
                click: () => ViewUtil.go(`/arts`),
            }),
            this.mineTab = el(`a.tab${type === "mine" ? ".on" : ""}`, msg("MY_NFT_TAB"), {
                click: () => ViewUtil.go(`/arts/mine`),
            }),
            this.saleTab = el(`a.tab${type === "selling" ? ".on" : ""}`, msg("SELLING_TAB"), {
                click: () => ViewUtil.go(`/arts/selling`),
            }),
            this.auctionTab = el(`a.tab${type === "auctions" ? ".on" : ""}`, msg("BIDDING_TAB"), {
                click: () => ViewUtil.go(`/arts/auctions`),
            }),
        );
        this.load();
    }

    private async load() {

        const address = await Wallet.loadAddress();
        if (address !== undefined) {
            const balance = (await ArtsContract.balanceOf(address)).toNumber();
            this.mineTab.empty().appendText(`${msg("MY_NFT_TAB")} (${balance})`);
        }

        const onSalesCount = (await ArtStoreContract.onSalesCount()).toNumber();
        this.saleTab.empty().appendText(`${msg("SELLING_TAB")} (${onSalesCount})`);

        const onAuctionsCount = (await ArtStoreContract.onAuctionsCount()).toNumber();
        this.auctionTab.empty().appendText(`${msg("BIDDING_TAB")} (${onAuctionsCount})`);
    }
}
