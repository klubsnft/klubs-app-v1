import { DomNode, el } from "@hanul/skynode";
import PFPPage from "../../view/pfp/page/PFPPage";

export default class PFPSortor extends DomNode {

    private select: DomNode<HTMLSelectElement>;

    constructor(pageView: PFPPage, multiple?: "sell" | "buy") {
        super(".pfp-sortor");
        this.append(
            //el("a.rarity-button", "희소 점수 보기"),
            multiple === "sell" ? el("a.multiple-sell-button", "다중 판매", { click: () => this.fireEvent("multiple-sell") }) : undefined,
            multiple === "buy" ? el("a.multiple-buy-button", "다중 구매", { click: () => this.fireEvent("multiple-buy") }) : undefined,
            this.select = el("select",
                el("option", "기본 정렬", { value: "" }),
                el("option", "최저가순", { value: "price-asc" }),
                el("option", "최고가순", { value: "price-desc" }),
                {
                    change: () => {
                        pageView.loadNFTs();
                    },
                },
            ),
        );
    }

    public get sortType() {
        return this.select.domElement.value;
    }
}
