import { DomNode, el } from "@hanul/skynode";
import SkyUtil from "skyutil";
import BuyPopup from "../BuyPopup";
import SellPopup from "../SellPopup";

export default class MultiplePFPSelector extends DomNode {

    private selectedCount: DomNode;
    private selectedIds: number[] = [];

    constructor(addr: string, multiple: "sell" | "buy") {
        super(".multiple-pfp-selector");
        this.append(
            this.selectedCount = el("p", "0개 선택됨"),
            el("a", multiple === "sell" ? "판매하기" : "구매하기", {
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
            el("a", "취소", { click: () => this.delete() }),
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
        this.selectedCount.empty().appendText(`${this.selectedIds.length}개 선택됨`);
    }
}
