"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const msg_js_1 = __importDefault(require("msg.js"));
const Store_1 = __importDefault(require("../../Store"));
class ItemSortor extends skynode_1.DomNode {
    constructor(pageView, multiple) {
        super(".pfp-sortor");
        this.store = new Store_1.default("storter-store");
        this.append((0, skynode_1.el)("a.rarity-button", (0, msg_js_1.default)("VIEW_RARITY_SCORE_BUTTON"), { click: () => pageView.toggleRarityMode() }), multiple === "sell" ? (0, skynode_1.el)("a.multiple-sell-button", (0, msg_js_1.default)("MULTIPLE_SELL_BUTTON"), { click: () => this.fireEvent("multiple-sell") }) : undefined, multiple === "buy" ? (0, skynode_1.el)("a.multiple-buy-button", (0, msg_js_1.default)("MULTIPLE_BUY_BUTTON"), { click: () => this.fireEvent("multiple-buy") }) : undefined, this.select = (0, skynode_1.el)("select", (0, skynode_1.el)("option", (0, msg_js_1.default)("SORT_BASE_OPTION"), { value: "" }), (0, skynode_1.el)("option", (0, msg_js_1.default)("SORT_LOWEST_PRICE_OPTION"), { value: "price-asc" }), (0, skynode_1.el)("option", (0, msg_js_1.default)("SORT_HIGHEST_PRICE_OPTION"), { value: "price-desc" }), (0, skynode_1.el)("option", (0, msg_js_1.default)("SORT_RARITY_OPTION"), { value: "rarity-desc" }), {
            change: () => {
                this.store.set("sort-type", this.select.domElement.value, true);
                pageView.loadNFTs();
            },
        }));
        const sortType = this.store.get("sort-type");
        if (sortType !== undefined) {
            this.select.domElement.value = sortType;
        }
    }
    get sortType() {
        return this.select.domElement.value;
    }
}
exports.default = ItemSortor;
//# sourceMappingURL=ItemSortor.js.map