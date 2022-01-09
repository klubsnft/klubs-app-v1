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
            this.selectedCount = el("p", msg("0_SELECTED")),
            el("a", multiple === "sell" ? msg("SELL_IT") : msg("BUY_IT"), {
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
            el("a", msg("CANCEL"), { click: () => this.delete() }),
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
        this.selectedCount.empty().appendText(`${this.selectedIds.length}${msg("SELECTED")}`);
    }
}
