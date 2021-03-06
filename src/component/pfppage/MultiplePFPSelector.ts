import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import SkyUtil from "skyutil";
import BuyPopup from "../pfptrade/BuyPopup";
import SellPopup from "../pfptrade/SellPopup";

export default class MultiplePFPSelector extends DomNode {

    private selectedCount: DomNode;
    private selectedIds: number[] = [];

    constructor(addr: string, multiple: "sell" | "buy") {
        super(".multiple-pfp-selector");
        this.append(
            this.selectedCount = el("p", msg("SELECTED_DESCRIPTION").replace(/{n}/, "0")),
            el("a", multiple === "sell" ? msg("SELL_IT_BUTTON") : msg("BUY_IT_BUTTON"), {
                click: () => {
                    const addrs: string[] = [];
                    SkyUtil.repeat(this.selectedIds.length, () => {
                        addrs.push(addr);
                    });
                    if (multiple === "sell") {
                        new SellPopup(addrs, this.selectedIds);
                    } else {
                        new BuyPopup(addrs, this.selectedIds);
                    }
                },
            }),
            el("a", msg("CANCEL_BUTTON"), { click: () => this.delete() }),
        );
    }

    public select(id: number) {
        if (this.selecting(id) !== true) {
            this.selectedIds.push(id);
            this.update();
        }
    }

    public selecting(id: number) {
        return this.selectedIds.includes(id);
    }

    public deselect(id: number) {
        SkyUtil.pull(this.selectedIds, id);
        this.update();
    }

    private update() {
        this.selectedCount.empty().appendText(msg("SELECTED_DESCRIPTION").replace(/{n}/, String(this.selectedIds.length)));
    }
}
