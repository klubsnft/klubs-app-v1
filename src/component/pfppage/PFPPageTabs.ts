import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import PFPStoreContract from "../../contracts/PFPStoreContract";
import Wallet from "../../klaytn/Wallet";
import PageLayout from "../../view/pfp/page/PageLayout";
import ViewUtil from "../../view/ViewUtil";

export default class PFPPageTabs extends DomNode {

    private mineTab: DomNode;
    private saleTab: DomNode;
    private auctionTab: DomNode;

    constructor(private addr: string, type: string) {
        super(".pfp-page-tabs");
        this.append(
            el(`a.tab${type === "all" ? ".on" : ""}`, msg("ALL_TAB"), {
                click: () => ViewUtil.go(`/pfp/${addr}`),
            }),
            this.mineTab = el(`a.tab${type === "mine" ? ".on" : ""}`, msg("MY_NFT_TAB"), {
                click: () => ViewUtil.go(`/pfp/${addr}/mine`),
            }),
            this.saleTab = el(`a.tab${type === "selling" ? ".on" : ""}`, msg("SELLING_TAB"), {
                click: () => ViewUtil.go(`/pfp/${addr}/selling`),
            }),
            this.auctionTab = el(`a.tab${type === "auctions" ? ".on" : ""}`, msg("BIDDING_TAB"), {
                click: () => ViewUtil.go(`/pfp/${addr}/auctions`),
            }),
        );
        this.load();
    }

    private async load() {

        const address = await Wallet.loadAddress();
        if (address !== undefined) {
            const balance = (await PageLayout.current.contract.balanceOf(address)).toNumber();
            this.mineTab.empty().appendText(`${msg("MY_NFT_TAB")} (${balance})`);
        }

        const onSalesCount = (await PFPStoreContract.onSalesCount(this.addr)).toNumber();
        this.saleTab.empty().appendText(`${msg("SELLING_TAB")} (${onSalesCount})`);

        const onAuctionsCount = (await PFPStoreContract.onAuctionsCount(this.addr)).toNumber();
        this.auctionTab.empty().appendText(`${msg("BIDDING_TAB")} (${onAuctionsCount})`);
    }
}
