"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Store_1 = __importDefault(require("../../Store"));
class PFPSortor extends skynode_1.DomNode {
    constructor(pageView, multiple) {
        super(".pfp-sortor");
        this.store = new Store_1.default("storter-store");
        this.append((0, skynode_1.el)("a.rarity-button", "희소 점수 보기", { click: () => pageView.toggleRarityMode() }), multiple === "sell" ? (0, skynode_1.el)("a.multiple-sell-button", "다중 판매", { click: () => this.fireEvent("multiple-sell") }) : undefined, multiple === "buy" ? (0, skynode_1.el)("a.multiple-buy-button", "다중 구매", { click: () => this.fireEvent("multiple-buy") }) : undefined, this.select = (0, skynode_1.el)("select", (0, skynode_1.el)("option", "기본 정렬", { value: "" }), (0, skynode_1.el)("option", "최저가 순", { value: "price-asc" }), (0, skynode_1.el)("option", "최고가 순", { value: "price-desc" }), (0, skynode_1.el)("option", "희소 점수 순", { value: "rarity-desc" }), {
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
exports.default = PFPSortor;
//# sourceMappingURL=PFPSortor.js.map