import { DomNode, el } from "@hanul/skynode";
import Store from "../../Store";
import PFPPage from "../../view/pfp/page/PFPPage";

export default class PFPSortor extends DomNode {

    public store = new Store("storter-store");
    private select: DomNode<HTMLSelectElement>;

    constructor(pageView: PFPPage, multiple?: "sell" | "buy") {
        super(".pfp-sortor");
        this.append(
            el("a.rarity-button", "희소 점수 보기", { click: () => pageView.toggleRarityMode() }),
            multiple === "sell" ? el("a.multiple-sell-button", "다중 판매", { click: () => this.fireEvent("multiple-sell") }) : undefined,
            multiple === "buy" ? el("a.multiple-buy-button", "다중 구매", { click: () => this.fireEvent("multiple-buy") }) : undefined,
            this.select = el("select",
                el("option", "기본 정렬", { value: "" }),
                el("option", "최저가 순", { value: "price-asc" }),
                el("option", "최고가 순", { value: "price-desc" }),
                el("option", "희소 점수 순", { value: "rarity-desc" }),
                {
                    change: () => {
                        this.store.set("sort-type", this.select.domElement.value, true);
                        pageView.loadNFTs();
                    },
                },
            ),
        );
        const sortType = this.store.get<string>("sort-type");
        if (sortType !== undefined) {
            this.select.domElement.value = sortType;
        }
    }

    public get sortType() {
        return this.select.domElement.value;
    }
}
