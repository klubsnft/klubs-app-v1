import { DomNode, el } from "@hanul/skynode";
import ArtsContract from "../../contracts/ArtsContract";
import ArtStoreContract from "../../contracts/ArtStoreContract";
import Wallet from "../../klaytn/Wallet";
import ViewUtil from "../../view/ViewUtil";

export default class ArtsPageTabs extends DomNode {

    private mineTab: DomNode;
    private saleTab: DomNode;

    constructor(type: string) {
        super(".arts-page-tabs");
        this.append(
            el(`a.tab${type === "all" ? ".on" : ""}`, "전체", {
                click: () => ViewUtil.go(`/arts`),
            }),
            this.mineTab = el(`a.tab${type === "mine" ? ".on" : ""}`, "내 NFT", {
                click: () => ViewUtil.go(`/arts/mine`),
            }),
            this.saleTab = el(`a.tab${type === "selling" ? ".on" : ""}`, "판매중", {
                click: () => ViewUtil.go(`/arts/selling`),
            }),
        );
        this.load();
    }

    private async load() {

        const address = await Wallet.loadAddress();
        if (address !== undefined) {
            const balance = (await ArtsContract.balanceOf(address)).toNumber();
            this.mineTab.empty().appendText(`내 NFT (${balance})`);
        }

        const onSalesCount = (await ArtStoreContract.onSalesCount()).toNumber();
        this.saleTab.empty().appendText(`판매중 (${onSalesCount})`);
    }
}
