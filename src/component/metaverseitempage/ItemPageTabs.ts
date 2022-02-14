import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import MetaversesContract from "../../contracts/MetaversesContract";
import Wallet from "../../klaytn/Wallet";
import ViewUtil from "../../view/ViewUtil";

export default class ItemPageTabs extends DomNode {

    private mineTab: DomNode;

    constructor(private metaverseId: number, private addr: string, type: string) {
        super(".metaverse-item-page-tabs");
        this.append(
            el(`a.tab${type === "all" ? ".on" : ""}`, msg("SELLING_TAB"), {
                click: () => ViewUtil.go(`/metaverse/${metaverseId}/item/${addr}`),
            }),
            this.mineTab = el(`a.tab${type === "mine" ? ".on" : ""}`, "아이템", {
                click: () => ViewUtil.go(`/metaverse/${metaverseId}/item/${addr}/mine`),
            }),
        );
        this.load();
    }

    private async load() {

        const address = await Wallet.loadAddress();
        if (address !== undefined) {
            const totalSupply = (await MetaversesContract.getItemTotalSupply(this.metaverseId, this.addr)).toNumber();
            this.mineTab.empty().appendText(`아이템 (${totalSupply})`);
        }
    }
}
