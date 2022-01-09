import { DomNode, el } from "@hanul/skynode";
import msg from "msg.js";
import Store from "../../Store";
import PFPPage from "../../view/pfp/page/PFPPage";

export default class PFPSortor extends DomNode {

    public store = new Store("storter-store");
    private select: DomNode<HTMLSelectElement>;

    constructor(pageView: PFPPage, multiple?: "sell" | "buy") {
        super(".pfp-sortor");
        this.append(
            el("a.rarity-button", msg("VIEW_RARITY_SCORE"), { click: () => pageView.toggleRarityMode() }),
            multiple === "sell" ? el("a.multiple-sell-button", msg("MULTIPLE_SELL"), { click: () => this.fireEvent("multiple-sell") }) : undefined,
            multiple === "buy" ? el("a.multiple-buy-button", msg("MULTIPLE_BUY"), { click: () => this.fireEvent("multiple-buy") }) : undefined,
            this.select = el("select",
                el("option", msg("BASE_SORT"), { value: "" }),
                el("option", msg("LOWEST_PRICE_SORT"), { value: "price-asc" }),
                el("option", msg("HIGHEST_PRICE_SORT"), { value: "price-desc" }),
                el("option", msg("RARITY_SORT"), { value: "rarity-desc" }),
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
